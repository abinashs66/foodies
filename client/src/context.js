import React, { Component } from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const ProductContext = React.createContext();

class ProductProvider extends Component {
    constructor()
    {          
        super();
        this.state={
            hotels:[],
            megha:[],
            greencastle:[],
            geetanjali:[],
            cart:[],
            cartTotal:0,
            search:[],
            LoginStatus:false,
            userDetails:[],
            address:[],
            search:[],

            MenuLoadingStatus:true,
            HotelsLoadingStatus:true
        }
    }
    componentDidMount(){
        this.checkLoginStatus();
        this.getHotelsData();
        this.getDataFromServer();
        this.getUserDetails();
        this.getUserAddress();     
    }

    getHotelsData= async ()=>{
        try{
            let result=await axios.get(`https://ffoodieess.herokuapp.com/getHotels`);
            
            if(result.data === "CANNOT CONNECT TO DATABASE")
            {
                toast.error("Server Unreachable");
                this.setState({HotelsLoadingStatus:false});
            }
            else{
                this.setState({hotels:result.data},
                    ()=>{
                        this.setState({HotelsLoadingStatus:false})
                    });
            }
            }
                catch(e){
                     toast.error("Network Error");
                    }
    }
    retreiveCart =(rd)=>{
        let storedcart=JSON.parse(localStorage.getItem("cart"));
        
        if(storedcart)
        {
            this.setState({cart:storedcart},()=>{this.addTotals()});

            let tempmenu=[...this.state.megha,...this.state.geetanjali,...this.state.greencastle]
    
            storedcart.map(cartitem=>{
                tempmenu.map(allmenu=>{
                    if(allmenu.id===cartitem.id){
                        allmenu.incart=true;
                        allmenu.item_count=1;
                        allmenu.item_total=allmenu.item_count*allmenu.item_price;
                    }
                })
            })
    
        }
        else{
            rd.push("/cart");
        }
    }

    setSearch = (event)=>{
        let data=event.target.value.toLowerCase();

        if(data==""){
                this.setState({
                    search:[]
                })
        }
        else{
            let temp1=[...this.state.megha,...this.state.geetanjali,...this.state.greencastle]
            let searchedItems=temp1.filter(item=>item.item_name.includes(data));

            this.setState({
            search:searchedItems
            });
         }
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
            this.setState({LoginStatus:false})
        }
        else{
            let userdata= await axios.get("https://ffoodieess.herokuapp.com/userDetails",{headers:
                                                                                {
                                                                                    "token":token
                                                                                }
                                                                               });
            this.setState({userDetails:userdata.data});
        }

    }
    getUserAddress= async ()=>{
        const token=localStorage.getItem("token");
        if(token){
            const address=await axios.get("https://ffoodieess.herokuapp.com/userDetails/address",{ headers:
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
        let megha= await axios.get("https://ffoodieess.herokuapp.com/getData",{params:{"menu":"menu_megha"}});
        //let geetanjali= await axios.get("https://ffoodieess.herokuapp.com/getData",{params:{"menu":"menu_geetanjali"}});
        //let greencastle= await axios.get("https://ffoodieess.herokuapp.com/getData",{params:{"menu":"menu_greencastle"}});

        this.setState({
            megha:megha.data,
            //geetanjali:geetanjali.data,
            //greencastle:greencastle.data,
            cart:[]
        },()=>{this.setState({MenuLoadingStatus:false});console.log(this.state.geetanjali)});
    }
    login = async (e,uname,upass,rd)=>{
                e.preventDefault();
                await axios.post("https://ffoodieess.herokuapp.com/login",{"uname":uname,"upass":upass}).then((posRes)=>{
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
                            toast.warn("Username or Password is Wrong")
                        }
                        },(errRes)=>{
                                 toast.error("Unable to Connect..Try Again Later");
                         });
       }

       logout=()=>{
           localStorage.clear();
           window.history.go("/");
       }

       deleteAddress =async (id)=>{
            if(window.confirm("Are You Sure ??"))
            {
                const token=localStorage.getItem("token");
                try{
                    let status=await axios.delete("https://ffoodieess.herokuapp.com/address/deleteAddress",{headers:
                    {
                        "token":token,
                        "id":id

                    }
                    });
                            if(status.data.affectedRows>0){
                            toast.success("Address Deleted !!");
                            this.getUserAddress();

                            }
                            else{
                            toast.error("Cannot Delete Address");
                     }
                  }
                  catch(e){
                     toast.error("Network Error")
                  }
            }
       }
       addAddress=async (addType,address)=>{
         const id=this.state.userDetails[0].id;
         const token=localStorage.getItem("token");

            try{
                let status=await axios.post("https://ffoodieess.herokuapp.com/address/addAddress",
                {"addType":addType , "address":address , "id":id},
                {headers:
                        {
                            "token":token
                        }
                 }
                        );
                if(status.data.affectedRows>0){
                toast.success("Address Added !!");
                this.getUserAddress();
            
                 }
                    else{
                    toast.info("Cannot Add Address");
                    }                     

            }
            catch(e){
                    toast.error("Network Error !!!");
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
          clearCart =()=>{
            this.setState({cart:[],cartTotal:0},()=>{
                this.getDataFromServer();this.addTotals()})
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
            this.setState({cartTotal:total},
                ()=>{
                    if(this.state.cartTotal===0)
                    {localStorage.removeItem("cart")}
                })  

            localStorage.setItem("cart",JSON.stringify(this.state.cart));
          }
       submitOrder = async (address,phone,rd)=>{
            if(address==="")
            {
                toast.warn("Please Select an Address");
                rd.push("/placeorder");
            }
            else{   
                    this.setState(()=>{
                        return {OrderPlacedStatus:true}
                    });
                    let orderText="";
                    let tempCart=[...this.state.cart];
                    tempCart.map(el=>{
                        orderText=orderText+`${el.hotel_name}--${el.item_name} x ${el.item_count} = ${el.item_total}<<-->>`;
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
                        try{
                            let status=await axios.post("https://ffoodieess.herokuapp.com/orders/placeorder",
                            record,
                            {headers:
                                    {
                                        "token":token
                                    }
                            }
                                    )
                                    if(status.data.affectedRows>0){
                                        this.setState({OrderPlacedStatus:true})
                                        toast.success("Order Placed");
                                        this.clearCart();
                                        rd.push("/orders");
                                        }
                                    else{
                                              toast.error("Cannot Place Order");
                                         }                     
                            }
                        catch(e){
                            toast.error("Network Error !!!")
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
            setSearch:this.setSearch,
            retreiveCart:this.retreiveCart,
            getHotelsData:this.getHotelsData
        }}>
            {this.props.children}
        </ProductContext.Provider>
    )
}
}

const ProductConsumer=ProductContext.Consumer;

export { ProductProvider,ProductConsumer } ;


