/* When the browser-action button is clicked... */

function overWriteTweet(){
  // UserIDがない場合は警告を出す
  if(localStorage.getItem("userID")){
    //Twitterを開いているタブをURLで指定　tabsにタブIDを代入
    chrome.tabs.query( {url:'https://twitter.com/*'}, function(tabs){
      //上書きを実行するスクリプトへの命令。上記タブID(tabs)で実行されるcontents.tsxのaddListnerに第２引数を送信
      chrome.tabs.sendMessage(tabs[0].id, {
        command: "brestResume",
        UserID: localStorage.getItem("userID")
      });
    });
  }else{
    chrome.tabs.query( {url:'https://twitter.com/*'}, function(tabs){
      //上書きを実行するスクリプトへの命令。上記タブID(tabs)で実行されるcontents.tsxのaddListnerに第２引数を送信
      chrome.tabs.sendMessage(tabs[0].id, {
        command: "notUserID"
      });
    });
  }
  

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

//一定時間で書き換え指示 ２分
chrome.alarms.create('2MIN', { delayInMinutes: 2, periodInMinutes: 2 });
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name == '2MIN') {
    console.log('on_alarm');
    overWriteTweet()
  return true;
  }
});

chrome.runtime.onMessage.addListener((request, sender) => {
	if(request.type == 'userID'){//ここで判別
		console.log('inputed userID:', request);
    localStorage.setItem(request.data[0], request.data[1]);
    console.log(localStorage.getItem("userID"));
		return true;
	};
  if(request.type == 'debug'){//ここで判別
		overWriteTweet()
    console.log('debug done')
		return true;
	};


  // if(request.type == 'newIdea'){//ここで判別
  //   // サーバにアイデアとユーザID(uuid)を送る
	// 	console.log('Inputed Idea :',request.idea);
  //   localStorage.setItem("latestIdea", request.idea);
  //   // localStorage.setItem('Inputed Ideas', request.idea);

  //   //　以下でリクエストを生成してAPIを叩く
  //   // instantiate a headers object
  //   var myHeaders = new Headers();
  //   // add content type header to object
  //   myHeaders.append("Content-Type", "application/json");
  //   // using built in JSON utility package turn object to string and store in a variable
  //   var raw = JSON.stringify({"OperationType": "PUT", "Keys": {"UserID":uuid,"Theme":localStorage.getItem("userTheme"),"Idea":request.idea,"MediaTypeSent":request.MediaTypeSent,"MediaTypeImg":request.MediaTypeImg,"MediaTypeMov":request.MediaTypeMov,"GroupType":0}});
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
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));
    
	// 	return true;
	// }
});