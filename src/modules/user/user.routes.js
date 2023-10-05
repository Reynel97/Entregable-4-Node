const { Router } = require("express");
const { User, Participant } = require("../../models");
const {
  registerUser,
  loginUser,
  validateUserEmail,
  getAllUsers,
  uploadAvatar,
} = require("./user.controllers");
const authenticate = require("../../middlewares/auth.middleware");
const { registerUserValidator, loginValidation } = require("./user.validators");
const upload = require("../../middlewares/imageUpload.middleware");

const router = Router();

router
  .route("/") //api/v/users
  .get(authenticate, getAllUsers)
  .post(registerUserValidator, registerUser)
  .get(async (req, res, next) => {
    try {
      const result = await User.findAll({
        include: {
          model: Participant,
        },
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  router.put("/:id",authenticate, upload.single("avatar"), uploadAvatar);

router.post("/login", loginValidation, loginUser);

router.post("/validate", validateUserEmail);

module.exports = router;
