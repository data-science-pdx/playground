import React, { useContext,useEffect} from "react";
import { Context } from "./Context"

export const DetailsTable = () => {
    const { detectorid,station,setStation, } = useContext(Context)
    //const url = `http://localhost:3001/${detectorid}`
    const url = `http://localhost:3001/100555`

    useEffect(() => {
        const requestHeaders = {
            "method": "POST",
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
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
            console.log(`the url test:${url}`)
            let resp = await (fetch(url, {
                headers: requestHeaders
            })).catch(handleError)
            if (resp.ok) {
                const dataValue = await resp.json()
                setStation(dataValue)
            } else {
                console.log("in else loop")
            }
        }

        doFetchStationInfo()
    },[url,setStation])

    const renderHeader = () => {
        return <thead>
            <tr>
                <th>ID</th>
                <th>Number</th>
            </tr>
        </thead>
    }

    const renderRows = () => {
        if(station!=null){
            console.log(`testing: ${JSON.stringify(station)}`)
            /*
            return greaterSpeed.map((data) => {
                let id = data._id.detector_id
                let number = data.totalnumber
                return <tr key={id}><td data-label="id">{id}</td><td data-label="number">{number}</td></tr>
            })
            */
        }
    }

    const renderTable = () => {
        return <table className="ui striped table">
            {renderHeader()}
            <tbody>{renderRows()}</tbody>
        </table>
    }

    const render = () => {
        return <div className="ui container segment">
            <h2 className="ui centered header">Station Details Information</h2>
            {renderTable()}
        </div>
    }

    return (
        render()
    )

}