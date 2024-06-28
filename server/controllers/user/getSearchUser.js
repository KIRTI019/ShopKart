import User from "../../models/User.js";

export const getSearchUser = async (req, res) => {
  try {
    const searchQuery = req.query.q || '';
    const user = await User.find({ name: { $regex: searchQuery, $options: 'i' } });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
