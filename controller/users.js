const cloudinary = require("../connection/cloudinary");
const User = require("../model/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getUser = (req, res) => {
  User.find((err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    }
    res.json(result);
  });
};

const createUser = async (req, res) => {
  let result = null;
  if (req.file) {
    result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Mogodb/users",
    });
  }
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    image: result?.secure_url,
    cloudinary_id: result?.public_id,
    authorization: req.body.authorization,
  });
  user.password = bcrypt.hashSync(user.password, Number("salt"));
  user
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};
const findUser = (req, res) => {
  const id = req.param._id;

  User.findOne(id).then((result) => {
    res.json(result);
  });
};

const updateUser = async (req, res) => {
  let id = req.params.id;
  let result = null;
  let idUser = await User.findById(req.params.id);
  await cloudinary.uploader.destroy(idUser.cloudinary_id);
  if (req.file) {
    result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Mogodb/users",
    });
  }
  let user = {
    name: req.body.name || idUser.name,
    email: req.body.email || idUser.email,
    password: req.body.password || idUser.password,
    phone: req.body.phone || idUser.image,
    image: result?.secure_url || idUser.image,
    cloudinary_id: result?.public_id || idUser.cloudinary_id,
    authorization: req.body.authorization || idUser.authorization,
  };
  user.password = bcrypt.hashSync(user.password, Number("salt"));
  User.findByIdAndUpdate(id, { $set: user })
    .then(() => {
      res.json("Update user in Data");
    })
    .catch((err) => {
      res.json({ message: "an error" });
    });
};

const deleteUser = async (req, res) => {
  let id = req.params.id;
  let idUser = await User.findById(req.params.id);
  await cloudinary.uploader.destroy(idUser.cloudinary_id);
  User.findByIdAndRemove(id)
    .then((result) => {
      res.json("Remove And DataBase", result);
    })
    .catch((err) => {
      res.json("An Error", err);
    });
};

const login = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.findOne({ email });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        let id = user.id;
        const token = jwt.sign({ id }, "jwtSecret", {
          expiresIn: process.env.TOKEN_EXPIRATION,
        });
        res.json({ result: "login Successful", token: token });
      } else {
        res.send("Wrong password.");
      }
    } else {
      res.send("Wrong email or password.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
};

module.exports = {
  getUser,
  createUser,
  findUser,
  updateUser,
  deleteUser,
  login,
};
