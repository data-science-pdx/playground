import React, {useState, useContext} from "react";
import {Container} from "react-bootstrap";
import ContextProvider from "./ContextProvider"
import { Context } from "./Context"
import {DateTest} from "./DateTest"
import {Calendar} from "./Calendar"
import {ChartBars} from "./ChartBars"
import LowDetectorList from "./LowDetectorList"
import HighDetectorList from "./HighDetectorList"
import {DetailedMap} from "./DetailedMap"
import {Header} from  "./Header"
import {Footer} from "./Footer";

function App(){
    return (
        <Container className="Site-content">
            <ContextProvider>
                <Header/>
                <section id="Date">
                    <Calendar/>
                </section>

                <DateTest/>
                
                <hr className="my-5"/>

                <section id="Map" >
                    <DetailedMap/>
                </section>
                
                <hr className="my-5"/>

                <section id="Pie">
                    <h3>Detector Malfunction Ratio</h3>
                    <ChartBars/>
                </section>
                
                <hr className="my-5"/>
                {/*<section id="Table">
                    <LowDetectorList/>
                    <HighDetectorList/>
                </section>*/}
                <Footer/>
            </ContextProvider>
        </Container>
    );
}

export default App;
