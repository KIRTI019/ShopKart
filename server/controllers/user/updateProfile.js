import User from "../../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { displayName, mobileNumber, gender, dateOfBirth, location } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        displayName,
        mobileNumber,
        gender,
        dateOfBirth,
        location
      },
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
