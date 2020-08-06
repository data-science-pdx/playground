import React, {useState, useContext} from "react";
import {Container} from "react-bootstrap";
import ContextProvider from "./components/ContextProvider"
import { Context } from "./components/Context"
import {DateTest} from "./components/DateTest"
import {Calendar} from "./components/Calendar"
import {ChartBars} from "./components/ChartBars"
import LowDetectorList from "./components/LowDetectorList"
import HighDetectorList from "./components/HighDetectorList"
import {DetailedMap} from "./components/DetailedMap"
import {Header} from "./components/Header"
import {Footer} from "./components/Footer";

function App(){
    return (
        <Container className="Site-content">
            <ContextProvider>
                <Header/>
                <section id="Map" ><DetailedMap/></section>
                <hr className="my-5"/>
                <section id="Date"><Calendar/></section><DateTest/><hr className="my-5"/>
                <section id="Pie"><ChartBars/></section><hr className="my-5"/>
                <Footer/>
            </ContextProvider>
        </Container>
    );
}

export default App;
