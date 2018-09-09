import React from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import ChatRoom from "./ChatRoom";

export default class ChatRoomPopover extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false
        };
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    render() {
        return (
            <div>
                <Button id="Popover1" onClick={this.toggle}>
                    Chat with other people
                </Button>
                <Popover className={'bg-light'} placement="top" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle} style={{maxWidth:"None"}}>
                    <PopoverHeader>Chatroom</PopoverHeader>
                    <ChatRoom/>
                </Popover>
            </div>
        );
    }
}