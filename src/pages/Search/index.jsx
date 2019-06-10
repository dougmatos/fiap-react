import React, { Component } from 'react';
import { ProductService } from "../../services/Product.service";
import { TextFieldSearch } from "../../components/TextFieldSearch";
import { ProductItemList } from "../../components/ProductItemList";

import "./style.css";

class Search extends Component {

    constructor(){
        super();
        this.state = {
            data: [],
            keyWord: "",
            buscando: false
        };
    }

    onSearch(keyWord){
        this.setState({keyWord, buscando: true});
        
        ProductService.getByKeyWord(keyWord)
            .then(data => this.setState({data: data, buscando: false}))
            .catch(err => { alert(err); this.setState({buscando: false}); });
    }

    renderSearch(listItems){

        let message = (text) => (<div className="msg-busca">{text}</div>);

        if (this.state.buscando) return message(
            <span style={{fontSize:"24px"}}>Buscando... </span>
        );
        if (this.state.keyWord === "") return message(
            <span style={{ color: "#888" }}>Digite uma palavra para buscar</span>
        );
        if (listItems.length === 0) return message(
            <span>Não encontramos produtos com o texto <strong>{this.state.keyWord}</strong></span>
        );
        return (
            <ul>{listItems.map(item => <ProductItemList key={item.id} product={item} />)}</ul>
        );
    }

    render() {
        const { data } = this.state;
        return (
            <div className="mdl-grid">
                <div className="mdl-cell--12-col mdl-card mdl-shadow--3dp main-wrapper"> 
                    <TextFieldSearch onTextChange={this.onSearch.bind(this)}  />
                    {this.renderSearch(data || [])}
                </div>
            </div>
        );
    }
}

export default Search;