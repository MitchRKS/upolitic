import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Legislator } from "../models/legislator.js";

dotenv.config();

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/upolitic";

async function runSeed() {
  try {
    await mongoose.connect(mongoUri);

    // Resolve dataset to import
    const args = process.argv.slice(2);
    const getArg = (name, alias) => {
      const withEq = args.find((a) => a.startsWith(`--${name}=`));
      if (withEq) return withEq.split("=")[1];
      const idxLong = args.indexOf(`--${name}`);
      if (idxLong !== -1 && args[idxLong + 1]) return args[idxLong + 1];
      const idxShort = alias ? args.indexOf(`-${alias}`) : -1;
      if (idxShort !== -1 && args[idxShort + 1]) return args[idxShort + 1];
      return undefined;
    };

    const explicitFile = getArg("file", "f");
    const stateArg = (getArg("state", "s") || "alaska").toLowerCase();

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const candidatePaths = explicitFile
      ? [path.resolve(process.cwd(), explicitFile)]
      : [
          path.resolve(__dirname, `../${stateArg}Legislators.js`),
          path.resolve(__dirname, `../data/${stateArg}Legislators.js`),
          path.resolve(__dirname, `../data/legislators/${stateArg}.js`),
          path.resolve(__dirname, `../resources/${stateArg}Legislators.js`),
        ];

    const resolvedPath = candidatePaths.find((p) => fs.existsSync(p));
    if (!resolvedPath) {
      throw new Error(
        `Could not find dataset for state "${stateArg}". Tried:\n- ${candidatePaths.join("\n- ")}`
      );
    }

    const moduleUrl = pathToFileURL(resolvedPath).href;
    const module = await import(moduleUrl);
    const seedLegislators = module.default || module.seedLegislators || module.legislators;

    if (!Array.isArray(seedLegislators)) {
      throw new Error("Dataset module did not export an array as default export.");
    }

    await Legislator.deleteMany({});
    const result = await Legislator.insertMany(seedLegislators);
    console.log(`Seeded ${result.length} legislators from ${path.basename(resolvedPath)}.`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    try {
      await mongoose.connection.close();
    } catch {}
    process.exit(1);
  }
}

runSeed();


