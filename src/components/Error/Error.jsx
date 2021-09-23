import React, {  } from "react";


const Error = ({msg}) => {
    return (
        <div>
            <h1 className="text-danger">{msg? msg:'Something went wrong'}</h1>
        </div>
    )
}

export default Error
