import React from 'react';
import { containerStyles } from "./ChatPaneStyles";
import ChatBox from 'react-chat-plugin';
import { ROUND_STATE, ROLES } from "../App";
class ChatPane extends React.Component {
  imageBaseUrl = 'https://api.adorable.io/avatars/285/';
  imageEndUrl = '@adorable.png';

  state = {
    mafiaMessages: [
      {
        author: {
          username: 'User1',
          id: 1,
          avatarUrl: 'https://api.adorable.io/avatars/285/User1@adorable.png',
        },
        text: 'Hi, I am Mafia 1.',
        type: 'text',
        timestamp: 1578366393250,
      },
      {
        author: {
          username: 'User2',
          id: 2,
          avatarUrl: 'https://api.adorable.io/avatars/285/User2@adorable.png',
        },
        text: 'who should we kill.',
        type: 'text',
        timestamp: 1578366393250,
      },
    ],    // populate this from backend
    villageMessages: [
      {
        author: {
          username: 'User1',
          id: 1,
          avatarUrl: 'https://api.adorable.io/avatars/285/user1@adorable.png',
        },
        text: 'Hi, I am Villager 1.',
        type: 'text',
        timestamp: 1578366393250,
      },
      {
        author: {
          username: 'User2',
          id: 2,
          avatarUrl: 'https://api.adorable.io/avatars/285/user2@adorable.png',
        },
        text: 'i am a cop',
        type: 'text',
        timestamp: 1578366393250,
      },
      {
        author: {
          username: 'User3',
          id: 3,
          avatarUrl: 'https://api.adorable.io/avatars/285/user3@adorable.png',
        },
        text: 'i am a doctor',
        type: 'text',
        timestamp: 1578366393250,
      },
    ],      // populate this from backend
  };

  // Function to send message in mafia group chat
  handleOnSendMessageInMafiaChat = (message) => {
    const avatarUrl = `${this.imageBaseUrl}${this.props.currentPlayerName}${this.imageEndUrl}`;
    this.setState({
      mafiaMessages: this.state.mafiaMessages.concat({
        author: {
          username: this.props.currentPlayerName,
          id: this.props.currentPlayerId,
          avatarUrl: avatarUrl
        },
        text: message,
        timestamp: +new Date(),
        type: 'text'
      })
    });
  }
  render() {
    return (
      <div style={containerStyles()}>
        {/* // Mafia Chat Box */}
        <div>
          <ChatBox
            messages={this.state.mafiaMessages}
            userId={this.props.currentPlayerId}
            onSendMessage={this.handleOnSendMessageInMafiaChat}
            width={'100vw'}
            height={'68vh'}
            placeholder="Mafia Group Chat"
            disableInput={this.props.roundState === ROUND_STATE.DAY || (!(!this.props.currentPlayerDead && (this.props.currentPlayerRole === ROLES.MAFIA)))}
          />
        </div>
      </div>
    )
  };
}

export default ChatPane;
