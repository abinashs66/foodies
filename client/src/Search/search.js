import React, { Component } from 'react';
import "./search.css";
import { ProductConsumer } from '../context';
import MenuPrototype from "../Menu/menuPrototype";
import {Redirect} from "react-router-dom";
export default class Search extends Component {
    render() {
        return (
            <ProductConsumer>
                { (value)=>{
                    if(value.LoginStatus===false){
                        return <Redirect to="/"></Redirect>
                    }
                   return <div className="search-container">
                            <div className="search-box">
                                <span><i class="fa fa-search"></i></span>
                                <input type="text" placeholder="search" onChange={value.setSearch}></input>
                            </div>
                            <div className="search-results">
                                {
                                    value.search.length===0? <div className="no-results"> No Results Found </div> : 
                                    <div>
                                            <h3 style={value.search[0]===null?{display:"none"}:{display:"block"}}>hotel megha</h3>
                                            {   
                                                value.search.map((element)=>{
                                                    if(element.hotel_id===3)
                                                    return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                })
                                            }
                                            <h3 style={value.search[0]==null?{display:"none"}:{display:"block"}}>Geetanjali Restaurant</h3>
                                            {   
                                                value.search.map((element)=>{
                                                    if(element.hotel_id===2)
                                                    return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                })
                                            }
                                            <h3 style={value.search[0]==null?{display:"none"}:{display:"block"}}>Greencastle</h3>
                                            {   
                                                value.search.map((element)=>{
                                                    if(element.hotel_id===1)
                                                    return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                })
                                            }

                                    </div>      
                                }
                            </div>

                        </div>
    }}
            </ProductConsumer>
        )
    }
}























