const controller = require("../../controllers/customers/contactController");
const router = require("express").Router();
const handleFormData = require("../../helpers/fileHelpers");

router.post("/add", handleFormData, controller.add);
router.get("/get", handleFormData, controller.get);

module.exports = router;
