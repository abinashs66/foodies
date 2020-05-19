import React, { Component } from 'react';
import "./forgot.css";
import axios from "axios";
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { ProductConsumer } from '../context';
import {Redirect}  from "react-router-dom";
const API_KEY="ecdc820c-916d-11ea-9fa5-0200cd936042";


export default class Forgot extends Component {
    constructor(){
        super();
        this.state={
            phone:"",
            sessionid:"",
            otp:"",
            otpVerified:false,
            password:"",
            confPassword:"",
            error:""
        }
    }
    render() {
        return (
            <div className="all-container">
                <ProductConsumer>
                    {
                        (value)=>{
                            if(value.LoginStatus == true){
                                return <Redirect to="/home"></Redirect>
                            }
    
                        }
                    }
                </ProductConsumer>
                <div className="forgot-container">
                    <h2>Reset Password</h2>
                    <label>Enter your Registered Mobile Number</label>
                    <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange}></input>
                    <div><button onClick={this.sendOtp}>Get OTP</button></div>
                    <NavLink to="/"><p>Back to LoginPage</p></NavLink>
                </div>
                <div className="modal-1">
                                <div className="modal">
                                        <h3>Enter OTP</h3>
                                        <input type="text" name="otp" value={this.state.otp} onChange={this.handleChange}></input><br></br>
                                        <button onClick={this.verifyOtp}>verify</button>
                                        <div><i onClick={this.close}class="fa fa-times"></i></div>
                                </div>
                </div>
                 <div className="modal-2">
                                <div className="modal">
                                        <label>New Password</label>
                                        <input type="text" name="password" value={this.state.password} onChange={this.handleChange}></input><br></br>
                                        <label>Confirm New Password</label>
                                        <input type="text" name="confPassword" value={this.state.confPassword} onChange={this.handleChange}></input><br></br>
                                        <button onClick={this.changePassword}>change</button>
                                        <div><i onClick={this.close}class="fa fa-times"></i></div>
                                        <span>{this.state.error}</span>
                                </div>
                </div>

            </div>

        )
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    
    sendOtp = async (e)=>{
            e.preventDefault();
        let result= await axios.get("https://ffoodieess.herokuapp.com/userDetails/forgotpassword",{params:{"phone":this.state.phone}});
        if(result.data.length>0){
            let status=await axios.get(`http://2factor.in/API/V1/${API_KEY}/SMS/${this.state.phone}/AUTOGEN/send_otp`);

                if(status.data.Status==="Success"){
                  document.querySelector(".modal-1").classList.add("show-modal");
                  this.setState({sessionid:status.data.Details})
                  }
            else{
                   toast.error("Sorry Unable to send OTP right Now !!");
                }
        }
        else{
            toast.error("Provided Number is Not linked with any Account !!");
        }
    }
    verifyOtp =async (event)=>{
        event.preventDefault();
        let result=await axios.post(`http://2factor.in/API/V1/${API_KEY}/SMS/VERIFY/${this.state.sessionid}/${this.state.otp}`);

        if(result.data.Status === "Success"){
            this.setState({otpVerified:true});
            document.querySelector(".modal-1").classList.remove("show-modal");
            document.querySelector(".modal-2").classList.add("show-modal");
        }
        else{
            toast.error("Wrong OTP");
        }
    }
    changePassword = async ()=>{
        if(this.state.password === this.state.confPassword && this.state.otpVerified===true)
        {   
            let record={
                phone:this.state.phone,
                password:this.state.password
               }
            let result=await axios.put(`https://ffoodieess.herokuapp.com/userDetails/changepassword`,record);
            if(result.data.affectedRows>0){
                toast.success("Password Successfully changed");
                this.setState({error:""});
                document.querySelector(".modal-2").classList.remove("show-modal");
                this.props.history.push("/");
            }
            else{
                toast.error("Error Occured !! Please Try Again");
                this.setState({error:""});
                this.props.history.push("/");
            }
        }
        else
        {
            this.setState({
                error:"Password Donot Match"
            })
        }
    }
    close = () =>{
        document.querySelector(".modal-1").classList.remove("show-modal");
        document.querySelector(".modal-2").classList.remove("show-modal");
    }



}
