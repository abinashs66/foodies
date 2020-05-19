import React, { Component } from 'react';
import "./App.css";
import Navbar from './Navbar/navbar';
import Footer from './Navbar/footer';
import Hotellist from './HotelList/hotellist';
import Megha from "./Menu/megha";
import GreenCastle from "./Menu/greencastle";
import Geetanjali from "./Menu/geetanjali";
import Cart from "./Cart/cart";
import Login from "./Login/login";
import Register from "./Login/register";
import { Switch,Route } from 'react-router-dom';
import { ProductConsumer } from './context';
import Account from './Account/account';
import Address from './Address/address';
import PlaceOrder from './Cart/placeorder';
import Orders from "./Orders/orders"
import Forgot from "./Login/forgot";
import Search from "./Search/search";

export default class App extends Component {
  render() {
    console.log("App render");
    return (
      <div className="App">
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgotpassword" component={Forgot} />
        </Switch>
        <ProductConsumer>
          { (value)=>{
                  return <div style={value.LoginStatus?{visibility:"visible"}:{visibility:"hidden"}}>
                        <Navbar />
                        <Switch>
                                <Route exact path="/home" component={Hotellist}></Route>
                                <Route exact path="/hotel/megha" component={Megha}></Route>
                                <Route exact path="/hotel/greencastle" component={GreenCastle}></Route>
                                <Route exact path="/hotel/geetanjali" component={Geetanjali}></Route>
                                <Route exact path="/cart" component={Cart}></Route>
                                <Route exact path="/placeorder" component={PlaceOrder}></Route>
                                <Route exact path="/account" component={Account}></Route>
                                <Route exact path="/address" component={Address}></Route>
                                <Route exact path="/orders" component={Orders}></Route>
                                <Route exact path="/search" component={Search}></Route>
                                <Route exact path="/changepassword" component={Forgot} />
                        </Switch>
                        <Footer />
                  </div>
          }
          }
        </ProductConsumer>
      </div>
    )
  }
}
