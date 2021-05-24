const ErrorGenerator = require("../utilities/ErrorGenerator");
const db = "../models/index";
const { NOTES_TABLE } = require("../models/index");
const pool = require("../utilities/db");
const { config } = require("dotenv");

exports.create_new_user_service = async (req, res) => {
  let dp =
    "https://cdn1.iconfinder.com/data/icons/user-pictures/100/boy-256.png";
  var curr_user_id = new Date().valueOf();

  let full_name = req.body.user_details.full_name;
  let user_name = req.body.user_details.user_name;
  let gender = req.body.user_details.gender;
  let date_joined = req.body.user_details.date_joined;
  let preferred_genres = JSON.stringify(req.body.user_preferences.preferred_genres);
  let preferred_gender = JSON.stringify(req.body.user_preferences.preferred_gender);
  let phone = req.body.user_details.phone;
  let email = req.body.user_details.email;
  let password = req.body.user_details.password;

  const query1 = `INSERT INTO users (user_id, user_name, user_gender, user_dp, user_full_name)
    VALUES ('${curr_user_id}', '${user_name}', '${gender}', '${dp}', '${full_name}')`;
  const query2 = `INSERT INTO user_profiles (up_user_id, up_user_name, up_dp, up_full_name, up_gender, up_date_joined, up_preferred_genres, up_preferred_gender, up_phone, up_email, up_password)
    VALUES ('${curr_user_id}', '${user_name}', '${dp}', '${full_name}', '${gender}', '${date_joined}', '${preferred_genres}',' ${preferred_gender}', '${phone}',' ${email}', '${password}')`;

  try {
    await pool.query(query1);
    await pool.query(query2);
  } catch (error) {
    ErrorGenerator.generateError(error, res);
  }

  return {
    status: "200",
    data: {
      curr_user_id,
      message: "User successfully created",
    },
  };
};

exports.authenticate_agent = async (user_id, user_password) => {
  let agent;
  try {
    agent = await AGENTS_TABLE.findOne({
      where: {
        agent_id: user_id,
      },
    });
  } catch (error) {
    ErrorGenerator.generateError(error.name, res);
  }

  return agent;
};
