import FormData from "../models/FormData.js";

export const saveFormData = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newData = new FormData({ name, email, message });
    await newData.save();
    res.status(201).json({ success: true, data: newData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getFormData = async (req, res) => {
  try {
    const data = await FormData.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
