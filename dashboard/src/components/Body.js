import React, {useState, useContext} from "react";
import {Container} from "react-bootstrap";
import { Context } from "./Context"
import {CalendarTest} from "./CalendarTest"
import {Calendar} from "./Calendar"
import {ChartBars} from "./ChartBars"
import LowDetectorList from "./LowDetectorList"
import HighDetectorList from "./HighDetectorList"
import {DetailedMap} from "./DetailedMap"
import {Header} from  "./Header"
import {Footer} from "./Footer";

function Body(){
    return (
        <Container className="Site-content">
            <Header/>
            <section id="Date"><Calendar/></section>
            <CalendarTest/>
            <section id="Pie"><ChartBars/></section>
            <section id="Table">
                <LowDetectorList/>
                <HighDetectorList/>
            </section>
            <section id="Map" ><DetailedMap/></section>
            <Footer/>
        </Container>
    );
}

export default Body;
