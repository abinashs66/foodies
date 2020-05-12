import React, { Component } from 'react'
import "./menuPrototype.css";
import { ProductConsumer } from '../context';


export default class menuPrototype extends Component {
    render() {
        const {item_name,item_price,incart,id,hotel_id}=this.props.name;
        
        return (
                    <ProductConsumer>
                        { (value) => (
                            <div className="menu-prototype">
                                <div className="p-left">
                                    <i class="fa fa-stop-circle-o" aria-hidden="true"></i>
                                </div>
                                <div className="p-middle">
                                    <h4>{item_name}</h4>
                                    <p>{item_price}</p>
                                </div>
                                <div className="p-right">
                                        <button className="btn"
                                            disabled={incart?true:false}
                                            style={incart?{backgroundColor:"green",color:"white"}:{backgroundColor:"white",color:"green"}}
                                            onClick={()=>{value.addToCart(id,hotel_id)}}
                                            >{incart ? (<p> Added </p> ): ( <span>+ Add</span> )} </button>
                                </div>
                                
                            </div>
                            )
                        }      
                    </ProductConsumer>
        )
    }
}


// export default function itemPrototye(props) {
//     const {item_name,item_price,incart,id,hotel_id}=props.name;
//     return (
        
//     )
// }
