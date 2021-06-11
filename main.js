song = "";
song1_status = "";
song2_status = "";

var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;

var scoreLeftWrist = 0;
var scoreRightWrist = 0;

function preload()
{
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet is Initialized");
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
	stroke("#FF0000");

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song2.stop();

        if(song1_status == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "Playing : Hedwig's Theme";
        }
    }

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song1.stop();

        if(song2_status == false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "Playing : Take On Me";
        }
    }
}

function gotPoses(results){
    if(results.length > 0)
    {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + "Left Wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + "Right Wrist Y = " + rightWristY);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
    }
}