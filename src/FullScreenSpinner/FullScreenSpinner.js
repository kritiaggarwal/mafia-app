import React from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react';
import { containerStyles } from "./FullScreenSpinnerStyles";

function FullScreenSpinner() {
  return (
      <div style={containerStyles()}>
        <Spinner size={SpinnerSize.large} />
      </div>
  );
}

export default FullScreenSpinner;
