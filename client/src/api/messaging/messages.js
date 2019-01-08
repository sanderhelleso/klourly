
export const messages = {
    notifyOpenRoom
}

async function notifyOpenRoom(key, token, notification) {

    var notification = {
        'title': 'Portugal vs. Denmark',
        'body': '5 to 1',
        'icon': 'firebase-logo.png',
        'click_action': 'http://localhost:8081'
    };

    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'post',
        headers: {
            Authorization: `key=${key}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            notification: notification,
            to: token
        })
    });
    
    console.log(response);
}