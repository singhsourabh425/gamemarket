const controller = require("../../controllers/backend/resultController");
const router = require("express").Router();
const handleFormData = require("../../helpers/fileHelpers");

router.get("/customer-result-history", handleFormData, controller.getAllResult);

module.exports = router;
