import React from "react";

const Notification = ( {errorMessage, successMessage} ) => {
    if(!successMessage && !errorMessage){
        return null
    }
    return(
        <div className={`Message ${successMessage ? 'success' : 'error'}`}>
            {successMessage ? successMessage : errorMessage}
        </div>
    )
}

export default Notification;