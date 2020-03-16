const dotenv = require('dotenv').config();
const instagood = require('instagood');

const user = new instagood(process.env.username, process.env.csrftoken, process.env.session_id);
const mediaId = process.env.media_id;
const comment1 = process.env.comment1;
const comment2 = process.env.comment2;
const comment3 = process.env.comment3;

function getRandomPeriod() {
    return Math.random().toFixed(2) * (900000 - 600000) + 600000;
}

function getRandomComment() {
    let randomOption = Math.floor(Math.random() * 3) + 1; //1 to 3
    if(randomOption == 1) return comment1;
    else if (randomOption == 2) return comment2;
    return comment3;
}

for (let index = 0; index < 1000; index++) {
    setTimeout(function timer() {
        user.comments(mediaId, getRandomComment())
            .then(
                (response) => {
                    if (response.status == 'ok') {
                        let ts = new Date(response.created_time * 1000);
                        console.log('Posted @ ' + ts.toLocaleString() + ' | ' + response.text);
                    }
                },
                (err) => {
                    let ts = new Date();
                    console.log('Failed @ ' + ts.toLocaleString());
                }
            )
    }, getRandomPeriod() * index); //comment every 10-15 minutes
}
