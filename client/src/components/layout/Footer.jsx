import React from 'react'
import ChatRoomPopover from "../chatroom/ChatRoomPopover";

export default class Footer extends React.Component {
    render() {
        return (
            <div>
                <footer className="bg-dark text-white mt-5 p-2 text-center">
                     Made by Kevin Vissuet

                    <ChatRoomPopover/>
                </footer>
            </div>
        )
    }
}