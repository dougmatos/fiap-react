import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { isTemplateElement } from '@babel/types';

class Search extends Component {

    constructor(){
        super();
        this.onSearch = this.onSearch.bind(this);

        this.state = {
            data: []
        };
    }

    onSearch(event){

        const value = event.currentTarget.value;

        if(value.length === 0){
            this.setState({ data: [] });
        } else if(value.length > 3){
            axios.get(`https://api.mercadolibre.com/sites/MLB/search?q=${value}`)
            .then((data) => this.setState({ data: data.data.results }));
        }
    }

    renderItem(item){
        return(
            <li key={item.id}>
                <span>{item.id}</span> &nbsp;&bull;&nbsp;
                <span>{item.title}</span>
                &nbsp;|&nbsp;
                <Link to={`/product/${item.id}`}>Abrir o produto</Link>
            </li>
        );
    }


    render() {

        const { data } = this.state;

        return (
            <div className={"demo-card-wide mdl-card mdl-shadow--3dp"} style={{margin: "2%", width: "94%", padding: '2%'}}> 
                <label>Digite no campo abaixo o que você quer procurar</label>
                <input type="text" onChange={ this.onSearch } style={{width: "94%", padding: "2%", marginTop: '10px', fontSize: "16px"}} />
                
                <ul>
                {(data || []).map(this.renderItem)}
                </ul>
                
            </div>
        );
    }
}

export default Search;