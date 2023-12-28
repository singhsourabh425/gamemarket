const controller = require('../../controllers/backend/manageMarketController')
const router = require('express').Router()
const handleFormData = require('../../helpers/fileHelpers')

router.get('/', controller.getAll)
router.post('/create',handleFormData, controller.create)
router.patch("/update/:id", handleFormData,controller.getByIdandUpdate)
router.delete("/delete/:id", controller.getByIdandDelete)
module.exports= router;