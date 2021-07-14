// ポップアップのhtmlへのjavascriptはここ？多分

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './popup.css';


const App = () => {
    return(
        <div>
            <div className='title'><p><strong>ブレストタイム！</strong></p></div>
            <p>このページの◯◯がヒントかも？？</p>
            <p>あなたのテーマは「◯◯」です</p>
            <input type="button" id="btn" value="閉じる" /><br></br>
        </div>
    )
};


window.onload = function ()
{
  //Run when opened
}
//Aboutボタン（常に有効）
$(function(){
　$("#btn").click(function(){
  //Executed when the button is pressed
  console.log('Pushed!');//For debugging
　});
});

ReactDOM.render(<App />, document.getElementById('root'));