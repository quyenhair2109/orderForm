import React, { Component } from "react";
import PropTypes from 'prop-types';
import Product from '../Product/Product.js';

class ProductList extends Component {

    render() {
        let productsData;

        productsData = this.props.products.map(product => {
                return (
                    <Product
                        key={product.id}
                        price={product.price}
                        name={product.name}
                        image={product.image}
                        id={product.id}
                        addToCart={this.props.addToCart}
                        quantity={this.props.quantity}
                        updateQuantity={this.props.updateQuantity}
                    />
                    );
                });

        return <div className="products-wrapper">{productsData}</div>;
    }
}

ProductList.propTypes = {
    products: PropTypes.array,
}

export default ProductList;