import mongoose from "mongoose";
import User from "../models/User.js";

const getUserFriends = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, profilePic }) => {
        return { _id, firstName, lastName, occupation, location, profilePic };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addRemoveFriend = async (req, res) => {
  try {
    const friendId = mongoose.Types.ObjectId(req.params.friendId);
    const userId = mongoose.Types.ObjectId(req.user._id);
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (user.friends.length > 0 && user.friends.includes(friendId)) {
      user.friends = user.friends.filter(
        (id) => id.toString() !== friendId.toString()
      );
      friend.friends = friend.friends.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      user.friends.push(friendId);
      friend.friends.push(userId);
    }

    await user.save();
    await friend.save();

    const friendsArray = await User.findById(userId).populate("friends");

    res.status(200).json(friendsArray.friends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { getUserFriends, addRemoveFriend };
