import React, { useState } from "react"
import { Context } from "./Context"
import utils from "./Utils"

const ContextProvider = (props) => {
    const [startDate, setStartDate] = useState(utils.formatDate(new Date("2020-02-20")))
    const [endDate, setEndDate] = useState(utils.formatDate(utils.addDays(30)))
    const [station, setStation] = useState("")
    const [stations, setStations] = useState([])
    const [graphData, setGraphData] = useState({})
    const [details, setDetails] = useState([])
    const [volume, setVolume] = useState([])
    const [traveltime, setTraveltime] = useState([])
    const [stationid, setStationid] = useState([])
    const [isloading, setIsLoading] = useState(true)
    const [showSpinner, setShowSpinner] = useState(false)
    const [lowSpeed, setLowSpeed] = useState()
    const [greaterSpeed, setGreaterSpeed] = useState()
    const [goodSpeed, setGoodSpeed] = useState()
    const [detectorids, setDetectorids] = useState([])


    return (
        <Context.Provider
            value={{
                startDate, setStartDate,
                endDate, setEndDate,
                station,setStation,
                stations,setStations,
                graphData,setGraphData,
                details,setDetails,
                volume,setVolume,
                traveltime,setTraveltime,
                stationid,setStationid,
                isloading,setIsLoading,
                showSpinner,setShowSpinner,
                lowSpeed, setLowSpeed,
                greaterSpeed, setGreaterSpeed,
                goodSpeed, setGoodSpeed,
                detectorids, setDetectorids
            }}
        >
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider