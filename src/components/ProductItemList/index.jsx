import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormatterService } from "../../services/Formatter.service";

import "./style.css"

export class ProductItemList extends Component{

    constructor(param){
        super(param);
        this.state = {
            product: {}
        };
    }

    componentDidMount(){
        let product = this.props.product;
        this.setState({product});
    }
  
    render(){
        const {product} = this.state;
        return (
            <li className="product-item  mdl-grid" >
                <div className="mdl-cell mdl-cell--12-col-phone mdl-cell--2-col mdl-cell--4-col-tablet product-item--img">
                    <img alt="foto do produto" src={product.thumbnail} />
                </div>
                
                <div className="mdl-cell mdl-cell--12-col-phone mdl-cell--10-col mdl-cell--8-col-tablet">
                    <h5>{product.title}</h5>
                    <span>R$ {FormatterService.formatPrice(product.price)}</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <span>{FormatterService.formatSold(product.sold_quantity)}</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <Link to={`/product/${product.id}`}>mais informações</Link>
                </div>
            </li>
        );
    }
}