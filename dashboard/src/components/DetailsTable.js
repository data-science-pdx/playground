import React, { useContext,useEffect, useState} from "react";
import { Context } from "./Context"
import { Media } from 'react-bootstrap';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import './stylesheet.css'

export const DetailsTable = () => {
    const { detectorids, station,setStation, } = useContext(Context)
    const [runMap, setRunMap] = useState(false)

    let url = `http://localhost:3001/${detectorids}`
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
        if(runMap) {
            return (
                <Map center={portland} zoom={7}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                    {station && station.map((item, i_key) =>
                        <Marker key={i_key} position={[item.lon, item.lat]}>
                            <Popup position={[item.lon, item.lat]} maxHeight="30px">
                                <Media>
                                    <h2>{item.locationtext}</h2>
                                    <Media.Body>
                                        <b>station id</b>: {item.stationid}<br/>
                                        <b>highway id</b>: {item.highwayid}<br/>
                                        <b>milepost</b>: {item.milepost}<br/>
                                        <b>length</b>: {item.length}<br/>
                                        <b>Detectors</b>:<br/>
                                        {item.detectors.map(e =>
                                            <li>
                                                Detector id of lane {e.lanenumber}: <a>{e.detectorid}</a>
                                            </li>
                                        )}
                                    </Media.Body>
                                </Media>
                            </Popup>
                        </Marker>
                    )}
                </Map>
            )
        }
    }

    return (
        <div className="ui container segment">
            {testing()}

            {renderMap()}
        </div>
    )

}