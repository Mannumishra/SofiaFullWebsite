const { createContact, getAllContacts, updateContactStatus, deleteContactShip } = require("../Controllers/ContactController")

const ContactRouter = require("express").Router()

ContactRouter.post("/send-contact" ,createContact)
ContactRouter.get("/all-contact" ,getAllContacts)
ContactRouter.put("/update-contact-status/:id" ,updateContactStatus)
ContactRouter.delete("/delete-contact/:id" ,deleteContactShip)

module.exports = ContactRouter