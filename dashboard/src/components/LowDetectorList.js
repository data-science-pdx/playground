import React, { useContext} from "react"
import { Context } from "./Context"

const LowDetectorList = () => {
    const {lowSpeed,detectorid, setDetectorid} = useContext(Context)

    const renderHeader = () => {
        return <thead>
            <tr>
                <th>ID</th>
                <th>Number</th>
            </tr>
        </thead>
    }

    const renderRows = () => {
        if(lowSpeed!=null){
            console.log(`testing: ${JSON.stringify(lowSpeed)}`)
            
            return lowSpeed.map((data) => {
                let id = data._id.detector_id
                let number = data.totalnumber
                return <tr key={id}><td data-label="id">{id}</td><td data-label="number">{number}</td></tr>
            })
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
            <h2 className="ui centered header">Table list Testing</h2>
            {renderTable()}
        </div>
    }

    return (
        render()
    )
}

export default LowDetectorList