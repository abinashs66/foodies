import React, { Component } from 'react';
 import "./hotelprototype.css"
import two from "../Images/two.jpg";

export default class HotelPrototype extends Component {
    render() {
        return (
            <div className="hotel-prototype">
                <div class="left">
                    <img src={two}></img>
                </div>
                <div className="middle">
                    <h3>hotel megha</h3>
                    <span class="fa fa-map-marker" aria-hidden="true"></span><p> Govt Bus Stand , keonjhar</p>
                    <p>opens at time</p>
                </div>
                <div className="right">
                    <div>5<i class="fa fa-star"></i></div>
                </div>
            </div>
        )
    }
}
