import React, { Component } from 'react';
import "./activeorder.css";

export default class ActiveOrder extends Component {
    render() {
            let {order_id,address,order_date,order_time,price,user_order}=this.props.value;
            let separated=user_order.split("<<-->>");

        return (
            <div className="proto-container">
                <div className="order-id">
                    <span>order id : #{order_id}</span>
                </div>
                <div className="items">
                    <span>Items</span>
                    {
                       separated.map(element => {
                            return <p className="target-p">{element}</p>  
                       })
                    }
                </div>
                <div className="total-amt">
                    <p>total</p>
                    <span><i className="fa fa-inr" aria-hidden="true"></i> {price}</span>
                </div>
                <div className="addr">
                    <span>delivery address</span>
                    <span className="target-p">{address}</span>
                </div>
                <div className="time-date">
                    <span>time</span>
                    <span className="target-p">{order_time}</span>
                </div>
            </div>
        )
    }
}
