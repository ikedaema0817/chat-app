let room
let userName


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
const newPostRef = firebase.database();

// MSG送信
$("#send").on("click", function () {
  room = $('input[name="room"]:checked').val();
  userName = $("#username").val();
  //ユーザーネームの値をローカルストレージに格納(ログイン実装までの時間稼ぎ)
  localStorage.setItem("name", userName);

  //ラジオボタン の値によって格納場所を変更
  newPostRef.ref(room).push({
    username: userName,
    text: $("#text").val(),
  });
  $("#text").val("");
});

// //space+ENTER送信についてはあとで
// $("#text").on("keydown", function(e){
//     console.log(e);
//     if(e.keyCode == 13 && e.shiftKey == false) {
//       newPostRef.push({
//         username: $("#username").val(),
//         text: $("#text").val()
//       });
//     }
// });

// MSG受信
//もしラジオタグroomがクリックされたらoutputの子要素を全部消して受信
//ラジオボタン の値が変わるたびにroomの値を代入
$('input[name="room"]').on("click", function () {
  $("#output").empty();
  room = $('input[name="room"]:checked').val();
  newPostRef.ref(room).on("child_added", function (data) {
    const v = data.val();
    // keyはデータを削除する時などに使用
    const k = data.key;
    // 記述方法は他にもある。
    //if文で自分の名前の時と他の名前の人で場合分けする。
    //まずは送信した時にセットしよう(ローカルストレージに)
    if (localStorage.getItem("name") == v.username) {
      const str =
        '<div class="balloon"><figure class="balloon-image-left"><img src="https://moriawase.net/img/no-img2.png" alt="no-img2"><figcaption class="balloon-image-description">' +
        v.username + '</figcaption></figure><div class="balloon-text-right"><p>' +
        v.text + '</p></div></div>'
      $("#output").append(str);
    } else {
      const str =
        '<div class="balloon"><figure class="balloon-image-right"><img src="）" alt="画像名"><figcaption class="balloon-image-description">' +
        v.username + '</figcaption></figure><div class="balloon-text-left"><p>' +
        v.text + '</p></div></div>'
      $("#output").append(str);
    }
  });
})



// 音声認識機能
var recognition;

// 音声認識中か否かのフラグ
var nowRecognition = false;

// 音声認識を開始するメソッド
function start () {
    // 音声認識のインスタンスを作成します
    recognition = new webkitSpeechRecognition();
    // 利用言語を選択します（Chromeでは日本語も使えます）
    recognition.lang =  "ja-JP"
    // 音声認識が終了したら結果を取り出すためのコールバック
    recognition.onresult = function (e) {
        if (e.results.length > 0) {
            var value = e.results[0][0].transcript;
            document.querySelector('#text').textContent = value;
        }
    };
    // 音声認識開始
    recognition.start();
    nowRecognition = true;
};

// 音声認識を停止するメソッド
function stop () {
    recognition.stop();
    nowRecognition = false;
}

// ボタンアクションを定義
//まずはマイクボタンを押した時に画像変更
let onoff = "off";
$("#maiku").on("click",function () {
  console.log("test");
  switch (onoff) {
    case "off" :
      onoff = "on";
      $(this).attr('src','./img/maikured.jpg');
      break;
    case "on":
      onoff = "off";
      $(this).attr('src','./img/maiku1.jpg');
      break;
  }
  
    
    // unsupported.
    if (!'webkitSpeechRecognition' in window) {
        alert('Web Speech API には未対応です.');
        return;
    }
    
    if (nowRecognition) {
        // 音声認識終了
        stop();
    } else {
        // 音声認識開始
        start();
    }
})










// //時間を求める  時間表示は保留
// function getTime() {
//   let dt = new Date();
//   let hours = dt.getHours();
//   let minutes = dt.getMinutes();

//   return hours +":"+ minutes;
// }