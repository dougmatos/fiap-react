import React, { Component, Fragment } from 'react';
import axios from 'axios'
import './style.css'

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            data: {}
        };
    }

    componentDidMount(){
        axios.all([
            axios.get(`https://api.mercadolibre.com/items/${this.state.id}`),
            axios.get(`https://api.mercadolibre.com/items/${this.state.id}/description`)    
        ]).then(([item, description]) => {
            this.setState({ 
                data: {
                    ...item.data,
                    description: description.data.plain_text
                }
            });
        }).catch((err) => {
            console.log(err);
        });
    }


    render() {

        //console.log(this.state.data);
        const { data } = this.state;
        return (
            <Fragment>
                <div class="mdl-grid">
                    <div class="demo-card-wide mdl-cell mdl-cell--12 mdl-card mdl-shadow--3dp"> 
                        <div class="mdl-grid">
                            <div class="mdl-cell mdl-cell--12-col-phone">
                                <img src={data.pictures != undefined ? data.pictures[0].secure_url : ""} />
                            </div>
                            <div class="mdl-cell mdl-cell--12-col-phone">
                                <h2 class="mdl-layout__title">{data.title}</h2>
                                <p style={{fontWeight: "bold",fontSize: "2em", margin: "30px 0 50px 0"}}>R$ {data.price}</p>
                                <p style={{fontSize:"11px", textAlign:"justify"}}>{data.description}</p>
                                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-shadow--2dp mdl-color--blue mdl-color-text--accent-contrast">
                                    Comprar
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Product;