import React, { Component } from 'react';
import "./pastorders.css";

export default class ActiveOrder extends Component {
    render() {
            let {order_id,address,order_date,order_time,price,user_order,delivery_status}=this.props.value;
            let separated=user_order.split("<<-->>");
            order_date=order_date.substring(0,10);

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
                    <span>ordered on </span>
                    <span className="target-p">{order_date} at {order_time}</span>
                    <span className="d-status"
                          style={delivery_status==="cancelled"?{color:"crimson"}:{color:"green"}}>{delivery_status}</span>
                </div>
            </div>
        )
    }
}
