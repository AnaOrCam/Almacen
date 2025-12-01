
export class View{

    constructor(){
        this.tabla=document.getElementById('table').children[1];
        this.msg=document.getElementById("messages");
        this.total=document.getElementById("total");
    }

    async renderNewProduct(array){ 
        array.forEach(product => {
            
        let ultimaFila=this.tabla.insertRow();
        let colId=ultimaFila.insertCell();
        colId.classList.add('idTable')
        colId.textContent=product.getId;
        let colName=ultimaFila.insertCell();
        colName.textContent=product.getName;
        let colUds=ultimaFila.insertCell();
        colUds.classList.add('idUds')
        colUds.textContent=product.getUnits;
        let colPrice=ultimaFila.insertCell();
        colPrice.textContent=product.getPrice;
        let colImport=ultimaFila.insertCell();
        colImport.textContent=product.productImport();
        let colActions=ultimaFila.insertCell();
        let div=document.createElement('div');
        div.innerHTML='<button><i name="up" class="bi bi-caret-up"></i></button>'+
                    '<button><i name="down" class="bi bi-caret-down"></i></button>'+
                    '<button><i name="pen" class="bi bi-pencil-fill"></i></button>'+
                    '<button><i name="x" class="bi bi-x-lg"></i></button>'
        colActions.append(div);
        div.classList.add('opciones');
        });
    }

    renderDelProduct(id){
        let products=this.tabla.children;
        let productExists=false;
        for (let i = 0; i < products.length; i++) {
            if (products[i].children[0].textContent==id){ 
                products[i].remove();
                productExists=true;
            }
        }
        return productExists;
    }

    renderChangeStock(product){
        let products=this.tabla.children;
        let productExists=false;
        for (let i = 0; i < products.length; i++) {
            if (products[i].children[0].textContent==product.getId){
                productExists=true;
                let actualizeUnits=products[i].children[2];
                let actualizeImport=products[i].children[4];
                products[i].replaceChild(this.createElementWithText('td',product.getUnits),actualizeUnits);
                products[i].replaceChild(this.createElementWithText('td',product.productImport()),actualizeImport);
            } 
        }
        return productExists;
    }

    renderEditProduct(product){
        let products=this.tabla.children;
        let productExists=false;
        for (let i = 0; i < products.length; i++) {
            if (products[i].children[0].textContent==product.getId){
                productExists=true;
                products[i].children[1].textContent=product.getName;
                products[i].children[2].textContent=product.getUnits;
                products[i].children[3].textContent=product.getPrice;
                products[i].children[4].textContent=product.productImport();

            } 
        }
        return productExists;
    }

    renderStoreImport(num){
        let strong=this.createElementWithText('strong','TOTAL: ')
        strong.append(num+'€');
        let totalAReemplazar=document.getElementById('total').firstChild;
        this.total.replaceChild(strong, totalAReemplazar);
    }

    renderErrorMessage(text){
        let divError=this.createElementWithText('div',text);
        let xCell=this.createElementWithText('button',"x");
        xCell.classList.add('close');
        divError.classList.add('error');
        divError.append(xCell);
        this.msg.append(divError);
        xCell.addEventListener('click',()=> divError.remove())
    }

    createElementWithText(element, text){
        let newElement=document.createElement(element);
        newElement.textContent=text;
        return newElement;
    }
}