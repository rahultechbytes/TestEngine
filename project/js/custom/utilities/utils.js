// Initialize Firebase
var config = {
    apiKey: "AIzaSyA1r7vIQBqk_MBkqneSJpKgt9yDmgGTP14",
    authDomain: "quiz-projectbmpl.firebaseapp.com",
    databaseURL: "https://quiz-projectbmpl.firebaseio.com",
    projectId: "quiz-projectbmpl",
    storageBucket: "",
    messagingSenderId: "748928923761"
  };
  firebase.initializeApp(config);
  
  function* autoGen(){
    var counter = 1;
    while(true){
    yield counter;
    counter++;
    }
    }