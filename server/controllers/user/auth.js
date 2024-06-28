import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { displayName, email, password } = req.body;

    if (!displayName) {
      return res.status(400).json({ error: 'DisplayName is required' });
    }

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      displayName,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const login = async(req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}