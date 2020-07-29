import React, { useContext } from "react"
import { Context } from "./Context"
import utils from "./utils"

const MIN_DATE = utils.formatDate(new Date("2020-01-01"))
const MAX_DATE = utils.formatDate(new Date("2100-12-31"))

export const Calendar = () => {
    const { startDate, setStartDate, endDate, setEndDate } = useContext(Context)

    return (<div>
        <div>Select Date Range</div>
        <div className="ui horizontal segments">
            <div className="ui segment fields">
                <div className="fields">
                    <label htmlFor="startDate">Start date:</label>
                    <input type="date" id="startDate" name="trip-start"
                        value={startDate}
                        min={MIN_DATE} max={MAX_DATE}
                        onChange={(e) => { setStartDate(utils.parseDate(e.currentTarget.value)) }}
                    />
                </div>
            </div>
            <div className="ui segment fields">
                <div className="fields">
                    <label htmlFor="endDate">End date:</label>
                    <input type="date" id="endDate" name="trip-end"
                        value={endDate}
                        min={MIN_DATE} max={MAX_DATE}
                        onChange={(e) => { setEndDate(utils.parseDate(e.currentTarget.value)) }}
                    />
                </div>
            </div>
        </div>
    </div>)
}