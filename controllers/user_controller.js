const db = require("../models/index");
const user_services = require("../services/user_services");
const ErrorGenerator = require("../utilities/ErrorGenerator");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");

exports.upload_video = async (req, res) => {
  let user_id = req.body.user_id;
  let user_gender = req.body.user_gender;
  let video_url = req.body.video_url;
  let video_date_created = req.body.video_date;
  let curr_video_id = shortid.generate();

  let video_genres = req.body.video_genres;

  let all_videos = await user_services.insert_all_videos(curr_video_id, video_url, user_id, video_date_created, res);

  let video_attributes;
  video_genres.forEach(async function (genre) {
     video_attributes =   await user_services.insert_video_attributes(curr_video_id, genre,user_gender, video_date_created, res);
  })

 res.json({
    status:"200", data:{
        curr_video_id,
        message:`Video ${curr_video_id} uploaded successfully`
    }
 })


  
};
