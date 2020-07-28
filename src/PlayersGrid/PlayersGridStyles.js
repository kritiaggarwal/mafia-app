export const containerStyles = ((props) => ({
  width: props, 
  fontSize: "30px", 
  color: "#000000", 
  textAlign: "center", 
  backgroundColor: "#6C8D97", 
  padding: "30px 0px 0px 0px", 
  inHeight: "65vh", 
  justifyContent: "space-between",
  height: "640px",
  borderRadius: "10px"
}));

export const getTextStyles = (() => ({
  color: "#000",
  fontFamily: "Helvetica Neue",
  fontSize: "50px",
  lineHeight: "70px",
  textAlign: "center"
}));

export const enoughPlayersTextStyles = (() => ({
  color: "#000",
  fontFamily: "Arial",
  fontSize: "30px",
  lineHeight: "39px",
  textAlign: "center",
  marginBottom: "30px"
}));

export const playerNameTextStyles = (() => ({
  color: "#000",
  fontFamily:"Arial",
  textAlign: "center",
  margin: "10px 0px 0px 0px", 
  fontSize: "28px"
}));

export const playerContainerStyles = ((props)=>({
  display: "grid",
  gridTemplateColumns: props,
  gridGap: "10px",
  padding: "10px",
  justifyContent:"space-evenly"
}));

export const avatarStyles = (()=>({
  borderRadius: "50%",
  height: "130px",
  width: "146px"
}));

export const getPlayerProfileStyles = (() => ({
  margin: "",
  height: "201px",
  width: "156px",
  
}));