const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const router = express.Router();
const path = require("path");
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {dbName:'socialApp' }, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB Cluster");
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error);
  });

  app.use("/images", express.static(path.join(__dirname, "public/images")));

  //mmiddleware
  app.use(express.json());
  app.use(helmet());
  app.use(morgan("common"));

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
 

app.listen(8800, ()=>{
    console.log('server is running at 8800 port');
})