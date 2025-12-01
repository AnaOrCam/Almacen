export class Product{   

    constructor(id,name, price, units=0){
        this.id=id;
        this.name=name;
        this.price=price;
        this.units=units;
    }

    get getId(){
        return this.id;
    }

    get getName(){
        return this.name;
    }

    set setName(name){
        this.name=name;
    }

    get getPrice(){
        return this.price;
    }

    set setPrice(price){
        this.price=price;
    }

    get getUnits(){
        return this.units;
    }

    set setUnits(units) {
        this.units=units;
    }


    plusUnits(){
        this.units++;
    }

    minusUnits(){
        if (this.units>0){
            this.units--;
            return true;
        }
        else return false;
    }

    productImport(){
        return this.units*this.price;
    }

    toString(){
        return `${this.getName} (${this.getUnits}): ${this.getPrice}€/u => ${this.productImport().toFixed(2)}€`;
    }
}
