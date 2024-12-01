const { downloadCatalogController, getCatlogDownloadRecord, deleteCatlogDownloadRecord } = require("../Controllers/downloadCatalogController")

const DownloadCatelogRouter = require("express").Router()

DownloadCatelogRouter.post("/download-catelog", downloadCatalogController)
DownloadCatelogRouter.get("/get-download-catelog", getCatlogDownloadRecord)
DownloadCatelogRouter.delete("/delete-download-catelog/:id", deleteCatlogDownloadRecord)

module.exports = DownloadCatelogRouter