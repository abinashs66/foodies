import React, { Component } from 'react'
import "./emptycart.css"
import emptycart from "../Images/emptycart.jpg";
import {Link} from "react-router-dom";

export default class EmptyCart extends Component {
    render() {
        return (
            <div className="empty-cart">
                <div class="empty-image">
                    <img src={emptycart}></img>
                </div>
                <div className="food-quote">
                    <h4>good food = good mood</h4>
                </div>
                <div className="add-something">
                    <p>Your cart is empty</p>
                    <p>Add something from the menu</p>
                </div>
                <div className="browse-button">
                    <Link to="/home"><p>browse restaurants</p></Link>
                </div>

            </div>
        )
    }
}
