import React, {useState, useContext} from "react";
import ContextProvider from "./ContextProvider"
import { Context } from "./Context"
import {DateTest} from "./DateTest"
import {Calendar} from "./Calendar"
import {FristGraph} from "./FristGraph"
import LowDetectorList from "./LowDetectorList"
import HighDetectorList from "./HighDetectorList"
import {DetailsTable} from "./DetailsTable"
function App(){
    return (
        <ContextProvider>
            <div>
                <h1><Calendar/></h1>
                <h2><DateTest></DateTest></h2>
                <h3><FristGraph/></h3>
                <h4><LowDetectorList/></h4>
                <h4><HighDetectorList/></h4>
                <DetailsTable/>
            </div>
        </ContextProvider>
    );
}

export default App;
