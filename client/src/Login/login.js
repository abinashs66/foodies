import React, { Component } from 'react';
import  "./login.css";
import { ProductConsumer } from '../context';
import {Redirect,NavLink} from "react-router-dom";

export default class Login extends Component {
    constructor(){
        super();
        this.state={
            uname:"",
            upass:""
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
                    return <div className="login-container" >
                        <form className="login-form">
                            <h1>Login</h1>
                            <div>
                                <label>Username</label>
                                <div className="login-element">
                                    <i class="fa fa-user"></i>
                                    <input typt="text" placeholder="Enter Username" name="uname" value={this.state.uname} onChange={this.handleChange}required/>
                                </div>
                                <label>Password</label>
                                <div  className="login-element">
                                    <i class="fa fa-lock"></i>                       
                                    <input type="password" placeholder="Enter Password" name="upass" value={this.state.upass} onChange={this.handleChange} required/>
                                </div>
                                <div className="forgot-pass"><NavLink to="/forgotpassword"><p>Forgot Password ?</p></NavLink></div>
                                <div className="login-button">
                                    <button disabled={this.state.uname==""||this.state.upass==""?true:false}
                                            onClick={(e)=>{value.login(e,this.state.uname,this.state.upass,this.props.history)}}
                                            >LOGIN</button>
                                </div>
                                <div className="sign-up">
                                        <p>Dont have an account ?<span onClick={this.route}>Sign up Now </span></p>
                                </div>
                            </div>
                        </form>
                    </div>   
                    }
                }
            </ProductConsumer>
        )
    }
    handleChange = (e)=>{
        let value=e.target.value;
        let name=e.target.name;
        this.setState({
                [name]:value
        });
    }
    route =()=>{
        this.props.history.push("/register");
    }
}
