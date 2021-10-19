// ポップアップのhtmlへのjavascriptはここ？多分

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './popup.css';

const App = () => {
    return(
        <div>
            <div className='title'> <h2><strong>いつでもブレスト</strong></h2></div>
            <p>あなたのブレストテーマを入力してください</p>
            <input type="text" id="userTheme"/>
            <input type="button" value="テーマ確定" id="updateTheme" />
            <input type="button" value="上書きのデバッグ実行" id="debug" />
            <p>思いついたアイデアを一つ入力してください</p>
            <input type="text" id="newIdea"/>
            <input type="button" value="アイデア入力" id="inputIdea" />
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));


//テーマを更新した時の機能
const updateThemaButton = document.getElementById('updateTheme');
updateThemaButton.addEventListener('click', function(){
    const themeText = document.getElementById('userTheme') as HTMLInputElement;
    console.log('Pushed!　入力テーマ:', themeText.value);
    const sendData = {type: 'userTheme', data:['userTheme',themeText.value]};
    chrome.runtime.sendMessage(sendData);
});

// デバッグ用の上書き機能
const debugButton = document.getElementById('debug');
debugButton.addEventListener('click', function(){
    const themeText = document.getElementById('userTheme') as HTMLInputElement;
    const sendData = {type: 'debug', data:['userTheme',themeText.value]};
    chrome.runtime.sendMessage(sendData);
    console.log('debug done')
});

// アイデア入力時の機能
const inputIdeaButton = document.getElementById('inputIdea');
inputIdeaButton.addEventListener('click', function(){
    const ideaText = document.getElementById('newIdea') as HTMLInputElement;
    console.log('Pushed!　新アイデア:', ideaText.value);
    const sendData = {type: 'newIdea', idea:ideaText.value};
    chrome.runtime.sendMessage(sendData);
});