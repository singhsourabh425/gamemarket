const controller = require('../../controllers/backend/dashboardController')
const router = require('express').Router()

const handleFormData = require('../../helpers/fileHelpers')

router.get('/dashboard-count', controller.dashboardCount)


module.exports = router;