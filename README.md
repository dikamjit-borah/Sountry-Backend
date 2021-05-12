## Soundtry-Backend

<img src="https://github.com/biswajit-debnath/Soundtry-Backend/blob/main/mockup-images/Database%20ER%20diagram%20(crow's%20foot).png?raw=true"/>

## Features:

### Get User Connections
* Get rows of connection table where followerid= userId order by date limit 10 offset 0   

### Get User feed
* Get rows of video_categories table where cid= userCid1 OR userCid2 order by date limit 10 offset 0
* From each vid that we got from previous query get all all videos for that
* From each uid that is present in each video entry get all connection for that user.
* From that connection search if that user exists in that list

