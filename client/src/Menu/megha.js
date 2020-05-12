import React, { Component } from 'react';
import MenuPrototype from "./menuPrototype";
import {ProductConsumer} from "../context";
import {Link} from "react-scroll";
import "./megha.css"

export default class Megha extends Component {
    render() {
        console.log("megha hotel render");
        return (
            <div className="hotel-megha">

                <div><h4>hotel megha</h4></div>
                
                <div>
                    <ProductConsumer>
                    {   
                        (value)=>(
                                <div className="sidebyside">
                                    <p style={{width:"100%"}}>Biriyani</p>
                                    {
                                            value.megha.map((element)=>{
                                            if(element.item_subtype=="biriyani"){
                                             return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                                                }
                                                        })
                                    }
                                </div>
                        )
                    }
                    </ProductConsumer>
                    <ProductConsumer>
                     {
                            (value)=>(
                                <div className="sidebyside">
                                    <p style={{width:"100%"}}>Thali</p>
                                    {
                                            value.megha.map((element)=>{
                                            if(element.item_subtype=="thali"){
                                             return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                                                }
                                                                        })
                                    }
                                </div>
                        )
                    }
                    </ProductConsumer>
                    
                    <ProductConsumer>
                        {
                            (value)=>(
                                <div className="sidebyside">
                                    <p style={{width:"100%"}}>Soup & Snacks</p>
                                    {
                                            value.megha.map((element)=>{
                                            if(element.item_subtype=="soupandsnacks"){
                                             return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                                                }
                                                                        })
                                    }
                                </div>
                        )
                        }
                    </ProductConsumer>
                    
                    <ProductConsumer>
                        {
                           (value)=>(
                            <div className="sidebyside">
                                <p style={{width:"100%"}}>Salad</p>
                                {
                                        value.megha.map((element)=>{
                                        if(element.item_subtype=="salad"){
                                         return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                                            }
                                                                    })
                                }
                            </div>
                            )
                        }
                    </ProductConsumer>

                    <ProductConsumer>
                        {
                            (value)=>(
                                <div className="sidebyside">
                                    <p style={{width:"100%"}}>Fast Food</p>
                                    {
                                            value.megha.map((element)=>{
                                            if(element.item_subtype=="fastfood"){
                                             return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                                                }
                                                                        })
                                    }
                                </div>
                        )
                        }
                    </ProductConsumer>
                    
                    <ProductConsumer>
                        {
                            (value)=>(
                                <div id="rnp" className="sidebyside">
                                    <p style={{width:"100%"}}>Roti , Naan & Paratha</p>
                                    {
                                            value.megha.map((element)=>{
                                            if(element.item_subtype=="rotinaanparatha"){
                                             return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                                                }
                                                                        })
                                    }
                                </div>
                        )
                        }
                    </ProductConsumer>

                    <ProductConsumer>
                        {
                            (value)=>(
                                <div className="sidebyside">
                                    <p style={{width:"100%"}}>Paneer</p>
                                    {
                                            value.megha.map((element)=>{
                                            if(element.item_subtype=="paneer"){
                                             return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                                                }
                                                                        })
                                    }
                                </div>
                        )
                        }
                    </ProductConsumer>
                    
                    <ProductConsumer>
                        {
                            (value)=>(
                                <div className="sidebyside">
                                    <p style={{width:"100%"}}>Mushroom</p>
                                    {
                                            value.megha.map((element)=>{
                                            if(element.item_subtype=="mushroom"){
                                             return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                                                }
                                                                        })
                                    }
                                </div>
                        )
                        }
                    </ProductConsumer>
                    
                    <ProductConsumer>
                        {
                            (value)=>(
                                <div className="sidebyside">
                                    <p style={{width:"100%"}}>Rice</p>
                                    {
                                            value.megha.map((element)=>{
                                            if(element.item_subtype=="rice"){
                                             return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                                                }
                                                                        })
                                    }
                                </div>
                        )
                        }
                    </ProductConsumer>
                    
                    <ProductConsumer>
                        {
                            (value)=>(
                                <div className="sidebyside">
                                    <p style={{width:"100%"}}>Dal</p>
                                    {
                                            value.megha.map((element)=>{
                                            if(element.item_subtype=="dal"){
                                             return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                                                }
                                                                        })
                                    }
                                </div>
                        )
                        }
                    </ProductConsumer>
                    
                    <ProductConsumer>
                        {
                            (value)=>(
                                <div className="sidebyside">
                                    <p style={{width:"100%"}}>Veg</p>
                                    {
                                            value.megha.map((element)=>{
                                            if(element.item_subtype=="veg"){
                                             return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                                                }
                                                                        })
                                    }
                                </div>
                        )
                        }
                    </ProductConsumer>
                    
                    <ProductConsumer>
                        {
                            (value)=>(
                                <div className="sidebyside">
                                    <p style={{width:"100%"}}>Egg</p>
                                    {
                                            value.megha.map((element)=>{
                                            if(element.item_subtype=="egg"){
                                             return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                                                }
                                                                        })
                                    }
                                </div>
                        )
                        }
                    </ProductConsumer>
                    
                    <ProductConsumer>
                        {
                            (value)=>(
                                <div className="sidebyside">
                                    <p style={{width:"100%"}}>Fish</p>
                                    {
                                            value.megha.map((element)=>{
                                            if(element.item_subtype=="fish"){
                                             return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                                                }
                                                                        })
                                    }
                                </div>
                        )
                        }
                    </ProductConsumer>
                    
                    <ProductConsumer>
                        {
                            (value)=>(
                                <div className="sidebyside">
                                    <p style={{width:"100%"}}>Chicken</p>
                                    {
                                            value.megha.map((element)=>{
                                            if(element.item_subtype=="chicken"){
                                             return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                                                }
                                                                        })
                                    }
                                </div>
                        )
                        }
                    </ProductConsumer>
                    
                    <ProductConsumer>
                        {
                            (value)=>(
                                <div className="sidebyside">
                                    <p style={{width:"100%"}}>Mutton</p>
                                    {
                                            value.megha.map((element)=>{
                                            if(element.item_subtype=="mutton"){
                                             return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                                                }
                                                                        })
                                    }
                                </div>
                        )
                        }
                    </ProductConsumer>
                    
                    <ProductConsumer>
                        {
                            (value)=>(
                                <div className="sidebyside">
                                    <p style={{width:"100%"}}>Tandoor</p>
                                    {
                                            value.megha.map((element)=>{
                                            if(element.item_subtype=="tandoor"){
                                             return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                                                }
                                                                        })
                                    }
                                </div>
                        )
                        }
                    </ProductConsumer>
                    
                    <ProductConsumer>
                        {
                            (value)=>(
                                <div className="sidebyside">
                                    <p style={{width:"100%"}}>Sweets</p>
                                    {
                                            value.megha.map((element)=>{
                                            if(element.item_subtype=="sweets"){
                                             return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                                                }
                                                                        })
                                    }
                                </div>
                        )
                        }
                    </ProductConsumer>
                </div>
                <div className="menu-toggle">
                        <button onClick={this.toggle}><h4><i class="fa fa-cutlery" aria-hidden="true"></i>menu</h4></button>
                </div>
                <div className="menu-list">
                
                <ul>
                    <li>thali</li>
                     <li>biriyani </li>
                    <li>fast food</li>
                    <li>roti , nan & Paratha</li>
                    <li>rice</li>
                    <li>dal</li>
                    <li>veg</li>
                    <li>paneer</li>
                    <li>mushroom</li>
                    <li>egg</li>
                    <li>fish</li>
                    <li>chicken</li>
                    <li>mutton</li>
                    <li>tandoor</li>
                    <li>sweets</li>
                    <li>soup & snacks</li>
                    <li>salad</li>
                </ul>
                </div>

            </div>
        )
    }
    toggle=()=>{
        let toggle=document.querySelector(".menu-list");
        toggle.classList.toggle("menu-visible");
    }
}
