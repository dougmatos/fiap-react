import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { ProductService } from "../../services/Product.service";
import './style.css'
import { FormatterService } from "../../services/Formatter.service";

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            data: null
        };
    }

    componentDidMount (){
        ProductService.getById(this.state.id)
            .then(product => this.setState({data: product}))
            .catch(err => alert(err));
    }    

    render() {
        const { data } = this.state;
        if(!data) return (<div>Carregando...</div>);

        return (
            <Fragment>
                <div className="mdl-grid">
                    <div className="demo-card-wide mdl-cell mdl-cell--12-col mdl-card mdl-shadow--3dp"> 
                        <div className="mdl-grid">
                            <div className="mdl-cell mdl-cell--12-col">
                                <Link to={`/`}>Voltar para a busca</Link>
                            </div>
                            <div className="mdl-cell mdl-cell--12-col-phone mdl-cell--4-col-desktop mdl-cel--1-offset-desktop product--image">
                                <img alt="imagem do produto" src={data.pictures !== undefined ? data.pictures[0].secure_url : ""} />
                            </div>
                            <div className="mdl-cell mdl-cell--12-col-phone  mdl-cell--7-col-desktop">
                                <h2 className="mdl-layout__title">{data.title}</h2>
                                <p style={{fontWeight: "bold",fontSize: "2em", margin: "30px 0 50px 0"}}>R$ {FormatterService.formatPrice(data.price)}</p>
                                <a href={data.permalink} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-shadow--2dp mdl-color--blue mdl-color-text--accent-contrast">
                                    Comprar
                                </a>
                                <p style={{fontSize:"11px", textAlign:"justify"}}>{data.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Product;