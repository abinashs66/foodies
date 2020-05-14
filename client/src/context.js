import React, { Component } from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const port=process.env.PORT || 8080;

toast.configure();

const ProductContext = React.createContext();

class ProductProvider extends Component {
    constructor()
    {  
        super();
        this.state={
            megha:[],
            greencastle:[],
            geetanjali:[],
            cart:[],
            cartTotal:0,
            search:[],
            LoginStatus:true,
            userDetails:[],
            address:[]
        }
    }
    componentDidMount(){
        this.checkLoginStatus();
        this.getDataFromServer();
        this.getUserDetails();
        this.getUserAddress();
    }
    checkLoginStatus =()=>{
        const token=localStorage.getItem("token");
        if(token)
        {
            this.setState({LoginStatus:true})
        }
    }
    getUserDetails=async ()=>{
        const token=localStorage.getItem("token");
        if(!token){
            //this.setState({LoginStatus:false})
            this.setState({LoginStatus:true})

        }
        else{
            let userdata= await axios.get(`http://localhost:${port}/userDetails`,{headers:
                                                                                {
                                                                                    "token":token
                                                                                }
                                                                               });
            console.log(userdata);
            this.setState({userDetails:userdata.data},()=>{console.log(this.state.userDetails)})
        }

    }
    getUserAddress= async ()=>{
        const token=localStorage.getItem("token");
        if(token){
            const address=await axios.get(`http://localhost:${port}/userDetails/address`,{ headers:
                                                                                        {
                                                                                            "token":token
                                                                                        }
                                             });

            if(address.data !="CANNOT CONNECT TO DATABASE" || address.data !="Invalid Token" ||address.data !="ACCESS DENIED")
            {
            this.setState({"address":address.data});
            }
        }
    }
    getDataFromServer = async ()=>{
        let megha= await axios.get(`https://ffoodieess.herokuapp.com/getData`,{params:{"menu":"menu_megha"}});
        // let geetanjali= await axios.get(`http://localhost:${port}/getData`,{params:{"menu":"menu_geetanjali"}});
        // let greencastle= await axios.get(`http://localhost:${port}/getData`,{params:{"menu":"menu_greencastle"}});

        this.setState({
            megha:megha.data,
            // geetanjali:geetanjali.data,
            // greencastle:greencastle.data,
            cart:[]
        });
    }
    login = async (e,uname,upass,rd)=>{
                e.preventDefault();
                await axios.post(`https://ffoodieess.herokuapp.com:${port}/login`,{"uname":uname,"upass":upass}).then((posRes)=>{
                        if(posRes.data!="TRY AGAIN")
                        {
                            localStorage.setItem("token",posRes.data.token);
                            this.setState({
                                LoginStatus:true
                            },()=>{this.getUserDetails();this.getUserAddress()})
                            rd.push("/home");
                            // window.history.go("/home");

                        }
                        else{
                            toast("Username or Password is Wrong")
                        }
                        },(errRes)=>{
                                 toast("Sorry for the Inconveience");
                         });
       }

       logout=()=>{
           localStorage.clear();
            window.history.go("/");
       }

       deleteAddress =async (id)=>{
            if(window.confirm("Are You Sure ??")){
                const token=localStorage.getItem("token");

            let status=await axios.delete(`http://localhost:${port}/address/deleteAddress`,{headers:
                                                                                                        {
                                                                                                            "token":token,
                                                                                                            "id":id

                                                                                                        }
                                                                                        });
            if(status.data.affectedRows>0){
                toast("Address Deleted !!");
                this.getUserAddress();

            }
            else{
                toast("Cannot Delete Address");
            }
            }
       }
       addAddress=async (addType,address)=>{
         const id=this.state.userDetails[0].id;
         const token=localStorage.getItem("token");
         let status=await axios.post(`http://localhost:${port}/address/addAddress`,
                            {"addType":addType , "address":address , "id":id},
                            {headers:
                                    {
                                        "token":token
                                    }
                             }
                                    );
                    if(status.data.affectedRows>0){
                        toast("Address Added !!");
                        this.getUserAddress();
                        
                        }
                         else{
                              toast("Cannot Add Address");
                    }                     
              
          }
        addToCart =(id,hotel_id)=>{
            switch(hotel_id)
            {
                case 1:
                        { 
                            let tempState=[...this.state.greencastle];
                            let found=tempState.find(item =>item.id === id)
                            found.incart=true;
                            found.item_count+=1;
                            found.item_total=found.item_count*found.item_price;
                            this.setState({
                            greencastle:tempState,cart:[...this.state.cart,found]
                            },()=>{this.addTotals()})
                        }
                        break;
                case 2:
                    {
                        let tempState=[...this.state.geetanjali];
                        let found=tempState.find(item =>item.id === id)
                        found.incart=true;
                        found.item_count+=1;
                        found.item_total=found.item_count*found.item_price;
                        this.setState({
                        geetanjali:tempState,cart:[...this.state.cart,found]
                        },()=>{this.addTotals()}) 
                    }
                    break;
                case 3:
                    {
                        let tempState=[...this.state.megha];
                        let found=tempState.find(item =>item.id === id)
                        found.incart=true;
                        found.item_count+=1;
                        found.item_total=found.item_count*found.item_price;
                        this.setState({
                        megha:tempState,cart:[...this.state.cart,found]
                        },()=>{this.addTotals()}) 
                    }
                    break;
            }
                      

          }
          increment = (id)=>{
            let tempCart=[...this.state.cart];
            let foundItem=tempCart.find(item=>item.id===id);
            foundItem.item_count+=1;
            foundItem.item_total=foundItem.item_count*foundItem.item_price;
    
            this.setState({cart:tempCart},()=>{this.addTotals()})
    
                    
          }
          decrement = (id)=>{
            let tempCart=[...this.state.cart] ;
            let found=tempCart.find(item =>item.id===id);
            found.item_count-=1;
            if(found.item_count===0){
                this.removeItem(id,found.hotel_id);
            }
            else{
                found.item_total=found.item_count*found.item_price;
                this.setState({cart:tempCart},()=>{this.addTotals()})
            }

          }
          removeItem =(id,hotel_id)=>{
            let tempCart=[...this.state.cart];
            let fliteredArray=tempCart.filter((item)=>item.id!=id);
    
            switch(hotel_id){
                case 1:
                    {
                        let tempMenuDetails=[...this.state.greencastle];
                        let foundItem=tempMenuDetails.find(item =>item.id === id)
                        foundItem.incart=false;
                        foundItem.item_count=0;
                        foundItem.item_total=0;
                        this.setState({greencastle:tempMenuDetails,cart:fliteredArray},()=>{this.addTotals()})
                    }
                    break;
                case 2:
                    {
                        let tempMenuDetails=[...this.state.geetanjali];
                        let foundItem=tempMenuDetails.find(item =>item.id === id)
                        foundItem.incart=false;
                        foundItem.item_count=0;
                        foundItem.item_total=0;
                        this.setState({geetanjali:tempMenuDetails,cart:fliteredArray},()=>{this.addTotals()})
                    }
                    break;
                case 3:
                    {
                        let tempMenuDetails=[...this.state.megha];
                        let foundItem=tempMenuDetails.find(item =>item.id === id)
                        foundItem.incart=false;
                        foundItem.item_count=0;
                        foundItem.item_total=0;
                        this.setState({megha:tempMenuDetails,cart:fliteredArray},()=>{this.addTotals()})
                    }
                    break;
            }
    
              
          }

          addTotals =()=>{
            let total=0;
            this.state.cart.map((element)=>{
                total=total+element.item_total;
            })
            this.setState({cartTotal:total})    
          }
       submitOrder = async (address,phone,rd)=>{
            if(address==="")
            {
                toast("Please Select an Address");
                rd.push("/placeorder");
            }
            else{
                    let orderText="";
                    let tempCart=[...this.state.cart];
                    tempCart.map(el=>{
                        orderText=orderText+`${el.hotel_name}::${el.item_name}*${el.item_count}::${el.item_total}<<-->>`;
                    })
                        let record={
                                    customer_name:this.state.userDetails[0].cust_name,
                                    user_order:orderText,
                                    price:this.state.cartTotal,
                                    address:address,
                                    phone_number:this.state.userDetails[0].phone_no,
                                    extra_number:phone,
                                    user_id:this.state.userDetails[0].id

                        }
                const token=localStorage.getItem("token");
                let status=await axios.post("http://localhost:8080/orders/placeorder",
                                   record,
                                   {headers:
                                           {
                                               "token":token
                                           }
                                    }
                                           );
                           if(status.data.affectedRows>0){
                               toast("Order Placed");
                               rd.push("/home");
                               
                               }
                                else{
                                     toast("Cannot Place Order");
                           }                     
               
            }
       }

render() {
    return (
        <ProductContext.Provider   value={{
            ...this.state,
            login:this.login,
            logout:this.logout,
            deleteAddress:this.deleteAddress,
            addAddress:this.addAddress,
            addToCart:this.addToCart,
            increment:this.increment,
            decrement:this.decrement,
            removeItem:this.removeItem,
            submitOrder:this.submitOrder,
            // clearCart:this.clearCart,
            // setSearch:this.setSearch
        }}>
            {this.props.children}
        </ProductContext.Provider>
    )
}
}

const ProductConsumer=ProductContext.Consumer;

export { ProductProvider,ProductConsumer } ;


