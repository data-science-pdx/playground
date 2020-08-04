import React, {useState, useContext} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import ContextProvider from "./ContextProvider"
import Body from "./Body";
import DetectorMap from "./DetectorMap";

function App(){
    return (
        <Router>
            <ContextProvider>
                <Switch>
                    <Route exact path="/" component={Body}/>
                    <Route path="/detector" component={DetectorMap}/>
                </Switch>
            </ContextProvider>
        </Router>
    );
}

export default App;
