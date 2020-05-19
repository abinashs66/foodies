import React, { Component } from 'react';
import MenuPrototype from "./menuPrototype";
import {ProductConsumer} from "../context";
import {BounceLoader} from "react-spinners";
import "./megha.css"
import { Redirect } from 'react-router-dom';

export default class GreenCastle extends Component {
    render() {
        return (
            <div className="hotel-megha">
                <div><h4>GreenCastle</h4></div>
            <ProductConsumer>
             {   
               (value)=>{
                    if(value.LoginStatus==false){
                      return <Redirect to="/"></Redirect>
                    }
                   return <div className="sidebyside">
                         <div className="spinner" style={value.MenuLoadingStatus?{display:"fixed"}:{display:"none"}}>
                              <BounceLoader loading={value.MenuLoadingStatus} size={100} color={"#11baf7"}/>
                         </div>
                          
                         <p style={{width:"100%"}}>Biriyani</p>
                          {
                            value.greencastle.map((element)=>{
                            if(element.item_subtype=="biriyani"){
                            return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                           }})
                           }
                          <p style={{width:"100%"}}>Snacks</p>
                           {
                             value.greencastle.map((element)=>{
                             if(element.item_subtype=="snacks"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }
                          <p style={{width:"100%"}}>Salad , Papad & Raita</p>
                           {
                             value.greencastle.map((element)=>{
                             if(element.item_subtype=="saladraitapapad"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }
                          <p style={{width:"100%"}}>Soup</p>
                           {
                             value.greencastle.map((element)=>{
                             if(element.item_subtype=="soup"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }
                          <p style={{width:"100%"}}>Noodles</p>
                           {
                             value.greencastle.map((element)=>{
                             if(element.item_subtype=="noodles"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }
                          <p style={{width:"100%"}}>Chinese</p>
                           {
                             value.greencastle.map((element)=>{
                             if(element.item_subtype=="chinese"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }
                          <p style={{width:"100%"}}>Roti & Naan</p>
                           {
                             value.greencastle.map((element)=>{
                             if(element.item_subtype=="rotinaan"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }
                          <p style={{width:"100%"}}>Rice</p>
                           {
                             value.greencastle.map((element)=>{
                             if(element.item_subtype=="rice"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }
                          <p style={{width:"100%"}}>Dal</p>
                           {
                             value.greencastle.map((element)=>{
                             if(element.item_subtype=="dal"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }
                          <p style={{width:"100%"}}>Veg</p>
                           {
                             value.greencastle.map((element)=>{
                             if(element.item_subtype=="veg"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }
                          <p style={{width:"100%"}}>Paneer</p>
                           {
                             value.greencastle.map((element)=>{
                             if(element.item_subtype=="paneer"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }
                          <p style={{width:"100%"}}>Baby Corn & Mushroom</p>
                           {
                             value.greencastle.map((element)=>{
                             if(element.item_subtype=="babycornmushroom"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }
                          <p style={{width:"100%"}}>Tandoor</p>
                           {
                             value.greencastle.map((element)=>{
                             if(element.item_subtype=="tandoor"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            } 
                          <p style={{width:"100%"}}>Egg</p>
                           {
                             value.greencastle.map((element)=>{
                             if(element.item_subtype=="egg"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }  
                          <p style={{width:"100%"}}>FishPrawn</p>
                           {
                             value.greencastle.map((element)=>{
                             if(element.item_subtype=="fishprawn"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }  
                          <p style={{width:"100%"}}>Chicken</p>
                           {
                             value.greencastle.map((element)=>{
                             if(element.item_subtype=="chicken"){
                              return <MenuPrototype key={element.id} name={element}></MenuPrototype>
                                                            }})
                            }  
                           <p style={{width:"100%"}}>Mutton</p>
                           {
                             value.greencastle.map((element)=>{
                             if(element.item_subtype=="mutton"){
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
