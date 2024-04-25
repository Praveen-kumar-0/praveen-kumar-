const express = require("express");
const mongoose = require("mongoose");
const Videos = require("./models/VideoDetails");
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://charancherry01233:charan12@cluster0.arpemub.mongodb.net/Synergywatch?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("database connected ....!!");
  })
  .catch((err) => {
    console.error(err);
  });

app.post("/send-video-details", async (req, res) => {
  try {
    const sendVideoDetails = await Videos.create(req.body);

    return res
      .send(201)
      .json({ message: "video details saved successfully", sendVideoDetails });
  } catch (error) {
    console.log(error);
  }
});


// api to get the all video details 
app.get("/get-video-details", async (req, res) => {
  try {
    const videos = await Videos.find({});
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
  }
})


// api to get individual data
app.get("/individualvideo/:id", async (req, res) => {
  try {
    // const id = req.params.id;
    const { id } = req.params;
    const video = await Videos.findById({ _id: id });
    res.status(200).json(video);

  } catch (error) {
    console.log(error);
  }
})

const port = 5555;

app.listen(port, () => console.log(`Server is running at port ${port}`));
