const express = require("express");

const { userCtrls } = require("../../controllers");
const { validation, authentificate } = require("../../middlewares");
const { userSchema } = require("../../validation-schema");

const router = express.Router();

router.post("/signup", validation(userSchema.authSchema), userCtrls.userSignUp);
router.post(
  "/signin",
  validation(userSchema.loginSchema),
  userCtrls.userSignIn
);
router.post("/signout", authentificate, userCtrls.userSignOut);
router.get("/current", authentificate, userCtrls.userGetCurrent);

module.exports = router;
