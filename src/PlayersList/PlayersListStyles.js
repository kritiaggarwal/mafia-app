export const containerStyles  = (() =>  ({
  width: "350px", 
  fontSize: "30px", 
  color: "#000000", 
  textAlign: "center", 
  backgroundColor: "#6C8D97", 
  padding: "30px 0px 0px 0px", 
  height: "65vh", 
  justifyContent: "space-between"
}));

export const playerRowStyles  = ((backgroundColor) =>  ({
  minWidth:"350px", 
  backgroundColor:backgroundColor, 
  padding:"5px", 
  marginBottom:"20px"
}));

export const imageStyles  = (() =>  ({
  borderRadius:"50%"
}));

export const playerNameStyles  = (() =>  ({
  fontFamily:"arial", 
  fontSize:"20px", 
  height:"70px", 
  lineHeight: "70px", 
  textAlign:"left", 
  fontWeight: "bold"
}));

export const voteStyles  = ((vote) =>  ({
  fontFamily:"arial", 
  fontSize:"20px", 
  color:"#BF2626", 
  visibility: (typeof vote !== 'undefined') ? "visible" : "hidden", 
  height:"70px", 
  lineHeight: "70px", 
  fontWeight: "bold"
}));

export const radioButtonStyles  = ((showButton) =>  ({
  visibility: showButton ? "visible" : "hidden", 
  height:"70px",  
  paddingTop: "25px"
}));