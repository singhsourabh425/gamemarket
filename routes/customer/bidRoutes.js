const controller = require('../../controllers/customers/bidController')

const router = require("express").Router();
const handleFormData = require("../../helpers/fileHelpers");

router.post('/create/:id', handleFormData, controller.create)

module.exports = router;