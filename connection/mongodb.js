require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);


const options = {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
};


// connecting mongoose
 mongoose.connect(process.env.DB_URI, options).then(
  () => {
    console.log("DB Ready To Use");
  },
  (err) => {
    console.log(err);
  }
);

