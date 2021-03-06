import React, { Component } from "react";
import axios from "axios";
import ProductList from "./components/ProductList/ProductList.js";
import "./style/style.scss";
import Cart from "./components/Cart/Cart.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cart: [],
      totalItems: 0,
      totalAmount: 0,
      category: "",
      quantity: 1,
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.sumTotalItems = this.sumTotalItems.bind(this);
    this.sumTotalAmount = this.sumTotalAmount.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
  }
  // Fetch Initial Set of Products from external API
  getProducts() {
    let url =
      "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json";
    axios.get(url).then((response) => {
      this.setState({
        products: response.data,
      });
    });
  }
  componentWillMount() {
    this.getProducts();
  }

  // Add to Cart
  handleAddToCart(selectedProduct) {
    let cartItem = this.state.cart;
    let productID = selectedProduct.id;
    let productQty = selectedProduct.quantity;
    if (this.checkExistProduct(productID)) {
      let index = cartItem.findIndex((x) => x.id === productID);
      cartItem[index].quantity =
        Number(cartItem[index].quantity) + Number(productQty);
      this.setState({
        cart: cartItem,
      });
    } else {
      cartItem.push(selectedProduct);
    }
    this.setState({
      cart: cartItem,
    });
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
  }
  handleRemoveProduct(id, e) {
    let cart = this.state.cart;
    let index = cart.findIndex((x) => x.id === id);
    cart.splice(index, 1);
    this.setState({
      cart: cart,
    });
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
    e.preventDefault();
  }
  checkExistProduct(productID) {
    let cart = this.state.cart;
    return cart.some(function (item) {
      return item.id === productID;
    });
  }
  sumTotalItems() {
    let total = 0;
    let cart = this.state.cart;
    total = cart.length;
    this.setState({
      totalItems: total,
    });
  }
  sumTotalAmount() {
    let total = 0;
    let cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].price * parseInt(cart[i].quantity);
    }
    this.setState({
      totalAmount: total,
    });
  }

  //Reset Quantity
  updateQuantity(qty) {
    this.setState({
      quantity: qty,
    });
  }

  render() {
    return (
      <div className="main">
        <h1 className="main-header">Order Form</h1>
        <div className="container">
          <div className="product-side">
            <ProductList
              products={this.state.products}
              addToCart={this.handleAddToCart}
              quantity={this.state.quantity}
              updateQuantity={this.updateQuantity}
              total={this.state.totalItems}
            />
          </div>
          <div className="sidebar">
            <Cart
              total={this.state.totalAmount}
              totalItems={this.state.totalItems}
              cartItems={this.state.cart}
              removeProduct={this.handleRemoveProduct}
              updateQuantity={this.updateQuantity}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
