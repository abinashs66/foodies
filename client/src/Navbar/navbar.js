import React, { Component } from 'react';
import "./navbar.css"
import { ProductConsumer } from '../context';
import {NavLink} from "react-router-dom";

export default class Navbar extends React.Component {
    render() {
        console.log("Navbar Render");
        return (
        <div>
            <div className="navbar">
                <div>THE FOODIES</div> 
                <div className="hamburger" 
                     onClick={this.toggle}>
                      <i className="fa fa-bars"></i>
                 </div>
            </div>
            <div className="slider" onClick={this.hide}>
                    <h1>Hi Abinash !!</h1>
                    <div>     </div>
                    <ul>
                        <li> <NavLink to="/home" className="custom-navlink"> <i className="fa fa-home" aria-hidden="true"></i><span>home</span>   </NavLink>           </li>
                        <li> <NavLink to="/address" className="custom-navlink"> <i class="fa fa-map-marker" aria-hidden="true"></i><span>delivery address</span>  </NavLink></li>
                        <li><i class="fa fa-percent" aria-hidden="true"></i><span>offers</span></li>
                        <li><i class="fa fa-cutlery" aria-hidden="true"></i><span>my orders</span></li>
                        <li> <NavLink to="/account" className="custom-navlink"><i class="fa fa-user-circle-o" aria-hidden="true"></i><span>my account</span> </NavLink> </li>
                        <li> <i class="fa fa-phone" aria-hidden="true"></i><span>talk to us</span></li>
                        <li><i class="fa fa-thumbs-up" aria-hidden="true"></i><span>send feedback</span></li>
                        <li><i class="fa fa-info-circle" aria-hidden="true"></i><span>about us</span></li>
                    </ul>
                    <div className="logout-container">
                        <ProductConsumer>
                        {
                            (value)=>{
                                return <button className="logout-btn" onClick={()=>{value.logout()}}>
                                                <i class="fa fa-power-off" aria-hidden="true"></i>
                                                        logout
                                       </button>
                            }
                        }
                        </ProductConsumer>
                        <div className="social-media">
                            <i class="fa fa-facebook-square" aria-hidden="true"></i>
                            <i class="fa fa-google" aria-hidden="true"></i>
                            <i class="fa fa-whatsapp" aria-hidden="true"></i>
                            <i class="fa fa-telegram" aria-hidden="true"></i>
                        </div>
                    </div>
            </div>
        </div>
        )   
    }
    toggle =()=>{
        let toggle=document.querySelector(".slider");
        toggle.classList.toggle("visible");

        let hamburger=document.querySelector(".hamburger");
        if(toggle.classList.contains("visible")){
            hamburger.innerHTML=`<i class="fa fa-times" aria-hidden="true"></i>`
        }
        else{
            hamburger.innerHTML=`<i class="fa fa-bars" aria-hidden="true"></i>`
        }
    }
    hide=()=>{
        let toggle=document.querySelector(".slider");
        toggle.classList.toggle("visible");
    }
}
