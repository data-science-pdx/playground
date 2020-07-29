import React, { useContext} from "react";
import { Context } from "./Context";

export const DateTest = () => {
    const { startDate, endDate } = useContext(Context)

    return (<div>
            <div>{new Date(startDate).toString()}</div>
            <div>{new Date(endDate).toString()}</div>
        </div>
    )
}
