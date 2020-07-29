import React, { useState } from 'react';
import { TextField, Button } from '@fluentui/react';
import { containerStyles, getNameTextStyles, getCodeTextStyles, getButtonStyles } from "./InputLayoutStyles";

function InputLayout(props) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  function handleCreate () {
    props.onGameCreate(name);
  }

  function handleJoin () {
    props.onGameFetch(name, code);
  }

  return (
      <div style={containerStyles()}>
        <TextField label="Name" styles={getNameTextStyles()} placeholder="Enter text here" onBlur={(data) => setName(data.target.value)} />
        <TextField label="Game Code" styles={getCodeTextStyles()} placeholder="Enter code here" onBlur={(data) => setCode(data.target.value)}/>
        <Button disabled={name === ""} text={code ? "Join Room" : "Create Room"} styles={getButtonStyles()}  onClick={code ? handleJoin : handleCreate}/>
      </div>
  );
}

export default InputLayout;
