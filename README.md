## Sountry-Backend

<img src="https://github.com/biswajit-debnath/Soundtry-Backend/blob/main/mockup-images/Database%20ER%20diagram%20(crow's%20foot).png?raw=true"/>

## Features:

### Get User Connections
* Get rows of connection table where followerid= userId order by date limit 10 offset 0   

### Get User feed
* Get rows of video_categories table where cid= userCid1 OR userCid2 order by date limit 10 offset 0
* From each vid that we got from previous query get all all videos for that
* From each uid that is present in each video entry get all connection for that user.
* From that connection search if that user exists in that list



## SQL QUERIES

### create tables

CREATE TABLE all_videos (
    video_id int NOT NULL,
    video_url varchar(1000),
    video_user_id int NOT NULL,
    PRIMARY KEY (video_id),
    FOREIGN KEY (video_user_id) REFERENCES users(user_id)
);

CREATE TABLE connections (
    connection_id int NOT NULL,
    request_to_id int NOT NULL,
    request_by_id int NOT NULL,
    PRIMARY KEY (connection_id),
    FOREIGN KEY (request_to_id) REFERENCES users(user_id),
    FOREIGN KEY (request_by_id) REFERENCES users(user_id)
);

CREATE TABLE video_by_category (
    vbc_id int NOT NULL,
    video_id int NOT NULL,
    category_id int NOT NULL,
    PRIMARY KEY (vbc_id),
    FOREIGN KEY (video_id) REFERENCES all_videos(video_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
 );

