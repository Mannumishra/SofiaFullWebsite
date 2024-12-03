const { createEventImage, getAllEventImages, getEventImageById, updateEventImage, deleteEventImage } = require("../Controllers/EventImageController");
const upload = require("../Middleware/Multer");
const validateImageDimensions = require("../Middleware/validateImageDimensions");

const EventImageRouter = require("express").Router();

EventImageRouter.post(
    "/add-event-image",
    upload.single("image"),
    // validateImageDimensions,
    createEventImage
);

EventImageRouter.put(
    "/update-event-image/:id",
    upload.single("image"),
    // validateImageDimensions,
    updateEventImage
);

EventImageRouter.get("/get-event-image", getAllEventImages);
EventImageRouter.get("/get-event-image/:id", getEventImageById);
EventImageRouter.delete("/delete-event-image/:id", deleteEventImage);

module.exports = EventImageRouter;
