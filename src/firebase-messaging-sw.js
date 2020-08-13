importScripts('https://www.gstatic.com/firebasejs/7.4.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.4.0/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '855283761727'
});

const messaging = firebase.messaging();