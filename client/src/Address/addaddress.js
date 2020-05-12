import React, { Component } from 'react';
import "./addaddress.css";
import { ProductConsumer } from '../context';


export default class AddAddress extends Component {
    constructor(){
        super();
        this.state={
            address:"",
            addType:"home",
            error:""
        }
    }
    
    render() {
        return (
            <div className="add-address">
                <div className="radio-buttons">
                    <input type="radio" name="addType" value="home" onClick={this.handleChange}></input>Home
                    <input type="radio" name="addType" value="work" onClick={this.handleChange} ></input>Work
                    <input type="radio" name="addType" value="others" onClick={this.handleChange}></input>Others
                </div>
                <div className="complete-address">
                    <textarea name="address" 
                             placeholder="Enter your Address here ...."
                             value={this.state.address}
                             maxLength="195"
                             autoFocus
                             rows="5"
                             onChange={this.handleChange}
                             >                 
                    </textarea>
                    <div className="btn-cont">
                        <ProductConsumer>
                            {
                                (value)=>{
                                    return(

                                        <button disabled={this.state.address.length<10?true:false}
                                        onClick={()=>{value.addAddress(this.state.addType,this.state.address)}}>ADD</button>
        
                                    )
                                }
                            }
                        </ProductConsumer>
                    </div>
                </div>
                <div className="error">
                        {this.state.error===""?"":<span><i className="fa fa-exclamation-triangle"></i>{this.state.error}</span>}
                </div>
            </div>
        )
    }
    handleChange =(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        this.setState({
            [name]:value
        },()=>{
            this.checkErrors();
        })
    }
    checkErrors =()=>{

        if(this.state.address.length<10){
            this.setState({error:"Minimum 10 Characters Required"})
        }
        else{
            this.setState({error:""})
        }
    }
}
