var firebaseConfig = {
  apiKey: "AIzaSyD_UqWNiPjzcnwSaBluRwNLsDLyLV3bHF8",
  authDomain: "c-93-project.firebaseapp.com",
  databaseURL: "https://c-93-project-default-rtdb.firebaseio.com",
  projectId: "c-93-project",
  storageBucket: "c-93-project.appspot.com",
  messagingSenderId: "916679728213",
  appId: "1:916679728213:web:b41827fdda94c6cc2548dc"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "welcome " + user_name + "!";

function addroom() {
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
  });
  localStorage.setItem("room_name", room_name);
  window.location = "kwitter_page.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
              childKey = childSnapshot.key;
              Room_names = childKey;
              console.log("room name = " + Room_names);
              row = "<div class='room_name' id=" + Room_names + " onclick='redirect(this.id)'>#" + Room_names + "</div><hr>";
              document.getElementById("output").innerHTML += row;


        });
  });
}
getData();

function redirect(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}