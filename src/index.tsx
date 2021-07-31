// ポップアップのhtmlへのjavascriptはここ？多分

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './popup.css';


const App = () => {
    return(
        <div>
            <div className='title'> <h2><strong>いつでもブレストのテーマ入力</strong></h2></div>
            <p>あなたのブレストテーマを入力してください</p>
            <input id="input" type="text" value="テーマ"></input>
            <button id="submit">テーマを決定</button>
        </div>
    )
};


// function sendToContents(){
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, 
//           JSON.stringify({ contents: "test value from popup" }),
//           function (response) {
//           });
//   });    
// }
// document.getElementById('send').addEventListener('click', sendToContents);

// window.onload = function ()
// {
//   //Run when opened
// }
//Aboutボタン（常に有効）
$(function(){
　$("#btn").on('click',function(){
  //Executed when the button is pressed
  const forms = document.getElementsByClassName('usersTheme');
  const content = forms.item(0).nodeValue;
  console.log('Pushed!, forms:', content);//For debugging
  var send_data = {type: 'users_theme', data:['key','val']};
  chrome.runtime.sendMessage(send_data)
  // localStorage.setItem("testKey", "testVal");
  // console.log(localStorage.getItem("testKey"));
　});
});

ReactDOM.render(<App />, document.getElementById('root'));