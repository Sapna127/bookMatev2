const User = require('../models/user');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');

const registerSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['buyer', 'seller'])
  });
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const register = async (req, res) => {
    console.log("register function");
    const { name, email, password, role } = req.body;
    console.log(`Received data: ${name}, ${email}, ${password}, ${role}`);
    try {
      const validationResponse = registerSchema.safeParse(req.body);
      if (!validationResponse.success) {
        return res.status(400).json({
          message: `Error while signing up: ${validationResponse.error.errors[0].message}`
        });
      }
  
      const { name, email, password, role } = validationResponse.data;
      console.log("username",name);
        console.log("email",email);
        console.log("password",password);
        console.log("role",role);
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const user = await User.create({
        name,
        email,
        password,
        role
      });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  
      res.status(201).json({
        message: "User created successfully",
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
        console.log("register error");
        console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

const login = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({ message: 'Invalid credentials' });
    // }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  console.log("getuser")
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, getUser, updateUser };
