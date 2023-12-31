const controller = require('../../controllers/backend/bidController')

const router = require("express").Router();
const handleFormData = require("../../helpers/fileHelpers");

router.get('/customer-bid/:id', handleFormData, controller.get)
router.get('/get-bid', handleFormData, controller.getAll)

module.exports = router;