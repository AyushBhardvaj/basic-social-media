import User from "../models/User.js";

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const searchUser = async (req, res) => {
  try {
    const { search_query } = req.query;
    const users = await User.find({
      $or: [
        { firstName: { $regex: new RegExp(search_query, "i") } },
        { lastName: { $regex: new RegExp(search_query, "i") } },
        { email: { $regex: new RegExp(search_query, "i") } },
      ],
    });
    res.status(200).json({ users });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { getUser, searchUser };
