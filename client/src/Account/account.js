import React, { Component } from 'react';
import "./account.css";
import { ProductConsumer, ProductProvider } from '../context';
import { Redirect } from 'react-router-dom';



export default class Account extends Component {
    render() {
        return (
            <ProductConsumer>
                {
                    (value)=>{

                        if(value.userDetails==null){
                            return <Redirect to="/home"></Redirect> //error page
                        }
                        let phone_no,cust_name,email,username;
                        value.userDetails.map((element)=>{
                            phone_no=element.phone_no;
                            cust_name=element.cust_name;
                            email=element.email;
                            username=element.username;
                        })

                        if(value.LoginStatus==false){
                            return <Redirect to="/"></Redirect>
                        }
                        return( 
                        <div className="account-container">
                            <div className="upper">
                                    <div className="circle"><p>{cust_name.charAt(0)}</p></div>
                                    <div className="circle-right"><h4>{cust_name}</h4><h6>{email}</h6></div>
                            </div>
                            <div className="mid">
                                <fieldset>
                                    <legend>Username</legend>
                                        <div>{username}</div>
                                </fieldset>
                                <fieldset>
                                    <legend>Name</legend>
                                        <div>{cust_name}</div>
                                </fieldset>
                                <fieldset>
                                    <legend>E-mail</legend>
                                        <div>{email}</div>
                                </fieldset>
                                <fieldset>
                                    <legend>Password</legend>
                                        <div>**************************</div>
                                        <div className="password"><p>Change</p></div>
                                </fieldset>
                                <fieldset>
                                    <legend>Phone</legend>
                                        <div>{phone_no}</div>
                                </fieldset>
                            </div>
                            <ProductConsumer>
                                {
                                    (value)=>{
                                        return<div className="bottomm">
                                                <button onClick={value.logout}>Sign Out</button>
                                              </div>
                                    }
                                }
                            </ProductConsumer>
                        </div>)
                    }
                }
            </ProductConsumer>
        )
    }
}
