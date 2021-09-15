import React, { useState } from "react";
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loading = () => {

    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    return (
        <div className="">
            <div className="sweet-loading">
                <ScaleLoader color="#000" loading={loading} css='' size={80} />
            </div>  
        </div>
    )
}

export default Loading
