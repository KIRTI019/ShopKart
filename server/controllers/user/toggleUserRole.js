import User from "../../models/User.js";

export const toggleUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = user.role === 'admin' ? 'user' : 'admin';
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};