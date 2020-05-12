import React, { Component } from 'react';
import  "./register.css";
import { ProductConsumer } from '../context';
import {Redirect} from "react-router-dom";
import axios from 'axios';
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_KEY="ecdc820c-916d-11ea-9fa5-0200cd936042";

toast.configure();


export default class Register extends Component {
    constructor(){
        super();
        this.state={
            cname:"",
            uname:"",
            upass:"",
            // cpass:"",
            phone:"",
            email:"",
            sessionid:"",
            otp:"",

            cnameValid:false,
            unameValid:false,
            upassValid:false,
            // cpassValid:false,
            phoneValid:false,
            otpVerified:false,

            formErrors:{"cname":"","uname":"","upass":"","phone":""},
            formValid:false
        }
    }
    render() {
        return (
            <ProductConsumer>
                {
                    (value)=>{
                        if(value.LoginStatus == true){
                            return <Redirect to="/home"></Redirect>
                        }
                    return <div className="register-container" >
                        <form className="register-form">
                            <h1>Register</h1>
                            <div>
                                <label>Your Name</label>
                                <div className="register-element">
                                <i class="fa fa-user-circle"></i>
                                    <input typt="text" placeholder="Enter Your Name" name="cname" value={this.state.cname} onChange={this.handleChange}required/>
                                    <p>{this.state.formErrors.cname}</p>
                                </div>
                                <label>Username</label>
                                <div className="register-element">
                                    <i class="fa fa-user"></i>
                                    <input type="text" placeholder="Enter Username" name="uname" value={this.state.uname} onChange={this.handleChange}required/>
                                    <p>{this.state.formErrors.uname}</p>
                                </div>
                                <label>Password</label>
                                <div  className="register-element">
                                    <i class="fa fa-lock"></i>                       
                                    <input type="password" placeholder="Enter Password" name="upass" value={this.state.upass} onChange={this.handleChange} required/>
                                    <p>{this.state.formErrors.upass}</p>
                                </div>
                                {/* <label>Re-Enter Password</label> */}
                                {/* <div  className="register-element">
                                     <i class="fa fa-key"></i>                       
                                    <input type="password" placeholder="Re-Enter Password" name="cpass" value={this.state.cpass} onChange={this.handleChange} required/>
                                    <p>{this.state.formErrors.cpass}</p>
                                </div> */}
                                <label>Phone No.</label>
                                <div  className="register-element">
                                    <i class="fa fa-phone"></i>                       
                                    <input type="text" placeholder="Enter Your Number" id="ph-no-input" name="phone" value={this.state.phone} onChange={this.handleChange} required/>
                                    <button className="verify-ph" onClick={this.phoneVerify} disabled={!this.state.phoneValid}>{this.state.otpVerified?"verified":"verify"}</button>
                                    <p>{this.state.formErrors.phone}</p>
                                </div>
                                <label>Email</label>
                                <div  className="register-element">
                                    <i class="fa fa-envelope"></i>                       
                                    <input type="text" placeholder="Email is Optional" name="email" value={this.state.email} onChange={this.handleChange} required/>
                                </div>
                                <div className="register-button">
                                    <button disabled={!this.state.formValid}
                                            onClick={this.register}
                                            >REGISTER</button>
                                </div>
                                <div className="sign-up">
                                        <p>Already a Foodie ? <span onClick={this.route}>Sign in </span></p>
                                </div>
                            </div>
                        </form>
                        <div className="modal-container show">
                                <div className="modal">
                                        <h3>Enter OTP</h3>
                                        <input type="text" name="otp" value={this.state.otp} onChange={this.handleChange}></input><br></br>
                                        <button onClick={this.otpValidation}>verify</button>
                                        <div><i onClick={this.close}class="fa fa-times"></i></div>
                                </div>
                        </div>
                    </div>   
                    }
                }
            </ProductConsumer>
        )
    }
    close = () =>{
        document.querySelector(".modal-container").classList.remove("show-modal");
    }
    phoneVerify = async (event)=>{
        event.preventDefault();

        let result=await axios.get(`http://2factor.in/API/V1/${API_KEY}/SMS/${this.state.phone}/AUTOGEN/send_otp`);

        if(result.data.Status==="Success"){
            document.querySelector(".modal-container").classList.add("show-modal");
            this.setState({sessionid:result.data.Details})
        }
        else{
            toast("Sorry .. Unable to Verify .TRY AGAIN");
        }
    }
    otpValidation =async (event)=>{
            event.preventDefault();
            let result=await axios.post(`http://2factor.in/API/V1/${API_KEY}/SMS/VERIFY/${this.state.sessionid}/${this.state.otp}`);

            if(result.data.Status === "Success"){
                this.setState({otpVerified:true});
                document.querySelector(".modal-container").classList.remove("show-modal");
                document.getElementById("ph-no-input").disabled=true;
                this.finalFunc();
            }
            else{
                toast("Wrong OTP");
            }
    }
    register =async (event)=>{
        event.preventDefault()
        let record={
                "cust_name":this.state.cname,
                "username":this.state.uname,
                "user_password":this.state.upass,
                "phone_no":this.state.phone,
                "email":this.state.email
        }
        let result=await axios.post("http://localhost:8080/register",record);
        
        if(result.data.code==="ER_DUP_ENTRY" || result.data.errno===1062){
            let localCopy=this.state.formErrors;
            localCopy.uname="Username already Exists !!";
            this.setState({
                formErrors:localCopy
            })
        }
         if(result.data.affectedRows>0){
            toast("Welcome To Foodies !! Please Login");
             this.props.history.push("/");
         }
         else{
             toast("Registration Unsuccessfull ");
         }

    }
    route =()=>{
        this.props.history.push("/");
    }
    handleChange = (e)=>{
        let value=e.target.value;
        let name=e.target.name;
        console.log(value,name);
        this.setState({
                [name]:value
        },()=>{this.validate(name,value)})
    }
    validate=(name,value)=>{
        let local_cnameValid = this.state.cnameValid;
        let local_unameValid = this.state.unameValid;
        let local_upassValid=this.state.upassValid;
        // let local_cpassValid=this.state.cpassValid;
        let local_phoneValid=this.state.phoneValid;
        let local_formErrors=this.state.formErrors;
        switch(name)
        {
            case "cname":
                {
                    local_cnameValid=value.length>=5;
                    local_formErrors.cname=local_cnameValid?"":"Minimum 5 characters are Required ."
                    break;
                }
            case "uname":
                {
                    local_unameValid=value.length>=6;
                    local_formErrors.uname=local_unameValid?"":"Minimum 6 characters are Required ."
                    break;
                }   
            case "upass":
                {
                    local_upassValid=value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/i);
                    local_formErrors.upass=local_upassValid?"":`Must contain at least one number and one uppercase and 
                                                                lowercase letter, and at least 8 or more characters`;
                    break;
                }
            // case "cpass":
            //     {
            //         local_cpassValid= this.state.upass === this.state.cpass;
            //         local_formErrors.cpass=local_cpassValid?"":"Password Donot Match";
            //         break;
            //     }
            case "phone":
                {
                    local_phoneValid=value.match(/^\d{10}$/);
                    local_formErrors.phone=local_phoneValid?"":"Invalid";
                    break;
                }
        }
        this.setState({
            formErrors:local_formErrors,
            cnameValid:local_cnameValid,
            unameValid:local_unameValid,
            upassValid:local_upassValid,
            // cpassValid:local_cpassValid,
            phoneValid:local_phoneValid,
        },this.finalFunc )

    }

    finalFunc=()=>{
        this.setState({
            formValid:this.state.cnameValid && this.state.unameValid && this.state.upassValid && this.state.phoneValid
                        && this.state.otpVerified
        },()=>{console.log(this.state.formValid)});
    };
    
}
