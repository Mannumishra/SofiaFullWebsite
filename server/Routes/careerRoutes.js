const express = require("express");
const { createCareer, getCareerById, updateCareer, deleteCareer, getAllCareers } = require("../Controllers/careerController");
const upload = require("../Middleware/Multer");


const CareerRouter = express.Router();

CareerRouter.post("/apply-job", upload.single("resume"), createCareer);
CareerRouter.get("/get-carrer-records", getAllCareers);
CareerRouter.get("/get-career-record-by-id/:id", getCareerById);
CareerRouter.put("/update-career-record/:id", upload.single("resume"), updateCareer);
CareerRouter.delete("/delete-career-record/:id", deleteCareer);

module.exports = CareerRouter;
