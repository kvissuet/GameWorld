import React from "react";
import "./ChatList.css";
export default ({ chats }) => (
    <div className={'chat-window'}>
    <div className={'chat-messages'}>
    <ul>
        {chats.map(chat => {
            return (


                                <div key={chat.id}>
                                    <p>
                                        <strong>{chat.username}: </strong>{chat.message}
                                    </p>

                                </div>
                           );
        })}
    </ul>
    </div>
    </div>
);
