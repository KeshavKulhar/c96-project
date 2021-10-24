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
room_name = localStorage.getItem("room_name");

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
          name: user_name,
          message: msg,
          like: 0
    });
    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
          document.getElementById("output").innerHTML = "";
          snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                childData = childSnapshot.val();
                if (childKey != "purpose") {
                      firebase_message_id = childKey;
                      message_data = childData;

                      console.log(firebase_message_id);
                      console.log(message_data);
                      name = message_data['name'];
                      message = message_data['message'];
                      like = message_data['like'];
                      name_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
                      message_tag = "<h4 class='message_h4'>" + message + "</h4>";
                      like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updatelike(this.id)'>";
                      span_tag = "<span class='glyphicon glyphicon-thumbs-up'>like: " + like + "</span></button><hr>";

                      row = name_tag + message_tag + like_button + span_tag;
                      document.getElementById("output").innerHTML += row;

                }
          });
    });
}
getData();

function updatelike(message_id){
    button_id=message_id;
    likes=document.getElementById(button_id).value;
    updated_like=Number(likes)+1;
    firebase.database().ref(room_name).child(message_id).update({
          like: updated_like
    });
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}