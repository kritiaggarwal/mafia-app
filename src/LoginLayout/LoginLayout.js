import React from 'react';
import InputLayout from "./InputLayout";
import { Image } from '@fluentui/react';
import logo from "../Logo.png"

function LoginLayout(props) {
  return (
      <div style={{minHeight: "65vh", minWidth: "100vw", display: "flex", justifyContent: "center", padding: "150px 0px 0px 0px"}}>
        <InputLayout onGameCreate={props.onGameCreate} onGameFetch={props.onGameFetch}/>
        <Image width={300} src={logo} />
      </div>
  );
}

export default LoginLayout;
