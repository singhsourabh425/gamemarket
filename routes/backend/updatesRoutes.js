const controller = require('../../controllers/backend/updateController')
const router = require('express').Router()
const handleFormData = require('../../helpers/fileHelpers')

router.post('/create',handleFormData,controller.create)
router.post('/update/:id',handleFormData,controller.update)

module.exports = router