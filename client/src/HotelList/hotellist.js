import React, { Component } from 'react';
import "./hotellist.css";
import HotelPrototype from "./hotelprototype";
import {NavLink, Redirect} from "react-router-dom";
import { ProductConsumer } from '../context';

export default class hotellist extends Component {
    render() {
        return (
            <ProductConsumer>
                {
                    (value)=>{
                        if(value.LoginStatus == false){
                           return <Redirect to="/"></Redirect>
                        }
                        return <div className="hotel-container">
                                    <NavLink className="custom-navlink" to="/hotel/greencastle" ><HotelPrototype /></NavLink>
                                    <NavLink className="custom-navlink" to="/hotel/geetanjali" ><HotelPrototype /></NavLink>
                                    <NavLink className="custom-navlink" to="/hotel/megha" ><HotelPrototype /></NavLink>
                                    <HotelPrototype />
                                    <HotelPrototype />
                                    <HotelPrototype />
                                    <HotelPrototype />
                                    <HotelPrototype />
                                    <HotelPrototype />
                                    <HotelPrototype />
                                </div>
                    }
                }
            </ProductConsumer>
        )
    }
}
