const ErrorGenerator = require("../utilities/ErrorGenerator");
const db = "../models/index";
const pool = require("../utilities/db");
const { config } = require("dotenv");



exports.insert_all_videos = async (video_id, video_url, video_creator_id, video_date_created, res) => {
    let temp;
    const query1 = `INSERT INTO all_videos (video_id, video_url, video_creator_id, video_date_created)
    VALUES ('${video_id}', '${video_url}', '${video_creator_id}', '${video_date_created}')`;
    try {
        temp = await pool.query(query1);
       
      } catch (error) {
        ErrorGenerator.generateError(error, res);
      }
    
      return {status:200, data:`Video ${video_id} uploaded to all_videos`}
}


exports.insert_video_attributes = async (curr_video_id, genre,user_gender, video_date_created, res) => {
    let temp;
    let va_id = new Date().valueOf() + Math.floor(Math.random() * 101) 
    const query1 = `INSERT INTO video_attributes (va_id, va_video_id, va_genre, va_gender, va_date_created)
    VALUES ('${va_id}', '${curr_video_id}', '${genre}', '${user_gender}', '${video_date_created}')`;
    try {
        temp = await pool.query(query1);
       
      } catch (error) {
        ErrorGenerator.generateError(error, res);
      }
    
      return {status:200, data:`Video ${curr_video_id} uploaded to video_attributes`}

}


exports.get_all_videos = async (res,userPrefs,prefGender) =>{
  let userPrefsString=''
  let prefGenderString=''
  const changePrefArrayToString = ()=> userPrefs.forEach((pref,i)=> {
    if(i==0)
      userPrefsString=`'${pref}'`  
    else
    userPrefsString=userPrefsString + ',' + `'${pref}'`
  })
  const changePrefGenderArrayToString = ()=> prefGender.forEach((pref,i)=> {
    if(i==0)
      prefGenderString=`'${pref}'`  
    else
    prefGenderString=prefGenderString + ',' + `'${pref}'`
  })
  changePrefArrayToString()
  changePrefGenderArrayToString()
  console.log(userPrefsString);
  const query1 = `select * from all_videos where video_id In (select distinct(va_video_id) from video_attributes where va_genre In (` + `${userPrefsString}` + `) And va_gender In (` + `${prefGenderString}` + `) Limit 10 Offset 0)`;
  console.log(query1);
  let temp;
  try {
    temp = await pool.query(query1);
    console.log(temp.rows);
   
  } catch (error) {
    ErrorGenerator.generateError(error, res);
  }
  return((temp.rows))
}

exports.user_details_service = async (user_id, res) => {
  const query1 = `SELECT * FROM user_profiles WHERE up_user_id = '${user_id}'`;
  let results;
  try {
    results = await pool.query(query1)
  } catch (error) {
    ErrorGenerator.generateError(error, res);
  }
  return results.rows
}

exports.video_genres_service = async (video_id, res) => {
  const query1 = `SELECT * FROM video_attributes WHERE va_video_id = '${video_id}'`;
  let results;
  try {
    results = await pool.query(query1)
  } catch (error) {
    ErrorGenerator.generateError(error, res);
  }
  return results.rows
}


exports.update_preferences_service = async (user_id, preferred_genres, preferred_gender, res) => {

  //console.log("up_pref_service,", user_id, preferred_gender, preferred_genres);

  const query1 = `UPDATE user_profiles SET up_preferred_gender = '${preferred_gender}', up_preferred_genres = '${preferred_genres}'  WHERE up_user_id = '${user_id}'`;
  let results;
  try {
    results = await pool.query(query1)
  } catch (error) {
    ErrorGenerator.generateError(error, res);
  }
  return {status:200, message:"Preferences updated successfully"}
}

exports.post_requirement_service = async (req, res) =>{

  let post_id = new Date().valueOf()
  let user_id = req.body["user_id"]
  let user_name = req.body["user_name"]
  let post_requirement = req.body["post_requirement"]
  let post_description = req.body["post_description"]
  let user_phone = req.body["user_phone"]
  let requirement_date = req.body["requirement_date"]


  const query1 = `INSERT INTO forum (post_id, user_id, user_name, post_requirement, post_description, user_phone, requirement_date)
  VALUES ('${post_id}', '${user_id}', '${user_name}', '${post_requirement}', '${post_description}', '${user_phone}', '${requirement_date}' )`;
 
  let results;
  try {
    results = await pool.query(query1)
  } catch (error) {
    ErrorGenerator.generateError(error, res);
  }
  return {status:200, message:"Requirement posted"}
}

exports.fetch_forum_posts = async (res) =>{
  const query1 = `SELECT * FROM forum`;
  let results;
  try {
    results = await pool.query(query1)
  } catch (error) {
    ErrorGenerator.generateError(error, res);
  }
  return {status:200, data:results.rows}
}