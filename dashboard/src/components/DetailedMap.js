import React, { useContext,useEffect, useState} from "react";
import { Context } from "./Context"
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import './stylesheet.css'

export const DetailedMap = () => {
    const { detectoridsLow,detectoridsHigh,station,setStation,greaterSpeed,lowSpeed } = useContext(Context)
    const [runMap, setRunMap] = useState(false)

    let idlist = []
    idlist=detectoridsHigh.concat(detectoridsLow)
    console.log(`#############################${idlist}`)
    //const url = `http://localhost:3001/100555`

    let url = `http://localhost:3001/${idlist}`
    //const url = `http://localhost:3001/100555`

    useEffect(() => {
        const requestHeaders = {
            "method": "POST",
            "Content-type": "application/json;charset=UTF-8",
        }

        const handleError = (err) => {
            console.warn(err)
            return new Response(JSON.stringify({
                code: 400,
                message: "SSO"
            }))
        }

        const isEmpty = (obj) => {
            for (let key in obj) {
                if (obj.hasOwnProperty(key))
                    return false
            }
            return true
        }

        async function doFetchStationInfo() {
            let resp = await (fetch(url, {
                headers: requestHeaders
            })).catch(handleError)
            if (resp.ok) {
                const dataValue = await resp.json()
                setStation(dataValue)
            } else {
                console.log("in else loop")
            }
            setRunMap(true)
        }

        doFetchStationInfo()
    },[url,setStation])

    const testing = () => {
        return (
            <div>
                {station[0] && station.map((item, i_key) =>
                    <li key={i_key}>{item.locationtext}: {item.lat}, {item.lon}</li>
                )}
            </div>
        )
    }

    const renderMap = () => {
        const portland = [45.5135, -122.6801]
        if(station && greaterSpeed){
            greaterSpeed.map(d_item => {
                station.map(s_item => {
                    s_item.detectors.map(sd_item => {
                        if(sd_item.detectorid === d_item._id.detector_id){
                            sd_item.totalGnumber = d_item.totalnumber
                        }
                    })
                })
            })
        }
        if(station && lowSpeed){
            lowSpeed.map(d_item => {
                station.map(s_item => {
                    s_item.detectors.map(sd_item => {
                        if(sd_item.detectorid === d_item._id.detector_id){
                            sd_item.totalLnumber = d_item.totalnumber
                        }
                    })
                })
            })
        }
        console.log(station)

        if(runMap) {
            return (
                <Map center={portland} zoom={7} zoomControl={true}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                    {station && station.map((item, i_key) =>
                        <Marker key={i_key} position={[item.lon, item.lat]}>
                            <Popup position={[item.lon, item.lat]} maxHeight="30px">
                                <h6>{item.locationtext}</h6><hr/>
                                <b>Station ID</b>: {item.stationid}<br/>
                                <b>Highway ID</b>: {item.highwayid}<br/>
                                <b>Milepost</b>: {item.milepost}<br/>
                                <b>Length</b>: {item.length} mi<br/><hr/>
                                <b>Detectors Status</b>:<br/>
                                {item.detectors.map(e =>
                                    <li key={e.detectorid}>
                                        ID <a>{e.detectorid}</a> at lane {e.lanenumber}:
                                        {e.totalGnumber &&
                                            <span className="overspeed"><b> {e.totalGnumber}</b> errors(Overspeed) occurred! </span>
                                        }
                                        {e.totalLnumber &&
                                        <span className="underspeed"><b> {e.totalLnumber}</b> errors(Underspeed) occurred! </span>
                                        }
                                        {(!e.totalGnumber && !e.totalLnumber)&&
                                            <span className="working"> up</span>
                                        }
                                    </li>
                                )}
                            </Popup>
                        </Marker>
                    )}
                </Map>
            )
        }
    }

    return (
        <div className="ui container segment">
            {/*{testing()}*/}

            {renderMap()}
        </div>
    )

}