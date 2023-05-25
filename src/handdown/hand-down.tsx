import { Tooltip } from "@mui/material";
import React from "react";

export const HandDown = React.memo(() => {
    return <div className="text-5xl cursor-pointer flex text-orange-600 my-1.5 flex-row justify-center"><Tooltip title="Ouput of the above operator becomes input of the below operator"><span>↓</span></Tooltip></div>
});