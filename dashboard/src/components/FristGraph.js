import React, { useContext, useEffect } from "react"
import { Context } from "./Context"
import {Pie} from 'react-chartjs-2';


export const FristGraph = () => {
    const { startDate, endDate, detectoridsLow, setDetectoridsLow,isloading,setIsLoading,detectoridsHigh, setDetectoridsHigh,goodSpeed, setGoodSpeed,greaterSpeed, setGreaterSpeed,lowSpeed, setLowSpeed } = useContext(Context)

    const url = `http://localhost:3001/lessthenfive/${startDate}/${endDate}`
    const urlTwo = `http://localhost:3001/greaterthen/${startDate}/${endDate}`
    const urlThree = `http://localhost:3001/goodspeed/${startDate}/${endDate}`
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

        async function doFetchLessThenFive() {
            let tmp =[]
            setIsLoading(true)
            let resp = await (fetch(url, {
                headers: requestHeaders
            })).catch(handleError)
            if (resp.ok) {
                const dataValue = await resp.json()
                setLowSpeed(dataValue)
                for (var i = 0; i<dataValue.length;i++){
                    tmp.push(dataValue[i]._id.detector_id)
                    console.log(`@@@@@@@@@@@@@@@@@@@@@${detectoridsLow}`)
                    console.log(`!!!!!!!!!!!!!!!!!!!!!!${dataValue[i]._id.detector_id}`)
                }
                setDetectoridsLow(detectoridsLow.concat(tmp))
                setIsLoading(false)
            } else {
                console.log("in else loop")
                setIsLoading(false)
            }
        }

        async function doFetchGreater() {
            var tmp=[]
            let resp = await (fetch(urlTwo, {
                headers: requestHeaders
            })).catch(handleError)
            if (resp.ok) {
                const dataValue = await resp.json()
                setGreaterSpeed(dataValue)
                
                for (var i = 0; i<dataValue.length;i++){
                    tmp.push(dataValue[i]._id.detector_id)
                    console.log(`@@@@@@@@@@@@@@@@@@@@@${detectoridsHigh}`)
                }
                setDetectoridsHigh(detectoridsHigh.concat(tmp))
            } else {
                console.log("in else loop")
            }
        }

        async function doFetchGoodSpeed() {
            let resp = await (fetch(urlThree, {
                headers: requestHeaders
            })).catch(handleError)
            if (resp.ok) {
                const dataValue = await resp.json()
                //setStatistics(dataValue.response[0])
                //setGraphData(buildGraphData(dataValue.response[0]))
                setGoodSpeed(dataValue)
            } else {
                //setStatistics(`Error: ${resp.status}`)
                //setIsCovidLoading(false)
                console.log("in else loop")
            }
        }
        doFetchGoodSpeed()
        doFetchGreater()
        doFetchLessThenFive()
    }, [url,setLowSpeed,setGreaterSpeed,setGoodSpeed,setIsLoading,setDetectoridsLow,setDetectoridsHigh])
    /*
    const renderDashboard = () => {
        return <>
            <h1 className="ui centered header">{`COVID-19 Dashboard: ${countryCode}`}</h1>
            <div><Statistics /></div>
        </>
    }*/

    
    

    const renderTest = () => {
        
        if (lowSpeed !=null){
            //let result = JSON.stringify(lowSpeed)
            console.log(`testing: ${lowSpeed.length}`)
            console.log(`testing: ${lowSpeed[0]._id.detector_id}`)
            console.log(`@@@@@@@@@@@@@@@@@@@@@${detectoridsLow}`)
        }
        return <>
            <h1>{`testing: ${JSON.stringify(lowSpeed)}`}</h1>
            <p>-------------------------------------------</p>
            <h1>{`testing: ${JSON.stringify(greaterSpeed)}`}</h1>
            <p>---------------------------------</p>
            <h1>{`Array: ${JSON.stringify(detectoridsHigh)}`}</h1>
        </>
    }

    const piechart=()=>{
        //let graphData = {}
        if (lowSpeed !=null && greaterSpeed !=null && goodSpeed!=null ){
            let data = {
                labels: [
                'Red',
                'Blue',
                'Yellow'
                ],
                datasets: [{
                data: [lowSpeed.length, greaterSpeed.length, goodSpeed.length],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
                }]
            }
        return (
                <div>
                <h2>Pie Example</h2>
                <Pie data={data} />
                </div>
                );
            }
        }


    const render = () => {
        //let showCovidResults = !isCovidLoading
        let showGraph = !isloading
        return <div className="ui container">
            <div >
                Testing the API
                {showGraph && renderTest()}
                {showGraph && piechart()}
            </div>
        </div>
    }

    return (
        render()
    )
}