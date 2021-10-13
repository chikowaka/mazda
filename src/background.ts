/* When the browser-action button is clicked... */
import { v4 as uuidv4 } from 'uuid';

//UUIDがなければ生成
if(localStorage.getItem('uuid')){
  var uuid = localStorage.getItem('uuid');
  console.log(uuid);
}else{
  var uuid = uuidv4();
  localStorage.setItem('uuid',uuid);
  console.log(uuid);
};

function overWriteTweet(){
//Twitterを開いているタブをURLで指定　tabsにタブIDを代入
chrome.tabs.query( {url:'https://twitter.com/*'}, function(tabs){
  //上記タブID(tabs)で実行されるcontents.tsxのaddListnerに第２引数を送信
  chrome.tabs.sendMessage(tabs[0].id, {
    command: "brestResume",
    theme: localStorage.getItem("userTheme"),
    latestIdea: localStorage.getItem("latestIdea"),
    keyword: 'おにぎり'
  });
});
  // let ideaLogsJSON = {}
  // // ここで，「LatestIdeaがnullでなければ」，APIを叩いてDBからアイデアの履歴を取得する
  // if(localStorage.getItem("Latest Idea")){
  //   //　以下でリクエストを生成してAPIを叩く
  //   // instantiate a headers object
  //   var myHeaders = new Headers();
  //   // add content type header to object
  //   myHeaders.append("Content-Type", "application/json");
  //   // using built in JSON utility package turn object to string and store in a variable
  //   var raw = JSON.stringify({"OperationType": "QUERY", "Keys": {"UserID":uuid,"Theme":localStorage.getItem("userTheme")}});
  //   // create a JSON object with parameters for API call and store in a variable
  //   const redirectType:RequestRedirect = "follow";
  //   var requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: redirectType
  //   };
  //   // make API call with parameters and use promises to get response
  //   fetch("https://h761wghroj.execute-api.ap-northeast-1.amazonaws.com/wb_dev", requestOptions)
  //   .then(async res => {
  //     const t = await res.json()
  //     console.log("res", t)
  //     ideaLogsJSON = t
  //   }).then(() => {
  //     //Twitterを開いているタブをURLで指定　tabsにタブIDを代入
  //     chrome.tabs.query( {url:'https://twitter.com/*'}, function(tabs){
  //       //上記タブID(tabs)で実行されるcontents.tsxのaddListnerに第２引数を送信
  //       chrome.tabs.sendMessage(tabs[0].id, {
  //         command: "brestResume",
  //         theme: localStorage.getItem("userTheme"),
  //         ideaLogs:ideaLogsJSON
  //       });
  //     });
  //   })
  //   .catch(error => console.log('error', error));
  // }
}

chrome.alarms.create('NAME_OF_ALARM', { delayInMinutes: 2, periodInMinutes: 2 });
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name == 'NAME_OF_ALARM') {
    console.log('on_alarm');
    overWriteTweet()
  return true;
  }
});

chrome.runtime.onMessage.addListener((request, sender) => {
	if(request.type == 'userTheme'){//ここで判別
		console.log('inputed thema:', request);
    localStorage.setItem(request.data[0], request.data[1]);
    console.log(localStorage.getItem("userTheme"));
		return true;
	};
  if(request.type == 'debug'){//ここで判別
		overWriteTweet()
    console.log('debug done 2')
		return true;
	};
  if(request.type == 'newIdea'){//ここで判別
    // サーバにアイデアとユーザID(uuid)を送る
		console.log('Inputed Idea :',request.idea);
    localStorage.setItem("latestIdea", request.idea);
    // localStorage.setItem('Inputed Ideas', request.idea);

    //　以下でリクエストを生成してAPIを叩く
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({"OperationType": "PUT", "Keys": {"UserID":uuid,"Theme":localStorage.getItem("userTheme"),"Idea":request.idea}});
    // create a JSON object with parameters for API call and store in a variable
    const redirectType:RequestRedirect = "follow";
    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: redirectType
    };
    // make API call with parameters and use promises to get response
    fetch("https://h761wghroj.execute-api.ap-northeast-1.amazonaws.com/wb_dev", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    
		return true;
	}
});