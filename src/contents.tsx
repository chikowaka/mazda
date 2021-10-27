// ページへのjavascriptはここ
/* Listen for messages */

import './contents.css';


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  // const updated_tweet = document.getElementsByClassName('css-901oao css-16my406 r-1tl8opc r-bcqeeo r-qvutc0 flag_update');//Tweetのアカウント名〜いいねまで削除

  // タイムラインの読み込み
  if (msg['command'] == 'brestResume'){
    // console.log('ideaLogs:', msg['ideaLogs'][0]['Idea']);
    let theme = msg['theme']
    //Tweet内容の上書き 
    const target_tweet = document.getElementsByClassName('css-1dbjc4n r-1iusvr4 r-16y2uox r-1777fci r-kzbkwu');//Tweetのアカウント名〜いいねまで削除
    const new_tweet_text = document.createElement('span');
    new_tweet_text.className = 'css-901oao css-16my406 r-1tl8opc r-bcqeeo r-qvutc0 flag_update';
    
    //上書き済みかどうかを判定　上書きしていたら実行しない
    const updated_tweet_flag = target_tweet.item(0).children.item(0).classList.contains('flag_update');
    console.log('上書き済み判定：', updated_tweet_flag);

    //画像含まれるTweetかどうかを判定
    //タイムライントップのTweetのDOM要素を文字列に変換
    const target_tweet_str = target_tweet.item(0).children.item(1).outerHTML;
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
    if(target_tweet_str.match(/css-901oao r-18jsvk2 r-1tl8opc r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0/)){
      sent_tweet_flag = 1
    }else if(target_tweet_str.match(/css-901oao r-18jsvk2 r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0/)){
      sent_tweet_flag = 1
    }
    console.log('本文を含むか判定：', sent_tweet_flag);
    console.log('画像を含むか判定：', img_tweet_flag);
    console.log('動画を含むか判定：', mov_tweet_flag);


    if(!updated_tweet_flag){
      //挿入するhtmlを生成
      if(msg['latestIdea']){
        new_tweet_text.innerHTML = '\
        <div class="css-1dbjc4n r-1iusvr4 r-16y2uox r-1777fci r-kzbkwu update_contents">' 
          +'このTweetをヒントにアイデアを考えて入力してください！<br>'
          +'テーマは「' + theme +'」です。<br>' 
          + '<div class="flex-form">'
            + '<div class="cp_iptxt flex-item">'
              + '<input class="ef" type="text" id="newIdea" autocomplete="off">'
              + '<label>アイデア</label>'
              + '<span class="focus_line"></span>'
            + '</div>'
            + '<div class="flex-item form-idea">'
              + '<input class="reset button-shadow" type="button" id="inputIdea" value="入力" disabled>'
            + '</div>'
          +'</div>'
        +'</div>';
      }else{
        new_tweet_text.innerHTML = '\
        <div class="css-1dbjc4n r-1iusvr4 r-16y2uox r-1777fci r-kzbkwu">\
          <b>ブレストタイム！</b>'
          +'テーマは「' + theme +'」です。<br>' 
          + '<div class="flex-form">'
            + '<div class="cp_iptxt flex-item">'
              + '<input class="ef" type="text" id="newIdea" autocomplete="off">'
              + '<label>アイデア</label>'
              + '<span class="focus_line"></span>'
            + '</div>'
            + '<div class="flex-item form-idea">'
              + '<input class="reset button-shadow" type="button" id="inputIdea" value="入力" disabled>'
            + '</div>'
          +'</div>'
        +'</div>';
      }
    }
    
    console.log('上書き内容', new_tweet_text, typeof new_tweet_text)
    console.log('上書き対象Tweet', target_tweet.item(0))
    target_tweet.item(0).insertBefore(new_tweet_text,target_tweet.item(0).children.item(0));


    //Tweetトプ画の上書き
    // const target_profile_img = document.getElementsByClassName('r-1p0dtai r-1pi2tsx r-1d2f490 r-u8s1d r-ipm5af r-13qz1uu');
    // const new_profile_img = document.createElement('div');
    // new_profile_img.innerHTML = '<div aria-label="" class="css-1dbjc4n r-sdzlij r-1p0dtai r-1mlwlqe r-1d2f490 r-1udh08x r-u8s1d r-zchlnj r-ipm5af r-417010 flag_update"><div class="css-1dbjc4n r-1niwhzg r-vvn4in r-u6sd8q r-4gszlv r-1p0dtai r-1pi2tsx r-1d2f490 r-u8s1d r-zchlnj r-ipm5af r-13qz1uu r-1wyyakw" style="background-image: url(&quot;https://pbs.twimg.com/profile_images/1166895613427900417/7p3QS01J_normal.png&quot;);"></div><img alt="" draggable="true" src="https://pbs.twimg.com/profile_images/1166895613427900417/7p3QS01J_normal.png" class="css-9pa8cd"></div>';
    // console.log('上書きトプ画', target_profile_img.item(4));
    // target_profile_img.item(4).parentNode.replaceChild(new_profile_img, target_profile_img.item(4));
    
    //ボタンが押された時に入力フォームの内容をバックグラウンドに送信
    const inputIdeaButton = document.getElementById('inputIdea') as HTMLInputElement;
    inputIdeaButton.addEventListener('click', function(){
      const ideaText = document.getElementById('newIdea') as HTMLInputElement;
      console.log('Pushed!　新アイデア:', ideaText.value);
      const sendData = {type: 'newIdea', idea:ideaText.value, MediaTypeSent:sent_tweet_flag, MediaTypeImg:img_tweet_flag, MediaTypeMov:mov_tweet_flag};
      chrome.runtime.sendMessage(sendData);
      inputIdeaButton.value = '完了'
      setTimeout(function(){
        inputIdeaButton.value = '入力';
      },3000);
    });

    //入力フォームをバリデーションしてボタンの押せる押せないを制御
    const ideaText = document.getElementById('newIdea') as HTMLInputElement;
    ideaText.addEventListener('keydown', function(){
      const ideaText = document.getElementById('newIdea') as HTMLInputElement;
      console.log('keypressed')
      if(ideaText.value.length){
        inputIdeaButton.disabled = false;
      }else{
        inputIdeaButton.disabled = true;
      }
    });

    return true;
  }
});