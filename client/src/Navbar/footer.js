import React, { Component } from 'react';
import "./footer.css";
import {NavLink} from "react-router-dom";
import Navbar from './navbar';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer-container">
                <NavLink activeClassName="active-style" to="/home">
                    <div className="footer-item">
                        <i className="fa fa-home" aria-hidden="true"></i>
                        <p>Home</p>
                    </div>
                </NavLink >
                <NavLink activeClassName="active-style"  to="/search">
                    <div className="footer-item">
                        <i className="fa fa-search" aria-hidden="true"></i>
                        <p>Search</p>
                    </div>
                </NavLink>
                <NavLink activeClassName="active-style" to="/cart">
                    <div className="footer-item">
                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        <p> Cart </p>
                    </div>
                </NavLink>
                <NavLink activeClassName="active-style" to="/account">
                    <div className="footer-item">
                        <i className="fa fa-user" aria-hidden="true"></i>
                        <p>Profile</p>
                    </div>
                </NavLink>
            </div>
        )
    }
}
