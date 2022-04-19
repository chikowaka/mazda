// ポップアップのhtmlへのjavascriptはここ Chrome拡張読み込み時に最初に読まれるJS
import ReactDOM from 'react-dom'
import React from 'react'
import {Main} from './Main'
// import { v4 as uuidv4 } from 'uuid'

import './popup.css'

console.log('3');

///////////////////////////////
//UUIDがなければ生成

// if(localStorage.getItem('uuid')){
//     var uuid = localStorage.getItem('uuid');
//     console.log(uuid);
//   }else{
//     var uuid = uuidv4();
//     localStorage.setItem('uuid',uuid);
//     // console.log(uuid);
// };
//////////////////////////////

// 挿入した回数
// if(localStorage.getItem('insert_num')){
//     var insert_num = Number(localStorage.getItem('insert_num'));
//     console.log(insert_num);
//   }else{
//     var insert_num = 0;
//     localStorage.setItem('insert_num',String(insert_num));
//     // console.log(uuid);
// };

const App = () => <Main />
ReactDOM.render(
    <App />, 
    document.getElementById('root')
);

//////////////////////////////
//////////////////////////////

//UserIDを更新した時の機能
const updateThemaButton = document.getElementById('updateUserID');
updateThemaButton.addEventListener('click', function(){
    const themeText = document.getElementById('userID') as HTMLInputElement;
    console.log('Pushed!　入力テーマ:', themeText.value);
    const sendData = {type: 'userID', data:['userID',themeText.value]};
    chrome.runtime.sendMessage(sendData);
});

// デバッグ用の上書き機能
const debugButton = document.getElementById('debug');
debugButton.addEventListener('click', function(){
    const themeText = document.getElementById('userID') as HTMLInputElement;
    const sendData = {type: 'debug', data:['userID',themeText.value]};
    chrome.runtime.sendMessage(sendData);
    console.log('debug done')
});

// // アイデア入力時に付箋を追加
// const inputIdeaButton = document.getElementById('add-idea-button');
// inputIdeaButton.addEventListener('click', function(){
//     console.log('Pushed!　新アイデア:');
//     const noteContainer = document.getElementById('sticky-note-container');
//     const targetSpan = document.getElementById('witeboard');
//     const ideaNote = document.createElement('div');
//     ideaNote.className = "ideaNote"
//     ideaNote.innerHTML = '<input type="text">'
//     noteContainer.insertBefore(ideaNote, targetSpan);
    
// });