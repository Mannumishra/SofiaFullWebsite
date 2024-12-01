const { createGetInTouch, getAllGetInTouch, updateGetInTouchStatus, deleteGetintouch } = require("../Controllers/GetInTouchController")


const GetInTouchRouter = require("express").Router()

GetInTouchRouter.post("/send-getintouch" ,createGetInTouch)
GetInTouchRouter.get("/all-getintouch" ,getAllGetInTouch)
GetInTouchRouter.put("/update-getintouch-status/:id" ,updateGetInTouchStatus)
GetInTouchRouter.delete("/delete-getintouch/:id" ,deleteGetintouch)

module.exports = GetInTouchRouter