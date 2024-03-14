import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import {selectUserByUsername} from '../models/user-model.mjs';

// INSECURE LOGIN uses harcoded passwords only
// returns user object if username & password match
const postLogin = async (req, res) => {
  const {username, password} = req.body;
  console.log('login', req.body);
  const user = await selectUserByUsername(username);
  if (user.error) {
    return res.status(user.error).json(user);
  }
  const match = await bcrypt.compare(password, user.password);

  // miksi ei toimi? bcrypt jostain syystä ei tahdo toimia

  if (match) {
    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return res.json({message: 'Logged in successfully', user, token});
  } else {
    return next(customError('Invalid username or password', 401));
  }
};
/*
  if (password === user.password) {
    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1024h" });
    return res.json({ message: "logged in successfully", user, token });
  } else {
    return res
      .status(401)
      .json({ error: 401, message: "invalid username or password" });
  }
};
*/
const getMe = async (req, res) => {
  res.json({user: req.user});
};

export {postLogin, getMe};
