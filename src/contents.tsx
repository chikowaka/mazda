// ページへのjavascriptはここ
/* Listen for messages */

import './contents.css';


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  // const updated_tweet = document.getElementsByClassName('css-901oao css-16my406 r-1tl8opc r-bcqeeo r-qvutc0 flag_update');//Tweetのアカウント名〜いいねまで削除
  if (msg['command'] == 'brestResume'){
    // console.log('ideaLogs:', msg['ideaLogs'][0]['Idea']);
    //Tweet内容の上書き 
    const target_tweet = document.getElementsByClassName('css-1dbjc4n r-1iusvr4 r-16y2uox r-1777fci r-kzbkwu');//Tweetのアカウント名〜いいねまで削除
    const new_tweet_text = document.createElement('span');
    new_tweet_text.className = 'css-901oao css-16my406 r-1tl8opc r-bcqeeo r-qvutc0 flag_update';
    
    //上書き済みかどうかを判定　上書きしていたら実行しない　前者は上部に挿入　後者は下部に挿入時
    // const updated_tweet_flag = target_tweet.item(0).children.item(0).classList.contains('flag_update');
    const updated_tweet_flag = target_tweet.item(0).lastElementChild.classList.contains('flag_update');

    console.log('上書き済み判定：', updated_tweet_flag);

    //画像含まれるTweetかどうかを判定
    //タイムライントップのTweetのDOM要素を文字列に変換
    var i = 0
    if(updated_tweet_flag){
      i = 2
    }else{
      i = 1
    }
    const target_tweet_str = target_tweet.item(0).children.item(i).outerHTML;
    //画像についているclassの塊　css-1dbjc4n r-1p0dtai r-1mlwlqe r-1d2f490 r-11wrixw r-61z16t r-1udh08x r-u8s1d r-zchlnj r-ipm5af r-417010
    //動画についているclassの塊　css-1dbjc4n r-1p0dtai r-1loqt21 r-1d2f490 r-u8s1d r-zchlnj r-ipm5af
    //文についているclassの塊　　css-901oao r-18jsvk2 r-1tl8opc r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0


    //もし上記のclassがDOMに含まれていたら，マッチ配列が返ってきて，なかったらnullが返ってくるので，そのメディアがあれば１なければ０になる
    var img_tweet_flag = 0
    var mov_tweet_flag = 0
    var sent_tweet_flag = 0
    
    if(target_tweet_str.match(/css-1dbjc4n r-1p0dtai r-1mlwlqe r-1d2f490 r-11wrixw r-61z16t r-1udh08x r-u8s1d r-zchlnj r-ipm5af r-417010/)){
      img_tweet_flag = 1
    }else if(target_tweet_str.match(/css-1dbjc4n r-1p0dtai r-1loqt21 r-1d2f490 r-u8s1d r-zchlnj r-ipm5af/)){
      mov_tweet_flag = 1
    }
    // 日本語と英語で適用されているclassが違ったのでそれぞれ判定
    if(target_tweet_str.match(/css-901oao r-18jsvk2 r-1tl8opc r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0/)){
      sent_tweet_flag = 1
    }else if(target_tweet_str.match(/css-901oao r-18jsvk2 r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0/)){
      sent_tweet_flag = 1
    }
    console.log('本文を含むか判定：', sent_tweet_flag);
    console.log('画像を含むか判定：', img_tweet_flag);
    console.log('動画を含むか判定：', mov_tweet_flag);

    // 対象となるTweetのIDを取得
    const twitter_lang = document.getElementsByTagName('html').item(0).getAttribute('lang')
    let tweetID = '1481312055743315971'
    if(twitter_lang == 'ja'){
      tweetID = target_tweet.item(0).getElementsByClassName('css-4rbku5 css-18t94o4 css-901oao r-1loqt21 r-1q142lx r-1tl8opc r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-3s2u2q r-qvutc0').item(0).getAttribute('href').split('/').slice(-1)[0]
      // tweetID = target_tweet.item(0).getElementsByClassName('css-4rbku5 css-18t94o4 css-901oao r-14j79pv r-1loqt21 r-1q142lx r-1tl8opc r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-3s2u2q r-qvutc0').item(0).getAttribute('href').split('/').slice(-1)[0]
    }else if(twitter_lang == 'en'){
      tweetID = target_tweet.item(0).getElementsByClassName('css-4rbku5 css-18t94o4 css-901oao r-1loqt21 r-1q142lx r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-3s2u2q r-qvutc0').item(0).getAttribute('href').split('/').slice(-1)[0]
      // tweetID = target_tweet.item(0).getElementsByClassName('css-4rbku5 css-18t94o4 css-901oao r-14j79pv r-1loqt21 r-1q142lx r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-3s2u2q r-qvutc0').item(0).getAttribute('href').split('/').slice(-1)[0]
    }
    // 右のパターンも有る。r-14j79pvが抜けてるっぽい。でも時間経orマウスでホバーするとつく。なんだコレ。「 css-4rbku5 css-18t94o4 css-901oao r-1loqt21 r-1q142lx r-1tl8opc r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-3s2u2q r-qvutc0」
    
    //挿入するhtmlを生成
    new_tweet_text.innerHTML = `
      <div class="css-1dbjc4n r-1iusvr4 r-16y2uox r-1777fci r-kzbkwu update_contents">
        ブレストタイム！<br>
        テーマは「斬新で仲が深まる新入生歓迎オリエンテーション」です。<br>
        <input class="reset button-shadow" type="button" id="${tweetID}" value="アイデアを入力">
      </div>`
    
    
    console.log('上書き内容', new_tweet_text, typeof new_tweet_text)
    console.log('上書き対象Tweet', target_tweet.item(0))


    // 更新済みフラグのあるTweetが最上部のときは挿入しない。
    if(!updated_tweet_flag){
      // 前者はTweet上部　後者はTweet下部に挿入する
      // target_tweet.item(0).insertBefore(new_tweet_text,target_tweet.item(0).children.item(0));
      target_tweet.item(0).appendChild(new_tweet_text);
      console.log('Link Inserted')

      // 挿入のログを送信　APIを使用
      // make API call with parameters and use promises to get response
      // instantiate a headers object
      var myHeaders = new Headers();
      // add content type header to object
      myHeaders.append("Content-Type", "application/json");
      // using built in JSON utility package turn object to string and store in a variable
      var raw = JSON.stringify({
        'UserID':msg['UserID'],
        'ActionType': 'insert',
        'TweetID': tweetID
      });
      console.log('raw',raw);
      // create a JSON object with parameters for API call and store in a variable
      const redirectType:RequestRedirect = "follow";
      var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: redirectType
      };
      fetch("https://qvshu3x302.execute-api.ap-northeast-1.amazonaws.com/wb_dev", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

      
      //ボタンが押された時にそのツイートのIDを取得してwebアプリへ遷移するイベントリスナーのインスタンス？を生成。実行された数だけ個別のリスナーが作られる。
      const inputIdeaButton = document.getElementById(tweetID) as HTMLInputElement;
      inputIdeaButton.addEventListener('click', function(){
        console.log('tweetID:', tweetID)
        window.open('https://master.d1321rgyhhbzcx.amplifyapp.com/?tweetID=' + tweetID + '&sent=' + sent_tweet_flag + '&img=' + img_tweet_flag + '&mov=' + mov_tweet_flag)
        // クリックログを送信　APIを使用
        // make API call with parameters and use promises to get response
        // instantiate a headers object
        var myHeaders = new Headers();
        // add content type header to object
        myHeaders.append("Content-Type", "application/json");
        // using built in JSON utility package turn object to string and store in a variable
        var raw = JSON.stringify({
          'UserID':msg['UserID'],
          'ActionType': 'click',
          'TweetID': tweetID
        });
        // create a JSON object with parameters for API call and store in a variable
        const redirectType:RequestRedirect = "follow";
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: redirectType
        };
        fetch("https://qvshu3x302.execute-api.ap-northeast-1.amazonaws.com/wb_dev", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      });
    }

    return true;
  }else if(msg['command'] == 'notUserID'){
    window.alert('右上の[I]アイコンからユーザIDを入力してください');
  }
});

// 英語
// css-4rbku5 css-18t94o4 css-901oao r-14j79pv r-1loqt21 r-1q142lx r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-3s2u2q r-qvutc0
// 日本語
// css-4rbku5 css-18t94o4 css-901oao r-14j79pv r-1loqt21 r-1q142lx r-1tl8opc r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-3s2u2q r-qvutc0