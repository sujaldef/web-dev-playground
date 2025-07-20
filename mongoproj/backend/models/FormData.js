import mongoose from "mongoose";

const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const FormData = mongoose.model("FormData", formDataSchema);
export default FormData;
