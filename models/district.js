import mongoose from "mongoose";

const districtSchema = new mongoose.schema({
  state: String,
  number: Number,
  incumbent: String,
  result24: String,
  result22: String,
});

export const District = mongoose.model("District", districtSchema);
