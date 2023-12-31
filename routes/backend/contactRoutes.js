const controller = require("../../controllers/backend/contactController");
const router = require("express").Router();
const handleFormData = require("../../helpers/fileHelpers");

router.post("/add", handleFormData, controller.add);
router.get("/get", handleFormData, controller.get);
router.post("/update/:id", handleFormData, controller.update);

module.exports = router;
