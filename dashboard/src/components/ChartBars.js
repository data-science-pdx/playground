import React, {useContext, useEffect, useState} from "react"
import { Context } from "./Context"
import { DetectorMap } from "./DetectorMap"
import {HorizontalBar, Doughnut} from 'react-chartjs-2';
import {Modal, Button, Card, Nav} from "react-bootstrap";

export const ChartBars = () => {
    const {startDate, endDate, detectoridsLow, setDetectoridsLow, isloading, setIsLoading, detectoridsHigh, setDetectoridsHigh, detectoridsNull, setDetectoridsNull, goodSpeed, setGoodSpeed, greaterSpeed, setGreaterSpeed, nullSpeed, setNullSpeed, lowSpeed, setLowSpeed, detectorId, setDetectorId} = useContext(Context)
    const [show, setShow] = useState(false);
    const [displayCard, setDisplayCard] = useState(1);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const url = `http://localhost:3001/lessthenfive/${startDate}/${endDate}`
    const urlTwo = `http://localhost:3001/greaterthen/${startDate}/${endDate}`
    const urlThree = `http://localhost:3001/goodspeed/${startDate}/${endDate}`
    const urlNull = `http://localhost:3001/null/${startDate}/${endDate}`
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
                for (let i = 0; i < dataValue.length; i++) {
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
            let tmp = []
            let resp = await (fetch(urlTwo, {
                headers: requestHeaders
            })).catch(handleError)
            if (resp.ok) {
                const dataValue = await resp.json()
                setGreaterSpeed(dataValue)

                for (let i = 0; i < dataValue.length; i++) {
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

        async function doFetchNullSpeed() {
            let resp = await (fetch(urlNull, {
                headers: requestHeaders
            })).catch(handleError)
            if (resp.ok) {
                const dataValue = await resp.json()
                //setStatistics(dataValue.response[0])
                //setGraphData(buildGraphData(dataValue.response[0]))
                setNullSpeed(dataValue)
            } else {
                //setStatistics(`Error: ${resp.status}`)
                //setIsCovidLoading(false)
                console.log("in else loop")
            }
        }

        doFetchGoodSpeed()
        doFetchGreater()
        doFetchLessThenFive()
        doFetchNullSpeed()
    }, [url, setLowSpeed, setGreaterSpeed, setGoodSpeed, setIsLoading, setDetectoridsLow, setDetectoridsHigh, setDetectoridsNull, setNullSpeed])
    /*
    const renderDashboard = () => {
        return <>
            <h1 className="ui centered header">{`COVID-19 Dashboard: ${countryCode}`}</h1>
            <div><Statistics /></div>
        </>
    }*/

    const pieOptions = {
        legend: {
            position: "bottom"
        }
    }

    const pieChart = () => {
        //let graphData = {}
        if (lowSpeed != null && greaterSpeed != null && goodSpeed != null) {
            let data = {
                labels: [
                    'Low',
                    'Greater',
                    'Null',
                    'Good'
                ],
                datasets: [{
                    data: [lowSpeed.length, greaterSpeed.length, nullSpeed.length, goodSpeed.length],
                    backgroundColor: [
                        '#FF6384',
                        '#ffce56',
                        '#5a5a5a',
                        '#36A2EB'
                    ],
                    hoverBackgroundColor: [
                        '#ff6384',
                        '#ffce56',
                        '#5a5a5a',
                        '#36A2EB'
                    ]
                }]
            }

            let data2 = {
                labels: [
                    'bad',
                    'Good'
                ],
                datasets: [{
                    data: [lowSpeed.length + greaterSpeed.length + nullSpeed.length, goodSpeed.length],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB'
                    ],
                    hoverBackgroundColor: [
                        '#ff6384',
                        '#36A2EB'
                    ]
                }]
            }

            let data3 = {
                labels: [
                    'Low',
                    'Greater',
                    'Null'
                ],
                datasets: [{
                    data: [lowSpeed.length, greaterSpeed.length, nullSpeed.length],
                    backgroundColor: [
                        '#ff6384',
                        '#ffce56',
                        '#5a5a5a',
                    ],
                    hoverBackgroundColor: [
                        '#ff6384',
                        '#ffce56',
                        '#5a5a5a',
                    ]
                }]
            }

            return (
                <div>
                    <Card>
                        <Card.Header>
                            <Nav variant="tabs" defaultActiveKey="#AllDetails">
                                <Nav.Item>
                                    <Nav.Link className="linkText" eventKey="#AllDetails" onClick={() => setDisplayCard(1)}>Good/Bad Ratio</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className="linkText" eventKey="#GoodBadRatio" onClick={() => setDisplayCard(2)}>All Details</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className="linkText" eventKey="#GreaterLowNullRatio" onClick={() => setDisplayCard(3)}>Greater/Low/Null Ratio</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card.Header>
                        <div className="p-5">
                            {displayCard===1 &&
                                <Doughnut data={data2} options={pieOptions}/>
                            }
                            {displayCard===2 &&
                                <Doughnut data={data} options={pieOptions}/>
                            }
                            {displayCard===3 &&
                                <Doughnut data={data3} options={pieOptions}/>
                            }
                        </div>
                    </Card>
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
        },
        legend: {
            position: "bottom"
        }
    }

    const gOptions = {
        onClick: (e, element) => {
            if (element.length > 0) {
                let ind = element[0]._index;
                setDetectorId(greaterSpeed[ind]._id.detector_id)
                handleShow()
            }
        },
        legend: {
            position: "bottom"
        }
    }

    const nOptions = {
        onClick: (e, element) => {
            if (element.length > 0) {
                let ind = element[0]._index;
                setDetectorId(nullSpeed[ind]._id.detector_id)
                handleShow()
            }
        },
        legend: {
            position: "bottom"
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
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
                    hoverBorderColor: 'rgba(255, 99, 132, 1)',
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
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255, 206, 86, 0.4)',
                    hoverBorderColor: 'rgba(255, 206, 86, 1)',
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

    const nullHorizontalChart = () => {
        if (nullSpeed != null) {
            let key = []
            let value = []
            nullSpeed.forEach(i => {
                key.push(i._id.detector_id)
                value.push(i.totalnumber)
            })

            let data = {
                labels: key,
                datasets: [{
                    label: "errors occurred",
                    data: value,
                    backgroundColor: 'rgba(90,90,90, 0.2)',
                    borderColor: 'rgb(90,90,90)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(90,90,90, 0.4)',
                    hoverBorderColor: 'rgb(90,90,90)',
                }]
            }
            return (
                <div>
                    <h4>Null Speed</h4>
                    <HorizontalBar data={data} options={nOptions}/>
                </div>
            )
        }
    }

    const modal = () => {
        return (
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Detector ID: {detectorId}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DetectorMap/>
                </Modal.Body>
                <Modal.Footer>
                    <Button letiant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button letiant="primary" onClick={handleClose}>
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
                    {showGraph && pieChart()} <hr className="my-5"/>
                    {showGraph && greaterHorizontalChart()} <hr className="my-5"/>
                    {showGraph && lowHorizontalChart()} <hr className="my-5"/>
                    {showGraph && nullHorizontalChart()}
                </div>
            </div>
        )
    }

    return (
        render()
    )
}