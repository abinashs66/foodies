import React, { Component } from 'react';
import "./cart.css"
import { ProductConsumer } from '../context';
import { Redirect } from 'react-router-dom';

export default class Cart extends Component {
    render() {
        return (
            <div className="cart-container">
                <ProductConsumer>
                    {   
                        (value)=>{
                                if(value.LoginStatus == false){
                                    return <Redirect to="/"></Redirect>
                                }
                            return value.cart.map((element)=>{
                                let {item_name,id,incart,item_count,item_type,item_price,item_total,hotel_id,hotel_name}=element;
                                return <div className="cart-items">
                                            <div className="c-one" style={item_type=="veg"?{color:"green"}:{color:"crimson"}}>
                                                 <i class="fa fa-stop-circle-o" aria-hidden="true"></i>
                                            </div>
                                            <div className="c-two">
                                                    <h4>{item_name}</h4>
                                                    <p>{item_price}</p>
                                                    <p>{hotel_name}</p>
                                            </div>
                                            <div className="c-three">
                                                <button style={{backgroundColor:"firebrick"}}
                                                        onClick={()=>{value.decrement(id)}}><h2>-</h2></button>
                                                <p>{item_count}</p>
                                                <button onClick={()=>{value.increment(id)}}><h2>+</h2></button>
                                            </div>
                                            <div className="c-four"><i class="fa fa-trash" aria-hidden="true"
                                                                       onClick={()=>{value.removeItem(id,hotel_id)}}></i></div>
                                            <div className="c-five"><i class="fa fa-inr" aria-hidden="true"></i>{item_total}</div>
                                       </div>
                            })
                        }
                    }
                </ProductConsumer>
                <ProductConsumer>
                    {
                        (value)=>{
                            return<div className="checkout">
                                        <div className="m">
                                           <input type="text" placeholder="Enter Promocode Here .." />
                                           <button>APPLY PROMO</button>
                                        </div>
                                        <div className="l">
                                              <h5>TOTAL</h5>
                                              <h4><i class="fa fa-inr" aria-hidden="true"></i> {value.cartTotal}</h4>
                                        </div>
                                        <div className="r" onClick={this.handleData}>
                                              PROCEED
                                        </div>
                                  </div>
                        }
                    }
                </ProductConsumer>
            </div>
        )
    }
    handleData= ()=>{
        this.props.history.push("/placeorder");
    }
}
