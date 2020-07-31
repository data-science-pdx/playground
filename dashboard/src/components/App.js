import React, {useState, useContext} from "react";
import {Container} from "react-bootstrap";
import ContextProvider from "./ContextProvider"
import { Context } from "./Context"
import {DateTest} from "./DateTest"
import {Calendar} from "./Calendar"
import {FristGraph} from "./FristGraph"
import LowDetectorList from "./LowDetectorList"
import HighDetectorList from "./HighDetectorList"
import {DetailsTable} from "./DetailsTable"
import {Header} from  "./Header"
import {Footer} from "./Footer";

function App(){
    return (
        <Container className="Site-content">
            <ContextProvider>
                <Header/>
                <section id="Date"><Calendar/></section>
                <DateTest/>
                <section id="Pie"><FristGraph/></section>
                <section id="Table"><LowDetectorList/></section>
                <h5><HighDetectorList/></h5>
                <section id="Map" ><DetailsTable/></section>
                <Footer/>
            </ContextProvider>
        </Container>
    );
}

export default App;
