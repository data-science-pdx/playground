import React, { useContext} from "react";
import { Context } from "./Context";
import moment from "moment";

export const CalendarTest = () => {
    const { startDate, endDate } = useContext(Context)

    return (
        <span>
            You are search from <b>{moment(startDate).format("dddd, MMMM Do YYYY")}</b> to <b>{moment(endDate).format("dddd, MMMM Do YYYY")}</b>.
        </span>
    )
}
