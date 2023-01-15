const cloudinary = require("../connection/cloudinary");
const User = require("../model/users");
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
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    image: result?.secure_url,
    cloudinary_id: result?.public_id,
    authorization: req.body.authorization,
  };
  User.findByIdAndUpdate(id, { $set: user })
    .then(() => {
      res.json("Update Admin in Data");
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
      res.json("Remove And DataBase");
    })
    .catch((err) => {
      res.json("An Error");
    });
};
module.exports = {
  getUser,
  createUser,
  findUser,
  updateUser,
  deleteUser,
};
