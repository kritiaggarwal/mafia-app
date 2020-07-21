import React from 'react';
import InputLayout from "./InputLayout";
import { Image } from '@fluentui/react';
import { containerStyles } from "./LoginLayoutStyles";
import logo from "../Logo.png"

function LoginLayout(props) {
  return (
      <div style={containerStyles()}>
        <InputLayout onGameCreate={props.onGameCreate} onGameFetch={props.onGameFetch}/>
        <Image width={300} src={logo} />
      </div>
  );
}

export default LoginLayout;
