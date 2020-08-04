import React, {useContext, useEffect, useState} from "react"
import { Context } from "./Context"
import { DetectorMap } from "./DetectorMap"
import {HorizontalBar, Pie} from 'react-chartjs-2';
import {Modal, Button} from "react-bootstrap";

export const Graphs = () => {
    const {startDate, endDate, detectoridsLow, setDetectoridsLow, isloading, setIsLoading, detectoridsHigh, setDetectoridsHigh, goodSpeed, setGoodSpeed, greaterSpeed, setGreaterSpeed, lowSpeed, setLowSpeed, detectorId, setDetectorId} = useContext(Context)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
            let tmp = []
            setIsLoading(true)
            let resp = await (fetch(url, {
                headers: requestHeaders
            })).catch(handleError)
            if (resp.ok) {
                const dataValue = await resp.json()
                setLowSpeed(dataValue)
                for (var i = 0; i < dataValue.length; i++) {
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
            var tmp = []
            let resp = await (fetch(urlTwo, {
                headers: requestHeaders
            })).catch(handleError)
            if (resp.ok) {
                const dataValue = await resp.json()
                setGreaterSpeed(dataValue)

                for (var i = 0; i < dataValue.length; i++) {
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
    }, [url, setLowSpeed, setGreaterSpeed, setGoodSpeed, setIsLoading, setDetectoridsLow, setDetectoridsHigh])
    /*
    const renderDashboard = () => {
        return <>
            <h1 className="ui centered header">{`COVID-19 Dashboard: ${countryCode}`}</h1>
            <div><Statistics /></div>
        </>
    }*/


    const renderTest = () => {

        if (lowSpeed != null) {
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

    const pieChart = () => {
        //let graphData = {}
        if (lowSpeed != null && greaterSpeed != null && goodSpeed != null) {
            let data = {
                labels: [
                    'Low',
                    'Greater',
                    'Good'
                ],
                datasets: [{
                    data: [lowSpeed.length, greaterSpeed.length, goodSpeed.length],
                    backgroundColor: [
                        '#FF6384',
                        '#FFCE56',
                        '#36A2EB'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#FFCE56',
                        '#36A2EB'
                    ]
                }]
            }
            return (
                <div>
                    <h2>Good/bad Ratio</h2>
                    <Pie data={data}/>
                </div>
            );
        }
    }

    const lOptions = {
        onClick: (e, element) => {
            if (element.length > 0) {
                let ind = element[0]._index;
                setDetectorId(lowSpeed[ind]._id.detector_id)
                handleShow()
            }
        }
    }

    const gOptions = {
        onClick: (e, element) => {
            if (element.length > 0) {
                let ind = element[0]._index;
                setDetectorId(greaterSpeed[ind]._id.detector_id)
                handleShow()
            }
        }
    }

    const greaterHorizontalChart = () => {
        if (greaterSpeed != null) {
            let key = []
            let value = []
            greaterSpeed.forEach(i => {
                key.push(i._id.detector_id)
                value.push(i.totalnumber)
            })

            let data = {
                labels: key,
                datasets: [{
                    label: "errors occurred",
                    data: value,
                    backgroundColor: 'rgba(99, 210, 255, 0.2)',
                    borderColor: 'rgba(99, 210, 255, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(99, 210, 255, 0.4)',
                    hoverBorderColor: 'rgba(99, 210, 255, 1)',
                }]
            }
            return (
                <div>
                    <h4>Over Speed</h4>
                    <HorizontalBar data={data} options={gOptions}/>
                </div>
            )
        }
    }

    const lowHorizontalChart = () => {
        if (lowSpeed != null) {
            let key = []
            let value = []
            lowSpeed.forEach(i => {
                key.push(i._id.detector_id)
                value.push(i.totalnumber)
            })

            let data = {
                labels: key,
                datasets: [{
                    label: "errors occurred",
                    data: value,
                    backgroundColor: 'rgba(99, 210, 255, 0.2)',
                    borderColor: 'rgba(99, 210, 255, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(99, 210, 255, 0.4)',
                    hoverBorderColor: 'rgba(99, 210, 255, 1)',
                }]
            }
            return (
                <div>
                    <h4>Under Speed</h4>
                    <HorizontalBar data={data} options={lOptions}/>
                </div>
            )
        }
    }

    const modal = () => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Detector ID: {detectorId}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DetectorMap/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const render = () => {
        //let showCovidResults = !isCovidLoading
        let showGraph = !isloading
        return (
            <div className="ui container my-5">
                <div>
                    {/*{showGraph && renderTest()}*/}
                    {modal()}
                    {showGraph && pieChart()}
                    {showGraph && greaterHorizontalChart()}
                    {showGraph && lowHorizontalChart()}
                </div>
            </div>
        )
    }

    return (
        render()
    )
}