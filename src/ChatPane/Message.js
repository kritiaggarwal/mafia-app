import React, { useState } from 'react';
import { containerStyles } from "./ChatPaneStyles";
import { TextField, Button, Label } from '@fluentui/react';
import { Stack } from "@fluentui/react";
class  Message extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return <div><b>{this.props.user}</b> - {this.props.text}</div>;
    }
}

export default Message;