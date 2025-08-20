import express from "express";
import cors from "cors";

import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/upolitic")
  .then(() => {
    console.log("connected to mongo");
  })
  .catch((error) => {
    console.error("Mongo connection error:", error);
    process.exit(1);
  });

mongoose.connection.once("open", () => {
  // Mongo connection established
});

// Models
import { Legislator } from "./models/legislator.js";
import STATES from "./resources/states.js";

let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// POST a new user
app.post("/users", (req, res) => {
  const { name } = req.body;
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser); // 201 Created status
});

// GET a specific user by ID (example of route parameters)
app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found"); // 404 Not Found
  }
});

// GET all legislators
app.get("/legislators", async (req, res) => {
  try {
    const { state } = req.query;
    const filter = state && state !== "All" ? { homeState: state } : {};
    const legislators = await Legislator.find(filter).sort({ lastName: 1, firstName: 1 });
    res.json(legislators);
  } catch (error) {
    console.error("Failed to fetch legislators:", error);
    res.status(500).json({ message: "Failed to fetch legislators" });
  }
});

// GET canonical list of 50 US states
app.get("/states", (req, res) => {
  res.json(STATES);
});
