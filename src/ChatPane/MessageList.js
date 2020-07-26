import React, { useState } from 'react';
import { containerStyles } from "./ChatPaneStyles";
import { TextField, Button, Label } from '@fluentui/react';
import { Stack } from "@fluentui/react";
import Message from "../ChatPane/Message";

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
      console.log("Rendering messages list");            
      console.log(this.props.message);
      const children = this.props.messages.map((message, index) =>
        <Message user = {message.user} text={message.text} key = {index}/>
      );
      return <div>{children}</div>;
    }
  }

export default MessageList;