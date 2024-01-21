const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.create_user = async (req, res) => {
  const {
    user_email,
    user_password,
    user_name,
    user_dob,
    constituency_id,
    uvc_code,
  } = req.body;

  try {
    let isUvc = await uvc.findOne({ uvc_code: uvc_code });
    if (!isUvc) {
      return res.status(400).json({
        message: "Invalid UVC!",
      });
    }
    if (isUvc.is_used) {
      return res.status(400).json({
        message: "UVC already used!",
      });
    }

    let user = await User.findOne({ user_email: user_email });
    if (user) {
      return res.status(400).json({
        message: "User already exists!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user_password, salt);

    const newUser = new User({
      user_email,
      user_password: hash,
      user_name,
      user_dob,
      constituency_id,
      UVC: uvc_code,
    });

    const result = await newUser.save();

    await uvc.findOneAndUpdate(
      { uvc_code: uvc_code },
      { is_used: true },
      { new: true }
    );

    res.status(201).json({
      status: true,
      message: "User created successfully!",
      result: result,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
    console.log(err.message);
  }
};

exports.login_user = async (req, res) => {
  try {
    if (
      req.body.user_email === "election@shangrila.gov.sr" &&
      req.body.user_password === "shangrila2024$"
    ) {
      let isAdmin = await admin.findOne({
        user_email: req.body.user_email,
      });

      const validPassword = await bcrypt.compare(
        req.body.user_password,
        isAdmin.user_password
      );
      if (!validPassword) {
        return res.status(400).json({
          message: "Invalid password!",
        });
      }

      if (!isAdmin) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.user_password, salt);

        let adminCreate = await admin.create({
          user_email: req.body.user_email,
          user_password: hash,
        });
        const token = jwt.sign(
          {
            userId: adminCreate._id,
          },
          "voteing@#Online$($("
        );
        res.setHeader("authorization", token);
        res.cookie("token", token);
        return res.status(200).json({
          status: true,
          message: "Admin logged in successfully!",
          result: adminCreate,
          token: token,
        });
      } else {
        const token = jwt.sign(
          {
            userId: admin._id,
          },
          "voteing@#Online$($("
        );

        res.setHeader("authorization", token);
        res.cookie("token", token);

        return res.status(200).json({
          status: true,
          message: "Admin logged in successfully!",
          result: isAdmin,
          token: token,
        });
      }
    }

    let user = await User.findOne({ user_email: req.body.user_email });
    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.user_password,
      user.user_password
    );
    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password!",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      "voteing@#Online$($("
    );

    res.setHeader("authorization", token);
    res.cookie("token", token);
    return res.status(200).json({
      status: true,
      message: "User logged in successfully!",
      result: user,
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong!",
    });
    console.log(err.message);
  }
};
