const controller = require("../../controllers/customers/customerAuthController");
const router = require("express").Router();
const handleFormData = require("../../helpers/fileHelpers");

router.post("/register", handleFormData, controller.register);
router.post("/login", handleFormData, controller.login);
router.get("/profile", handleFormData, controller.profile);
router.post("/update-profile", handleFormData, controller.updateProfile);
router.post("/add-amount", handleFormData, controller.addAmount);

module.exports = router;
