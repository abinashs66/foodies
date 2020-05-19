import React, { Component } from 'react';
import "./placeorder.css";
import { ProductConsumer } from '../context';
import {Redirect} from "react-router-dom";


export default class PlaceOrder extends Component {
    constructor(){
        super();
        this.state={
            selectedAddress:"",
            phone_no:""
        }
    }
    render() {
        return (
            <ProductConsumer>
            {    
            (value)=>{
                    if(value.LoginStatus == false){
                       return <Redirect to="/"></Redirect>
                    }
                    {
                        if(value.cartTotal<=0){
                           return <Redirect to="/cart"></Redirect>
                        }
                    }

                 return(
                    <div className="place-order">
                        <h3>Select Delivery Address</h3>
                        <div className="select-address">
                                {
                                    value.address.map(element=>{
                                    return  <div className="specify-address">
                                             <input type="radio" name="address" onClick={()=>{this.setAddress(element.user_address)}} />
                                             <label>{element.add_type}->{element.user_address}</label>
                                            </div>
                                    })
                                }
                            <div className="add">
                                <span onClick={this.route}>+ Add New Address</span>
                            </div>
                        </div>
                        <h3>Contact No. for Delivery</h3>
                        <div className="phone-no">
                                <input type="number" name="phone_no" value={this.state.phone_no} onChange={this.handleChange}></input>
                                <p>(Ignore if Similar to Registered Mobile Number .)</p>
                        </div>
                        <div className="bill">
                               Total<h2><i style={{fontSize:"2.1rem"}} class="fa fa-inr" aria-hidden="true"></i> {value.cartTotal}</h2>
                               <p>+ Delivery Charge</p>
                               <p className="help" onClick={this.helpDesk}>
                                   <i class="fa fa-info-circle" aria-hidden="true"></i>help
                               </p>
                        </div>
                        <div className="submit-order" 
                            onClick={()=>{value.submitOrder(this.state.selectedAddress,this.state.phone_no,this.props.history)}}>
                                <div>place order</div>
                        </div>
                        <div className="delivery-charges">
                                <li>old town<span><i style={{fontSize:"1.1rem"}} class="fa fa-inr" aria-hidden="true"></i> 30</span></li>
                                <li>dukhia chowk<span>25</span></li>
                                <li>mining road<span>20</span></li>
                                <li>DAV School area-<span>20</span></li>
                                <li>Kashipur 20</li>
                                <li>Naranpur 40</li>
                                <li>GCE Keonjhar  30</li>
                                <li>Baniapat20</li>
                                <li>DD College 20</li>
                        </div>
                    </div>
                        )
            }
            }
            </ProductConsumer>
           
        )
    }
    setAddress = (address)=>{
        this.setState({selectedAddress:address});
    }
    helpDesk = ()=>{
        let item=document.querySelector(".delivery-charges")
        item.classList.toggle("scale");
    }
    handleChange = (e)=>{
        let name=e.target.name;
        let value=e.target.value;
        this.setState({[name]:value},()=>{console.log(this.state.phone_no)});
    }
    route=()=>{
        this.props.history.push("/address")
    }
}
