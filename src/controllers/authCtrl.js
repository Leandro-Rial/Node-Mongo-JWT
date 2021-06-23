const Users = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const authCtrl = {
  signup: async (req, res) => {
    try {

      const { username, email, password } = req.body;

      const name = await Users.findOne({ username });

      if (name) {
        return res.json({ msg: "The username already exists" });
      }

      const user = await Users.findOne({ email });

      if (user) {
        return res.json({ msg: "The email already exists" });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: "The password is small, at least 6 character" });
      }

      // Bcrypt
      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await new Users({
        username,
        email,
        password: passwordHash,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, config.secret, {
        expiresIn: 60 * 60 * 24,
      });

      res.json({ auth: true, token });
      
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  signin: async (req, res) => {
    try {

      const { email, password } = req.body;

      const user = await Users.findOne({ email });

      if (!user) {
        return res.status(404).json({ msg: "The user does not exist." });
      }

      // Compare Password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "The password is Incorrect" });
      }

      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 60 * 60 * 24,
      });

      res.json({ auth: true, token });

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  profile: async (req, res) => {
    try {

      const user = await Users.findById(req.userId).select("-password");

      if (!user) {
        return res.status(404).json({ msg: "No user found" });
      }

      res.json(user);

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = authCtrl;
