import { contactModel } from "../models/contact.model.js";

export const contactUs = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    if (!name || !email || !message) {
      return res.status(404).json({ message: "All field are required" });
    }

    const createdContact = await contactModel.create({ name, email, message });
    res.status(200).json({ message: "Contact Added", createdContact });
  } catch (error) {
    console.error("Error from contact us controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
