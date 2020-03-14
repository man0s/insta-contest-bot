const dotenv = require('dotenv').config();
const instagood = require('instagood');

const user = new instagood(process.env.username, process.env.csrftoken, process.env.session_id);
const mediaId = process.env.media_id;
const comment = process.env.comment;

function getRandomPeriod() {
    return Math.floor(Math.random() * (5000 - 500 + 1)) + 500;
}

for (let index = 0; index < 1000; index++) {
    setTimeout(function timer() {
        user.comments(mediaId, comment)
            .then(
                (response) => {
                    if (response.status == 'ok') {
                        let ts = new Date(response.created_time * 1000);
                        console.log('Posted @ ' + ts.toLocaleString() + ' | ' + response.text);
                    }
                },
                (err) => console.log(err.status)
            )
    }, getRandomPeriod() * 100); //ms to (1-9) minutes
}
