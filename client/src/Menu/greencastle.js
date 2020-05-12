import React, { Component } from 'react';
import MenuPrototype from "./menuPrototype";
import {ProductConsumer} from "../context";
import "./megha.css"

export default class GreenCastle extends Component {
    render() {
        console.log("green castle render");
        return (
            <div className="hotel-megha">

                <div><h4>Green Castle</h4></div>
                
                <div>
                    <ProductConsumer>
                    {   
                        (value)=>(
                                <div className="sidebyside">
                                    <p style={{width:"100%"}}>Biriyani</p>
                                    {
                                            value.greencastle.map((element)=>{
                                            if(element.item_subtype=="veg"){
                                             return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                                                }
                                                        })
                                    }
                                </div>
                        )
                    }
                    </ProductConsumer>
                </div>
            </div>
        )
    }
    toggle=()=>{
        let toggle=document.querySelector(".menu-list");
        toggle.classList.toggle("menu-visible");
    }
}
