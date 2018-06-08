import firebase from 'firebase';

// Initialize Firebase
const config = {
	apiKey: "AIzaSyAdjusRoJHSiDThVyQPOFese-C4dyj1btE",
	authDomain: "jira-board-3e828.firebaseapp.com",
	databaseURL: "https://jira-board-3e828.firebaseio.com",
	projectId: "jira-board-3e828",
	storageBucket: "",
	messagingSenderId: "111572549412"
};

firebase.initializeApp(config);
export default firebase;