import React, { useState } from 'react';
import { containerStyles } from "./ChatPaneStyles";
import { TextField, Button } from '@fluentui/react';
import { Stack } from "@fluentui/react";
import MessageList from "../ChatPane/MessageList";
import * as signalR from "@microsoft/signalr"

class ChatPane extends React.Component {

  constructor(props) {
    super(props);
    this.state = {messages: [{user: "vishal", text : "hello Sharon"}, {user: "vishal", text : "How are you?"}]}
    this.state.text = "Enter message "
    this.keyPress = this.keyPress.bind(this);
    console.log("ChatPane");
    const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();   
    
   
    connection.on("messageReceived", (username, message) => 
    
        {
          console.log("Signal R" + message);
        }
        )
 
  }
      
  keyPress(e){
    if(e.keyCode == 13){
       console.log('value', e.target.value);
       // put the login here
       send(e.target.value);
       console.log(this.state.messages);
       console.log("rendering again");
       e.target.text = ''
       e.target.value = ''
       console.log(e.target)
       this.render();
    }
  }
  render() {
    console.log("Rendering chat pane");
    return (
      <div style={containerStyles()}>              
        <MessageList messages = {this.state.messages}></MessageList>
        <TextField  placeholder="Enter message here" onKeyDown={this.keyPress}></TextField>
      </div>
    );
  }
}

export default ChatPane;
