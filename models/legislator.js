import mongoose from "mongoose";

const legislatorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  chamber: String,
  homeState: String,
  district: Number,
  partyAffiliation: String,
});

export const Legislator = mongoose.model("Legislator", legislatorSchema);
