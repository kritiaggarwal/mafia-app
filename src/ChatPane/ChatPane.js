import React from 'react';
import { containerStyles } from "./ChatPaneStyles";
import ChatBox from 'react-chat-plugin';
class ChatPane extends React.Component {
  imageBaseUrl = 'https://api.adorable.io/avatars/285/';
  imageEndUrl = '@adorable.png';

  state = {
    cityState: 'sleeping',  // sleeping/awake
    user: {
      id: 1,
      name: 'User1',
      isMafia: true,
      isAlive: true
    },
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
    const { id, name } = { ...this.state.user} ;
    const avatarUrl = `${this.imageBaseUrl}${name}${this.imageEndUrl}`;
    this.setState({
      mafiaMessages: this.state.mafiaMessages.concat({
        author: {
          username: name,
          id: id,
          avatarUrl: avatarUrl
        },
        text: message,
        timestamp: +new Date(),
        type: 'text'
      })
    });
  }
  render() {
    // const showMafiaChat = (this.state.user.isMafia && this.state.cityState === 'sleeping');
    return (
      <div style={containerStyles()}>
        {/* // Mafia Chat Box */}
        <div>
          <ChatBox
            messages={this.state.mafiaMessages}
            userId={this.state.user.id}
            onSendMessage={this.handleOnSendMessageInMafiaChat}
            width={'100vw'}
            height={'68vh'}
            placeholder="Mafia Group Chat"
            disableInput={this.state.cityState === 'awake' || (!(this.state.user.isAlive && this.state.user.isMafia))}
          />
        </div>
      </div>
    )
  };
}

export default ChatPane;
