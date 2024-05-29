import React from "react";

const Notification = ({ message}) => {
  console.log("Notification is responding:", message);

  if (message === null) {
    return null;
  }
  else if (message.includes('Error')){
    return <div className= 'notify'>{message}</div>;
  }
  else{
    return <div className= 'confirm'>{message}</div>
  }
};

export default Notification;
