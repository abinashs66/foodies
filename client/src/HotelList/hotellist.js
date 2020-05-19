import React, { Component } from 'react';
import "./hotellist.css";
import HotelPrototype from "./hotelprototype";
import {NavLink, Redirect} from "react-router-dom";
import { ProductConsumer } from '../context';
import {BounceLoader} from "react-spinners";

export default class hotellist extends React.Component {
    render() {
        return (
          <ProductConsumer>
            {
            (value)=>{
                    if(value.LoginStatus == false){
                        return <Redirect to="/"></Redirect>
                    }
                     return <div className="hotel-container">
                             <div className="spinner" style={value.HotelsLoadingStatus?{display:"fixed"}:{display:"none"}}>
                                <BounceLoader loading={value.HotelsLoadingStatus} size={100} color={"#11baf7"}/>
                             </div>
                            {
                                value.hotels.map((element)=>{
                                   switch(element.hotel_id){
                                       case 1:{
                                           return <NavLink className="custom-navlink" to={element.oc_status==="open"?"/hotel/greencastle":"/home"}> <HotelPrototype key={element.id} name={element}/> </NavLink>
                                       }
                                       case 2:{
                                        return <NavLink className="custom-navlink" to={element.oc_status==="open"?"/hotel/geetanjali":"/home"}> <HotelPrototype key={element.id} name={element}/> </NavLink>
                                       }
                                       case 3:{
                                        return <NavLink className="custom-navlink" to={element.oc_status==="open"?"/hotel/megha":"/home"}> <HotelPrototype key={element.id} name={element}/> </NavLink>
                                       }
                                   }
                                })
                            }
                            </div>
                    }
                }
            </ProductConsumer>
        )
    }
}
