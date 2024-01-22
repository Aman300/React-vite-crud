const express = require("express");
const router = express.Router();

// create user
const userController = require("../Controllers/user");
const {
  createContact,
  getContact,
  updateContact,
  deleteContact,
  getSingleContact,
} = require("../Controllers/contact");

router.post("/create-user", userController.create_user);
router.post("/user-login", userController.login_user);

router.post("/create-contact", createContact);
router.get("/get-contact", getContact);
router.delete("/delete-contact/:id", deleteContact);
router.get("/get-single-contact/:id", getSingleContact);
router.put("/update-contact/:id", updateContact);

module.exports = router;
