import React, {useState, useContext} from "react";
import {Container} from "react-bootstrap";
import ContextProvider from "./ContextProvider"
import { Context } from "./Context"
import {DateTest} from "./DateTest"
import {Calendar} from "./Calendar"
import {Graphs} from "./Graphs"
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
                <section id="Pie"><Graphs/></section>
                <section id="Table">
                    <LowDetectorList/>
                    <HighDetectorList/>
                </section>
                <section id="Map" ><DetailsTable/></section>
                <Footer/>
            </ContextProvider>
        </Container>
    );
}

export default App;
