import React, {useState, useContext} from "react";
import {Container} from "react-bootstrap";
import { Context } from "./Context"
import {DateTest} from "./DateTest"
import {Calendar} from "./Calendar"
import {Graphs} from "./Graphs"
import LowDetectorList from "./LowDetectorList"
import HighDetectorList from "./HighDetectorList"
import {DetailsTable} from "./DetailsTable"
import {Header} from  "./Header"
import {Footer} from "./Footer";

function Body(){
    return (
        <Container className="Site-content">
            <Header/>
            <section id="Date"><Calendar/></section>
            <DateTest/>
            <section id="Pie"><Graphs/></section>
            <section id="Table">
                <LowDetectorList/>
                <HighDetectorList/>
            </section>
            <section id="Map" ><DetailsTable/></section>
            <Footer/>
        </Container>
    );
}

export default Body;
