// ページへのjavascriptはここ

import React from 'react';
import ReactDOM from 'react-dom';

import './contents.css';
console.log('contents live');

const Main = () => {
  return <div>App!!!!</div>;
};

function addTweetObject(){
  // 更新時に呼び出される
  // 最上部にTweetが一つ追加される
  

}

function writeTweet(){
  // addTweetObjectが呼び出されたときに呼び出される
  // ツイートの内容を上書きする
  
}

/* Listen for messages */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.command && (msg.command == "change_title")) {
    var src = document.getElementsByTagName("title")[0].innerHTML;
    var dst = msg.title;
    document.getElementsByTagName("title")[0].innerHTML = dst;
    sendResponse("the page title's changed: '" + src + "' -> '" + dst + "'");
  }
  return true;
});

const app = document.createElement('div');
app.id = 'my-extension-root';
document.body.appendChild(app);
ReactDOM.render(<Main />, app);
