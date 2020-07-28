export const getButtonStyles = (() => ({
  root: {
    backgroundColor: "#45802A",
    border: 0,
    width: "696px",
    color: "#E0E0E0",
    height: "45px",
    fontSize: "20px",
    margin: "250px 0px 0px 0px",
  },
  rootHovered: {
    backgroundColor: "#679552",
    border: 0,
    color: "#E0E0E0"
  }
}));

export const getTextStyles = (() => ({
  wrapper: {
    margin: "0px 0px 0px 36px",
    width: "696px",
  },
  fieldGroup: [{
    height: 50
  }],
  subComponentStyles: {
    label: {
      root: {
        color: '#EOEOEO',
        margin: "0px 0px 0px 0px",
        fontSize:"36px"
      }
    }
  }
}));

export const containerStyles = (() => ({
  minHeight: "65vh", 
  textAlign: "center", 
  justifyContent: "space-between"
}));

export const invitationCodeTextStyles = (() => ({
  height: "76.76px",
  width: "758px",
  color: "#E0E0E0",
  fontFamily: "Arial",
  fontSize: "47px",
  lineHeight: "53px"
}))

export const invitationCodeStyles = (() => ({
  borderRadius: "2px",
  margin: "0px 0px 100px 36px", 
  fontSize: "80px", 
  height: "90px", 
  width: "696px", 
  color: "#000000", 
  backgroundColor: "#97B788", 
  textAlign: "center"
}));

export const conferenceLinkStyles = (() => ({
  borderRadius: "2px",
  margin: "0px 0px 160px 36px", 
  fontSize: "25px",
  height: "50px",
  width: "696px",
  color: "#000",
  backgroundColor: "#97B788",
  textAlign: "center",
  fontFamily: "Helvetica Neue", 
  padding: "14px 0px 0px 0px"
}));

export const waitingMsgTextStyles = ((props) => ({
  width: "709px",
  color: "#E0E0E0",
  fontFamily: "Arial",
  fontSize: "50px",
  fontStyle: "italic",
  lineHeight: "67px",
  marginTop: props
}));

export const conferenceLinkTextStyles = (() => ({
  width: "758px",
  color: "#E0E0E0",
  fontFamily: "Arial",
  fontSize: "37px",
  lineHeight: "53px",
  marginBottom: "16px"
}));

