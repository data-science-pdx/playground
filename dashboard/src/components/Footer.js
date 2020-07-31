import React from "react";
import {Navbar} from 'react-bootstrap'
import './stylesheet.css'

export const Footer = () => {
    return (
        <Navbar sticky="bottom" variant="light" className="justify-content-center">
        <span>
          &copy; 2020 by <a href="https://github.com/data-science-pdx/freeway-analysis" rel="noopener noreferrer" target="_blank">data-science-pdx
</a>, All right reserved
        </span>
        </Navbar>
    )
}