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
exports.get_videos = async (req, res) =>{
   const {user_id} = req.body
   let user = await user_services.user_details_service(user_id)
   const userPrefs =JSON.parse(user[0].up_preferred_genres)
   const prefGender= JSON.parse(user[0].up_preferred_gender)
   let videos = await user_services.get_all_videos(res,userPrefs,prefGender)
   res.send(videos);
}


exports.get_user_details = async (req, res) =>{
   
   let user_id = req.params["id"];
   console.log("Fetching details of user ", user_id);
   let user = await user_services.user_details_service(user_id)
   res.send(user);
}


exports.get_video_genres = async (req, res) =>{
   let video_id = req.query["video_id"];
   
   console.log("Fetching details of video ", video_id);
   let video = await user_services.video_genres_service(video_id)
   
   video_genres = []
   for(let i = 0; i<video.length; i++)
   {
      video_genres.push(video[i]['va_genre'])
   }
   res.send(video_genres);
   
}



exports.update_user_preferences = async (req, res) =>{
   
   let user_id = req.body["id"];
   let preferred_genres = JSON.stringify(req.body.preferred_genres);
   let preferred_gender = JSON.stringify(req.body.preferred_gender);
   console.log("Updating preferences of user ", user_id);
   let user = await user_services.update_preferences_service(user_id, preferred_genres, preferred_gender, res)
   res.send(user);
}


