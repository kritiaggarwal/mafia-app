import { findByLabelText } from "@testing-library/react";

export const getButtonStyles = (() => ({
  root: {
    backgroundColor: "#45802A",
    border: 0,
    width: "530px",
    color: "#E0E0E0",
    height: "50px",
    fontSize: "30px",
    margin: "230px 0px 0px 40px",
  },
  rootHovered: {
    backgroundColor: "#679552",
    border: 0,
    color: "#E0E0E0"
  }
}));

export const getTextStyles = (() => ({
  wrapper: {
    margin: "0px 0px 0px 32px",
    width: "600px",
  },
  fieldGroup: [{
    height: 50,
    width: 520,
    margin: "0px 0px 0px 40px",
  }],
  subComponentStyles: {
    label: {
      root: {
        color: '#EOEOEO',
        margin: '0px 0px 20px 0px',
        fontSize:"25px"
      }
    }
  }
}));

export const containerStyles = (() => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "65vh", 
  textAlign: "center", 
  justifyContent: "space-between"
}));

export const invitationCodeTextStyles = (() => ({
  height: "76.76px",
  width: "600px",
  color: "#E0E0E0",
  fontFamily: "Arial",
  fontSize: "35px",
  lineHeight: "53px",
  margin: "0px 0px 10px 30px"
}))

export const invitationCodeStyles = (() => ({
  borderRadius: "2px",
  margin: "0px 0px 100px 70px", 
  fontSize: "80px", 
  height: "90px", 
  width: "510px", 
  color: "#000000", 
  backgroundColor: "#97B788", 
  textAlign: "center"
}));

export const conferenceLinkStyles = (() => ({
  borderRadius: "2px",
  margin: "0px 0px 0px 68px", 
  fontSize: "22px",
  height: "50px",
  width: "510px",
  color: "#000",
  backgroundColor: "#97B788",
  textAlign: "center",
  fontFamily: "Helvetica Neue", 
  padding: "20px 0px 0px 0px"
}));

export const waitingMsgTextStyles = ((props) => ({
  width: "580px",
  color: "#E0E0E0",
  fontFamily: "Arial",
  fontSize: "40px",
  fontStyle: "italic",
  lineHeight: "67px",
  marginTop: props,
  marginLeft: "28px"
}));

export const conferenceLinkTextStyles = (() => ({
  color: "#E0E0E0",
  fontFamily: "Arial",
  fontSize: "30px",
  lineHeight: "53px",
  marginBottom: "16px"
}));

