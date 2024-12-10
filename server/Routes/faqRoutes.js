const express = require("express");
const { createFAQ, getAllFAQs, getFAQById, updateFAQ, deleteFAQ, getFAQclient } = require("../Controllers/FaqController");


const FAQRouter = express.Router();

// Routes
FAQRouter.post("/create-faq", createFAQ); // Create FAQ
FAQRouter.get("/get-faq", getAllFAQs); // Get all FAQs
FAQRouter.get("/get-all-faq", getFAQclient); // Get all FAQs
FAQRouter.get("/get-single-faq/:id", getFAQById); // Get a single FAQ by ID
FAQRouter.put("/update-faq/:id", updateFAQ); // Update FAQ
FAQRouter.delete("/delete-faq/:id", deleteFAQ); // Delete FAQ

module.exports = FAQRouter;
