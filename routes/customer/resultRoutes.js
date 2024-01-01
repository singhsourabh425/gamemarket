const controller = require("../../controllers/customers/resultController");
const router = require("express").Router();
const handleFormData = require("../../helpers/fileHelpers");

router.get("/result-history/:id", handleFormData, controller.getResult);

module.exports = router;
