// ページへのjavascriptはここ
/* Listen for messages */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  // const updated_tweet = document.getElementsByClassName('css-901oao css-16my406 r-1tl8opc r-bcqeeo r-qvutc0 flag_update');//Tweetのアカウント名〜いいねまで削除

  // タイムラインの読み込み


  if (msg['command'] == 'brestResume'){
    // console.log('ideaLogs:', msg['ideaLogs'][0]['Idea']);
    let theme = msg['theme']
    //Tweet内容の上書き 
    const target_tweet_text = document.getElementsByClassName('css-1dbjc4n r-1iusvr4 r-16y2uox r-1777fci r-kzbkwu');//Tweetのアカウント名〜いいねまで削除
    const new_tweet_text = document.createElement('span');
    new_tweet_text.className = 'css-901oao css-16my406 r-1tl8opc r-bcqeeo r-qvutc0 flag_update';
    const profileTweet_action_html = '<div aria-label="0 件の返信、88888 件のリツイート、888888 件のいいね" role="group" class="css-1dbjc4n r-18u37iz r-1wtj0ep r-1s2bzr4 r-1mdbhws" id="id__ow692f78du"><div class="css-1dbjc4n r-18u37iz r-1h0z5md"><div aria-label="0 件の返信。返信する" role="button" tabindex="0" class="css-18t94o4 css-1dbjc4n r-1777fci r-bt1l66 r-1ny4l3l r-bztko3 r-lrvibr" data-testid="reply"><div dir="ltr" class="css-901oao r-1awozwy r-14j79pv r-6koalj r-1qd0xha r-a023e6 r-16dba41 r-1h0z5md r-rjixqe r-bcqeeo r-o7ynqc r-clp7b1 r-3s2u2q r-qvutc0"><div class="css-1dbjc4n r-xoduu5"><div class="css-1dbjc4n r-1niwhzg r-sdzlij r-1p0dtai r-xoduu5 r-1d2f490 r-xf4iuw r-1ny4l3l r-u8s1d r-zchlnj r-ipm5af r-o7ynqc r-6416eg"></div><svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg></div><div class="css-1dbjc4n r-xoduu5 r-1udh08x"><span class="css-901oao css-16my406 r-1tl8opc r-n6v787 r-1cwl3u0 r-1k6nrdp r-1e081e0 r-d3hbe1 r-axxi2z r-qvutc0" style="transition-duration: 0.3s;"><span class="css-901oao css-16my406 r-1tl8opc r-bcqeeo r-qvutc0">0</span></span></div></div></div></div><div class="css-1dbjc4n r-18u37iz r-1h0z5md"><div aria-expanded="false" aria-haspopup="menu" aria-label="88888 件のリツイート。リツイートする" role="button" tabindex="0" class="css-18t94o4 css-1dbjc4n r-1777fci r-bt1l66 r-1ny4l3l r-bztko3 r-lrvibr" data-testid="retweet"><div dir="ltr" class="css-901oao r-1awozwy r-14j79pv r-6koalj r-1qd0xha r-a023e6 r-16dba41 r-1h0z5md r-rjixqe r-bcqeeo r-o7ynqc r-clp7b1 r-3s2u2q r-qvutc0"><div class="css-1dbjc4n r-xoduu5"><div class="css-1dbjc4n r-1niwhzg r-sdzlij r-1p0dtai r-xoduu5 r-1d2f490 r-xf4iuw r-1ny4l3l r-u8s1d r-zchlnj r-ipm5af r-o7ynqc r-6416eg"></div><svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg></div><div class="css-1dbjc4n r-xoduu5 r-1udh08x"><span class="css-901oao css-16my406 r-1tl8opc r-n6v787 r-1cwl3u0 r-1k6nrdp r-1e081e0 r-d3hbe1 r-axxi2z r-qvutc0" style="transition-duration: 0.3s;"><span class="css-901oao css-16my406 r-1tl8opc r-bcqeeo r-qvutc0">88888</span></span></div></div></div></div><div class="css-1dbjc4n r-18u37iz r-1h0z5md"><div aria-label="888888 件のいいね。いいねする" role="button" tabindex="0" class="css-18t94o4 css-1dbjc4n r-1777fci r-bt1l66 r-1ny4l3l r-bztko3 r-lrvibr" data-testid="like"><div dir="ltr" class="css-901oao r-1awozwy r-14j79pv r-6koalj r-1qd0xha r-a023e6 r-16dba41 r-1h0z5md r-rjixqe r-bcqeeo r-o7ynqc r-clp7b1 r-3s2u2q r-qvutc0"><div class="css-1dbjc4n r-xoduu5"><div class="css-1dbjc4n r-1niwhzg r-sdzlij r-1p0dtai r-xoduu5 r-1d2f490 r-xf4iuw r-1ny4l3l r-u8s1d r-zchlnj r-ipm5af r-o7ynqc r-6416eg"></div><svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg></div><div class="css-1dbjc4n r-xoduu5 r-1udh08x"><span class="css-901oao css-16my406 r-1tl8opc r-n6v787 r-1cwl3u0 r-1k6nrdp r-1e081e0 r-u8s1d r-axxi2z r-qvutc0" style="transition-duration: 0.3s; transform: translate3d(0px, -100%, 0px);"><span class="css-901oao css-16my406 r-1tl8opc r-bcqeeo r-qvutc0">0</span></span><span class="css-901oao css-16my406 r-1tl8opc r-n6v787 r-1cwl3u0 r-1k6nrdp r-1e081e0 r-d3hbe1 r-axxi2z r-qvutc0" style="transition-duration: 0.3s;"><span class="css-901oao css-16my406 r-1tl8opc r-bcqeeo r-qvutc0">8888888</span></span></div></div></div></div><div class="css-1dbjc4n r-18u37iz r-1h0z5md"><div aria-expanded="false" aria-haspopup="menu" aria-label="ツイートを共有" role="button" tabindex="0" class="css-18t94o4 css-1dbjc4n r-1777fci r-bt1l66 r-1ny4l3l r-bztko3 r-lrvibr"><div dir="ltr" class="css-901oao r-1awozwy r-14j79pv r-6koalj r-1qd0xha r-a023e6 r-16dba41 r-1h0z5md r-rjixqe r-bcqeeo r-o7ynqc r-clp7b1 r-3s2u2q r-qvutc0"><div class="css-1dbjc4n r-xoduu5"><div class="css-1dbjc4n r-1niwhzg r-sdzlij r-1p0dtai r-xoduu5 r-1d2f490 r-xf4iuw r-1ny4l3l r-u8s1d r-zchlnj r-ipm5af r-o7ynqc r-6416eg"></div><svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path><path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path></g></svg></div></div></div></div></div>'
    //最初はテーマとキーワードの組み合わせで．その後はアイデア＋キーワードを表示
    if(msg['latestIdea']){
      new_tweet_text.innerHTML = '\
      <div class="css-1dbjc4n r-1iusvr4 r-16y2uox r-1777fci r-kzbkwu">\
        <b>いつでもブレスト</b>\
        ブレストタイム！テーマは「' + theme +'」です。<br>' 
        + 'これまでに考えたアイデア:「'+ msg['latestIdea'] +'」<br>'
        + 'これらと次のキーワードを組み合わてアイデアを１つ入力してください！<br>'
        + 'キーワード:「'+ msg['keyword'] +'」'
        + profileTweet_action_html + '</div>';
    }else{
      new_tweet_text.innerHTML = '\
      <div class="css-1dbjc4n r-1iusvr4 r-16y2uox r-1777fci r-kzbkwu">\
        <b>いつでもブレスト</b>\
        ブレストタイム！テーマは「' + theme +'」です。<br>' 
        + 'このテーマと次のキーワードを組み合わてアイデアを１つ考えて入力してください！<br>'
        + 'キーワード:「'+ msg['keyword'] +'」'
        + profileTweet_action_html + '</div>';
    }
    
    console.log('上書き内容', new_tweet_text, typeof new_tweet_text)
    console.log('上書き対象Tweet', target_tweet_text.item(0))
    target_tweet_text.item(0).parentNode.replaceChild(new_tweet_text, target_tweet_text.item(0));

    //Tweetトプ画の上書き
    const target_profile_img = document.getElementsByClassName('r-1p0dtai r-1pi2tsx r-1d2f490 r-u8s1d r-ipm5af r-13qz1uu');
    const new_profile_img = document.createElement('div');
    new_profile_img.innerHTML = '<div aria-label="" class="css-1dbjc4n r-sdzlij r-1p0dtai r-1mlwlqe r-1d2f490 r-1udh08x r-u8s1d r-zchlnj r-ipm5af r-417010 flag_update"><div class="css-1dbjc4n r-1niwhzg r-vvn4in r-u6sd8q r-4gszlv r-1p0dtai r-1pi2tsx r-1d2f490 r-u8s1d r-zchlnj r-ipm5af r-13qz1uu r-1wyyakw" style="background-image: url(&quot;https://pbs.twimg.com/profile_images/1166895613427900417/7p3QS01J_normal.png&quot;);"></div><img alt="" draggable="true" src="https://pbs.twimg.com/profile_images/1166895613427900417/7p3QS01J_normal.png" class="css-9pa8cd"></div>';
    console.log('上書きトプ画', target_profile_img.item(4));
    target_profile_img.item(4).parentNode.replaceChild(new_profile_img, target_profile_img.item(4));
    
    return true;
  }
});