import {Product} from "./Product.js";

export class Store{
    constructor(id){
        this.id=id;
        this.products=[];
    }

    findProduct(cod){
        let auxProduct;
        this.products.forEach(product => {if (product.getId==cod) auxProduct=product});
        return auxProduct;
    }

    addProduct(id, name, price, units){
        if(this.findProduct(id)==undefined){
            let prodAux=new Product(id, name, price, units);
            this.products.push(prodAux);
            return prodAux;
        }
        return false;
    }

    delProduct(cod){
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id==cod && this.products[i].units==0){
                if(confirm("¿Seguro que quieres borrar este producto?")){
                this.products.splice(i,1);
                return true;
                }
            }  
        }
        return false;
    }

    changeProductUnits(cod,sign){
        let productChanged;
        this.products.forEach(product => {
            if (product.getId==cod) {
                if(sign=='plus'){
                    product.plusUnits();
                    productChanged= product;
                }else if(sign=='minus'){
                    product.minusUnits();
                    productChanged= product;
                }
            }
        })
        return productChanged;
    }

    editProduct(id,name,price,units){
        let auxProduct=this.findProduct(id);
        if(auxProduct!=undefined){
            if(name!=auxProduct.getName){
                this.products.forEach(product => {if (product.id==id) product.setName=name});
            }
            if(price!=auxProduct.getPrice){
                this.products.forEach(product => {if (product.id==id) product.setPrice=price});
            }
            if(units!=auxProduct.getUnits){
                this.products.forEach(product => {if (product.id==id) product.setUnits=units});
            }
            return auxProduct;
        }else{
            return false;
        }
    }

    totalImport(){
        return this.products.reduce((total,product)=>(total+=product.productImport()),0).toFixed(2);
    }

    underStock(units){
        return this.products.filter(obj=>obj.units<units);
    }

    orderByUnits(){
        return this.products.sort((o1,o2)=>o2.units-o1.units);
    }

    orderByName(){
        return this.products.sort((o1,o2)=>o1.name.localeCompare(o2.name));
    }
}
