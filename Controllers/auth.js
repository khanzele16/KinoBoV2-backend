import User from "../Models/User.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "Пользователь не найден",
      });
    }
    const isCorrect = bcrypt.compareSync(password, user.passwordHash)
    if (!isCorrect) {
      return res.json({
        message: "Неверно введен пароль",
      });
    }
    const { passwordHash, ...userData } = user._doc;
    return res.json(userData);
  } catch (err) {
    console.log(err);
    return res.json({
      message: "Не удалось войти",
    });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.json({
        message: "Пользователь с таким email уже существует",
      });
    }
    const salt = bcrypt.genSaltSync(7);
    const hash = bcrypt.hashSync(password, salt);
    const user = new User({
      email,
      name,
      passwordHash: hash,
    });
    await user.save();
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.json({
      message: "Не удалось зарегистрироваться",
    });
  }
};

export const authMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.json({
        message: "Пользователь не найден",
      });
    }
    const { passwordHash, ...userData } = user._doc;
    return res.json(userData);
  } catch (err) {
    console.log(err);
    return res.json({
      message: "Не удалось войти",
    });
  }
};
