import {Store} from '../model/Store.js';
import {Product} from '../model/Product.js';
import {View} from '../view/View.js';

export class Controller{
    
    constructor(){
        this.store=new Store(1);
        this.view=new View();
        this.productsArray=[];
        this.url="http://localhost:3000/productos";
    }

    async request (url,options){
        try{
            let products= await fetch(url,options);
            if(!products.ok) throw (`Error: ${products.status}-${products.statusText}`);
            
            return await products.json();
        }catch(error){
            this.sendErrorMessage(error);
        }
    }

    async readJson(){  
        let options={
        method: 'GET', 
        headers:{'Content-Type': "application/charset=utf-8"}
        }
        let products=await this.request(this.url,options);
        this.productsArray=this.converterToProduct(products);
        this.view.renderNewProduct(this.productsArray);
    }

    async readJsonProduct(id){  
        let options={
        method: 'GET', 
        headers:{'Content-Type': "application/charset=utf-8"}
        }
        let product=await this.request(this.url+"/"+id,options);
        return new Product(product.id,product.nombre,product.precio,product.uds);
    }

    async addToJson(id,name,price,units){
        let options={
            method: 'POST',
            headers:{'Content-type': 'application/json; charset=utf-8'},
            body: JSON.stringify({
                "id":id,
                "nombre": name,
                "precio": price,
                "uds": units
            })
        }
        await this.request(this.url,options);
    }

    async deleteFromJson(id){
        let options={
            method:'DELETE',
            headers:{'Content-type': 'application/json; charset=utf-8'}
        }
        await this.request(this.url+'/'+id,options);
    }

    async editInJason(id,name,price,units){
        let options={
            method: "PATCH",
            headers:{"Content-type": "application/json; charset=utf-8"},
            body:JSON.stringify({
                'id':id,
                'nombre': name,
                'precio':price,
                'uds':units
            })
        }
        await this.request(this.url+"/"+id,options);
    }

    async editStockInJson(id,sign){
        let productToChange= await this.readJsonProduct(id);
        let units=Number (productToChange.getUnits);
        let newUnits=(sign=='plus'? units+=1 : units-=1);
        productToChange.setUnits=newUnits;
        let options={
            method:'PATCH',
            headers:{'Content-type': 'application/json; charset=utf-8'},
            body: JSON.stringify({
                'uds':newUnits
            })
        }
        await this.request(this.url+'/'+id,options);
    }

    converterToProduct(array){
        console.log(array)
        return array.map(p=>(new Product(p.id,p.nombre,p.precio,p.uds)));
    }

    addProductToStore(id, name, price, units){
        let producto=this.store.addProduct(id, name,price,units);
        if (producto){
            this.addToJson(id,name,price,units);
            this.readJson();
            this.view.renderStoreImport(this.store.totalImport());
        }else{
            this.view.renderErrorMessage("El código de ese producto ya está en uso.");
        }
    }

    async deleteProductFromStore(id){
        if (this.view.renderDelProduct(id)){
            this.deleteFromJson(id);
            this.readJson();
            this.view.renderStoreImport(this.store.totalImport());
        }else{
            this.view.renderErrorMessage('No se ha podido borrar el producto.');
        }
    }

    changeProductStock(id,sign){
        this.editStockInJson(id,sign);
        this.readJson();
        //let auxProduct=this.store.changeProductUnits(id,sign);
        //if (this.view.renderChangeStock(auxProduct) && auxProduct!=undefined){
            this.view.renderStoreImport(this.store.totalImport());
        //}else{
        //    this.view.renderErrorMessage('No se ha podido encontrar el producto.');
        //}
    }
    
    changeProductInStore(id,name,price,units){
        let product=this.store.editProduct(id,name,price,units);
        this.editInJason(id,name,price,units);
        this.readJson();
        //if (product!=false){
        //    this.view.renderEditProduct(product);
            this.view.renderStoreImport(this.store.totalImport());
        //}else{
        //    this.view.renderErrorMessage('No se ha podido encontrar el producto.');
        //}
    }

    sendErrorMessage(message){
        this.view.renderErrorMessage(message);
    }
}