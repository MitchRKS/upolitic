import mongoose from "mongoose";

const legislatorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  chamber: String,
  homeState: String,
  district: Number,
  partyAffiliation: String,
  residence: String,
  isLeadership: Boolean,
  isChair: Boolean,
  isViceChair: Boolean,
  isRankingMember: Boolean,
  email: String,
  officePhone: String,
});

export const Legislator = mongoose.model("Legislator", legislatorSchema);
