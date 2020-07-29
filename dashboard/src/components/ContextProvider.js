import React, { useState } from "react"
import { Context } from "./Context"
import utils from "./utils"

const ContextProvider = (props) => {
    const [startDate, setStartDate] = useState(utils.formatDate(new Date()))
    const [endDate, setEndDate] = useState(utils.formatDate(utils.addDays(30)))


    return (
        <Context.Provider
            value={{
                startDate, setStartDate,
                endDate, setEndDate
            }}
        >
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider