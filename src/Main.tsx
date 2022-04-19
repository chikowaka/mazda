// popupのtsx
import React from 'react'
import {IdeaNote} from './IdeaNote'

export const Main: React.FC = () => {
    return (
        <div id="main">
            <div className='title'>
                <h2><strong>いつでもブレスト</strong></h2>
            </div>
            <input type="text" placeholder="ユーザID" id="userID"/>
            <input type="button" value="確定" id="updateUserID" />
            <input type="button" value="上書きのデバッグ実行" id="debug" />
        </div>
    )
}

