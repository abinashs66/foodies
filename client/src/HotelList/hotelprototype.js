import React, { Component } from 'react';
 import "./hotelprototype.css"
import two from "../Images/two.jpg";
export default class HotelPrototype extends Component {
    render() {
        let {hotel_name,hotel_address,opens_at,oc_status} =this.props.name;
        return (
            <div className={oc_status==="open"?"hotel-prototype":"when-disabled"}>
                <div className="left">
                    <img src={two}></img>
                </div>
                <div className="middle">
                    <h3>{hotel_name}</h3>
                    <span className="fa fa-map-marker" aria-hidden="true"></span><p> {hotel_address}</p>
                    <p>opens at {opens_at}</p>
                </div>
                <div className="right">
                    <div>5<i className="fa fa-star"></i></div>
                </div>
            </div>
        )
    }
}
