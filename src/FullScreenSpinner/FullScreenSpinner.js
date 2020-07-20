import React from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react';

function FullScreenSpinner() {
  return (
      <div style={{minHeight: "65vh", minWidth: "100vw", display: "flex", flexDirection: "row", justifyContent: "center"}}>
        <Spinner size={SpinnerSize.large} />
      </div>
  );
}

export default FullScreenSpinner;
