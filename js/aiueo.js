var config = {
  apiKey: "AIzaSyAVKaNBE8KZK-BBTox0cHUJyTnucQ0g8dI",
  authDomain: "chatapp-182df.firebaseapp.com",
  databaseURL: "https://chatapp-182df.firebaseio.com",
  projectId: "chatapp-182df",
  storageBucket: "",
  messagingSenderId: "944793367568"
};
firebase.initializeApp(config);


// MSG送受信準備
const newPostRef = firebase.database().ref();

// MSG送信
$("#send").on("click", function(){
    newPostRef.push({
        username: $("#username").val(),
        text: $("#text").val()
    });
    $("#text").val("");
});
  
$("#text").on("keydown", function(e){
    console.log(e);
    if(e.keyCode == 13 && e.shiftKey == false) {
      newPostRef.push({
        username: $("#username").val(),
        text: $("#text").val()
      });
    }
});

// MSG受信
newPostRef.on("child_added", function(data){
    const v = data.val();
      // keyはデータを削除する時などに使用
      const k = data.key;
      // 記述方法は他にもある。
    const str = '<ul class="m1"><li class="m2">'+ v.username +'</li><li class="m3"><p>' + v.text + '</p></li></ul>';
    $("#output").append(str);
});





// //時間を求める  時間表示は保留
// function getTime() {
//   let dt = new Date();
//   let hours = dt.getHours();
//   let minutes = dt.getMinutes();

//   return hours +":"+ minutes;
// }