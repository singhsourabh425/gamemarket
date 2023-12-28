const controller = require("../../controllers/backend/adminAuthController");
const router = require("express").Router();
const handleFormData = require("../../helpers/fileHelpers");

router.post("/create", handleFormData, controller.create);
router.post("/login", handleFormData, controller.login);
router.patch("/update/:id", handleFormData,controller.getByIdandUpdate)
router.delete("/delete/:id", controller.getByIdandDelete)
module.exports = router;
