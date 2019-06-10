import "./style.css";
import React, { Component  } from "react";

import "./style.css";

export class TextFieldSearch extends Component{

    constructor(param){
        super(param);
        this.state = { value: "" };
    }

    componentDidMount(){
        let value = this.props.value || sessionStorage.getItem("q-search");
        if (value) this.setState({ value: value }, () => this.doSearch());
    }

    delayKey;
    doSearch(){
        clearTimeout(this.delayKey);
        this.delayKey = setTimeout(() => this.props.onTextChange(this.state.value), 600);
    }
    
    handleChange(event){
        this.setState({ value: event.currentTarget.value }, () => {
            sessionStorage.setItem("q-search", this.state.value);
            this.doSearch();
        });
    }

    render(){
        return(
            <input type="text" className="text-field-search" value={this.state.value} 
                onChange={event => this.handleChange(event)} />
        );
    }

}
