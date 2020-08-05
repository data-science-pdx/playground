import React, {useContext, useEffect, useState} from "react"
import {Context} from "./Context"
import {Line} from 'react-chartjs-2';
import moment from "moment";

export const LineCharts = () => {
    const {startDate, endDate,  isloading, setIsLoading, greaterSpeed, detectorId} = useContext(Context)
    const [dailySpeed, setDailySpeed] = useState([]);

    const url = `http://localhost:3001/speeddaily/${detectorId}/${startDate}/${endDate}`

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

        async function doFetchDailySpeed() {
            let resp = await (fetch(url, {
                headers: requestHeaders
            })).catch(handleError)
            if (resp.ok) {
                const dataValue = await resp.json()
                setDailySpeed(dataValue)
            } else {
                console.log("in else loop")
            }
        }


        doFetchDailySpeed()
    }, [url, setIsLoading, setDailySpeed])

    const options = {
        legend: {
            position: "bottom"
        }
    }

    const greaterHorizontalChart = () => {
        console.log("111111111111111111111")
        console.log(dailySpeed)
        if (dailySpeed != null) {
            let key = []
            let speed = []
            // let volume = []
            // let traveltime = []
            dailySpeed.forEach(i => {
                key.push(moment(i.starttime).format("MM/D/YYYY"))
                speed.push(i.speed)
                // volume.push(i.volume)
                // traveltime.push(i.traveltime)
            })

            let data = {
                labels: key,
                datasets: [{
                    label: "Average Speed",
                    data: speed,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
                    hoverBorderColor: 'rgba(255, 99, 132, 1)',
                },
                    /*{
                    label: "volume",
                    data: volume,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
                    hoverBorderColor: 'rgba(255, 99, 132, 1)',
                },{
                    label: "Travel Time",
                    data: traveltime,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
                    hoverBorderColor: 'rgba(255, 99, 132, 1)',
                }*/
                ]
            }
            return (
                <Line data={data} options={options}/>
            )
        }
    }
    const render = () => {
        let showGraph = !isloading
        return (
            <div>
                {showGraph && greaterHorizontalChart()}
            </div>
        )
    }

    return (
        render()
    )
}