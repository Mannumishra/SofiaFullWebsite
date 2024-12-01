const { createDealerShip, getAllDealerShips, updateDealerShipStatus, deleteDealerShip } = require("../Controllers/DealerShipController")

const DealerShipRouter = require("express").Router()

DealerShipRouter.post("/send-dealership" ,createDealerShip)
DealerShipRouter.get("/all-dealership" ,getAllDealerShips)
DealerShipRouter.put("/update-dealership-status/:id" ,updateDealerShipStatus)
DealerShipRouter.delete("/delete-dealership/:id" ,deleteDealerShip)

module.exports = DealerShipRouter