var cron = require('node-cron');
var execa = require('execa');
var axios = require('axios');

function addTask(name, project, labels) {
    axios.post('http://localhost:8000', {
        name,
        project,
        labels
    })
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

// m h DoM M DoW
cron.schedule('0 0 20 * *', () => { // every 20th of the month
    addTask('Pay Globe - 09176294439', 'Inbox', ['ThisWeek']);
    addTask('Pay Globe At Home Wifi', 'Inbox', ['ThisWeek']);
    addTask('Pay Credit Card', 'Inbox', ['ThisWeek']);
    addTask('Transfer 13K to EastWest', 'Inbox', ['ThisWeek']);
});

cron.schedule('0 0 11 * *', () => { // every 11th of the month
    addTask('Text St. Peter Agent', 'Inbox', ['ThisWeek', 'To_Tacloban']);
    addTask('Pay St. Peter', 'Inbox', ['ThisMonth', 'At_Peerless']);
});
