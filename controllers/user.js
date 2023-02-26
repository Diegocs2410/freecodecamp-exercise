const User = require('../models/users')



const createUser = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.create({ username });
    res.status(201).json({ username: user.username, _id: user._id });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  createUser,
  getAllUsers
}