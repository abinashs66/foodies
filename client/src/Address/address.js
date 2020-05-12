import React, { Component } from 'react';
import "./address.css";
import { ProductConsumer } from '../context';
import AddAddress from "./addaddress";

export default class Address extends Component {
    render() {
        return (
            <ProductConsumer>
                {
                    (value)=>{
                        return(
                        <div className="address-container">
                                <div className="top1">
                                    <p>saved addresses</p>
                                </div>

                                <div className="middle2">
                                    {
                                        value.address.map((element,index)=>{
                                            return <div key={index} className="address">
                                                        <h5>{index+1}.{element.add_type}</h5>
                                                        <p>{element.user_address}</p>
                                                        <div><button onClick={()=>{value.deleteAddress(element.id)}}>delete</button></div>
                                                   </div>
                                        })
                                    }
                                </div>
                                <div className="bottom3" onClick={this.showhide}>
                                        <p>+ add new address</p>
                                </div>
                                <div className="hide">
                                    <AddAddress />
                                </div>
                        </div>)
                    }
                }
            </ProductConsumer>
        )
    }

    showhide =()=>{
        let item=document.querySelector(".hide");
        item.classList.toggle("show");

    }
}
