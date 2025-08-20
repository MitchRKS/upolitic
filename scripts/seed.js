import mongoose from "mongoose";
import dotenv from "dotenv";
import { Legislator } from "../models/legislator.js";
import seedLegislators from "../seed.js";

dotenv.config();

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/upolitic";

async function runSeed() {
  try {
    await mongoose.connect(mongoUri);

    const normalizedSeed = seedLegislators.map(({ affiliation, ...rest }) => ({
      ...rest,
      partyAffiliation: affiliation,
    }));

    await Legislator.deleteMany({});
    const result = await Legislator.insertMany(normalizedSeed);
    console.log(`Seeded ${result.length} legislators.`);
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


