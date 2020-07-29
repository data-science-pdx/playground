import React, { useState ,useContext} from "react";
import ContextProvider from "./ContextProvider"
import { Context } from "./Context"
import {DateTest} from "./DateTest"
import {Calendar} from "./Calendar"

const STATION_URL = "http://localhost:3001/"

function App(){
    return (
        <ContextProvider>
            <div>
                <h1><Calendar/></h1>
                <h2><DateTest></DateTest></h2>
            </div>
        </ContextProvider>
        );
}

export default App;
