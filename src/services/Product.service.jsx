import axios from 'axios'

export class ProductService{

    static baseApi = "https://api.mercadolibre.com";

    static getById(id){
        return new Promise((resolve, reject) =>{
            axios.all([
                axios.get(`${this.baseApi}/items/${id}`),
                axios.get(`${this.baseApi}/items/${id}/description`)
            ])
            .then(([item, description]) => resolve({...item.data, description: description.data.plain_text}))
            .catch(reject);
        });
    }

    static getByKeyWord(keyWord){
        return new Promise((resolve, reject) => {

            if(!keyWord) 
                return resolve([]);

            axios.get(`${this.baseApi}/sites/MLB/search?q=${keyWord}`)
                .then((data) => resolve(data.data.results))
                .catch(reject);

        });
    }

}