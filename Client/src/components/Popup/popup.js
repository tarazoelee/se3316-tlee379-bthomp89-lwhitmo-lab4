import React from "react";
 
//pop up for creating the playlists
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;