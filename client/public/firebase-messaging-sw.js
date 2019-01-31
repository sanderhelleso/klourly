
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// initialize the Firebase app in the service worker by passing in the messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '737898303857'
});

// initialize firebase messaging
const messaging = firebase.messaging();

// handle notifications that are received in the
// background (Web app is closed or not in browser focus)
messaging.setBackgroundMessageHandler(payload => {
	console.log('[firebase-messaging-sw.js] Received background message ', payload);

	// notification option and structure, consuming given API data
	const notificationTitle = payload.data.title;
	const notificationOptions = {
		body: payload.data.body,
		icon: payload.data.icon,
		data: { url: payload.data.click_action },
		actions: [{ action: 'open_url', title: 'View Now'}]
	};

	// launch notification
	return self.registration.showNotification(notificationTitle, notificationOptions);
});

// handle push notification action
self.addEventListener('notificationclick', event => {

	// redirect to given site
	switch (event.action) {
		case 'open_url': clients.openWindow(event.notification.data.url);
		break;

}}, false);