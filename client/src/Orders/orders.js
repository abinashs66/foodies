import React, { Component } from 'react';
import "./orders.css";
import axios from "axios";
import ActiveOrder from "./activeorder";
import PastOrders from "./pastorders";
import { ProductConsumer } from '../context';
import {Redirect} from "react-router-dom";

export default class Orders extends Component {
    constructor(){
        super();
        this.state={
            orders:[]
        }
    }
    async componentDidMount(){
        const token=localStorage.getItem("token");
        if(token){
            let result=await axios.get("https://ffoodieess.herokuapp.com/orders/getorders",{headers:{"token":token}});
            
            this.setState({orders:result.data});
        }
    }
    render() {
        return (
            <div className="my-orders">
                <ProductConsumer>
                    {
                        (value)=>{
                            if(value.LoginStatus == false){
                                return <Redirect to="/"></Redirect>
                        }
                    }
                    }
                </ProductConsumer>
                <h3>active orders</h3>
                <div className="active-orders">
                   {
                       this.state.orders.map((element,index)=>{
                           if(element.delivery_status==="not delivered"){
                               return <ActiveOrder key={index} value={element}/>
                           }
                       })
                   }
                </div>
                <h3>past orders</h3>
                <div className="past-orders">
                  {
                       this.state.orders.map((element,index)=>{
                           if(element.delivery_status==="delivered" || element.delivery_status==="cancelled"){
                               return <PastOrders key={index} value={element}/>
                           }
                       })
                   }
                </div>
            </div>
        )
    }
}
