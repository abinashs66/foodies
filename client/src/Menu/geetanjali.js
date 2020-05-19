import React, { Component } from 'react';
import MenuPrototype from "./menuPrototype";
import {ProductConsumer} from "../context";
import {BounceLoader} from "react-spinners";
import "./megha.css"
import { Redirect } from 'react-router-dom';

export default class Geetanjali extends Component {
    render() {
        return (
            <div className="hotel-megha">
                <div><h4>Geetanjali restaurant</h4></div>
            <ProductConsumer>
             {   
               (value)=>{
                        if(value.LoginStatus === false){
                          return <Redirect to="/"></Redirect>
                        }
                    return <div className="sidebyside">
                          
                         <div className="spinner" style={value.MenuLoadingStatus?{display:"fixed"}:{display:"none"}}>
                              <BounceLoader loading={value.MenuLoadingStatus} size={100} color={"#11baf7"}/>
                         </div>
                          
                         <p style={{width:"100%"}}>South Indian</p>
                          {
                            value.geetanjali.map((element)=>{
                            if(element.item_subtype=="south indian"){
                            return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                           }})
                           }
                          <p style={{width:"100%"}}Soup></p>
                           {
                             value.geetanjali.map((element)=>{
                             if(element.item_subtype=="soup"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }
                          <p style={{width:"100%"}}>Dal</p>
                           {
                             value.geetanjali.map((element)=>{
                             if(element.item_subtype=="dal"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }
                          <p style={{width:"100%"}}>Indian Sabji</p>
                           {
                             value.geetanjali.map((element)=>{
                             if(element.item_subtype=="indian sabji"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }
                          <p style={{width:"100%"}}>Tandoor</p>
                           {
                             value.geetanjali.map((element)=>{
                             if(element.item_subtype=="tandoor"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }
                          <p style={{width:"100%"}}>Noodles & Roll</p>
                           {
                             value.geetanjali.map((element)=>{
                             if(element.item_subtype=="noodles and roll"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }
                          <p style={{width:"100%"}}>Evening Snacks</p>
                           {
                             value.geetanjali.map((element)=>{
                             if(element.item_subtype=="evening snacks"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }
                          <p style={{width:"100%"}}>Pizza</p>
                           {
                             value.geetanjali.map((element)=>{
                             if(element.item_subtype=="pizza"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }
                          <p style={{width:"100%"}}>Special Chinese</p>
                           {
                             value.geetanjali.map((element)=>{
                             if(element.item_subtype=="special chinese"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }
                          <p style={{width:"100%"}}>Salad , Papad & Raita</p>
                           {
                             value.geetanjali.map((element)=>{
                             if(element.item_subtype=="saladpapadraita"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }
                          <p style={{width:"100%"}}>Rice & Pulao</p>
                           {
                             value.geetanjali.map((element)=>{
                             if(element.item_subtype=="rice&pulao"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }
                          <p style={{width:"100%"}}>Paneer</p>
                           {
                             value.geetanjali.map((element)=>{
                             if(element.item_subtype=="paneer"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }
                          <p style={{width:"100%"}}>Mushroom</p>
                           {
                             value.geetanjali.map((element)=>{
                             if(element.item_subtype=="mushroom"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }  
                    </div>
                          }
                }
              </ProductConsumer>
            </div>
        )
    }

    toggle=()=>{
        let toggle=document.querySelector(".menu-list");
        toggle.classList.toggle("menu-visible");
    }
}
