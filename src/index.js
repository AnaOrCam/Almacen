import {Controller} from './controller/Controller.js';

const storeApp=new Controller();

// storeApp.addProductToStore('Portatil Acer Travelmate E2100', 523.60);
// storeApp.addProductToStore('Portatil Asus 5704', 679.60);
// storeApp.addProductToStore('Teclado Logitech A456', 43.60);

// storeApp.deleteProductFromStore(1);

// storeApp.changeProductStock(3,2);

// storeApp.changeProductStock(2,1);

// storeApp.deleteProductFromStore(10);

// storeApp.changeProductInStore(3,"Raton",14,4);

async function init(){
  let form=document.getElementById('newprod');
    let table=document.getElementById('table').children[1];
    let addButton=form.lastElementChild.previousElementSibling;

    await storeApp.readJson();

    addButton.addEventListener('click',(event)=>{
        event.preventDefault();
        let id=document.getElementById('id').value;
        let name=document.getElementById('name').value;
        let price= document.getElementById('price').value;
        let units= document.getElementById('units').value;

        if (!form.checkValidity()){
            let inputs=document.getElementsByTagName('input');
            for (let i = 0; i < inputs.length-2; i++) {
                inputs[i].setCustomValidity("");
                inputs[i].addEventListener('change',inputValidity);
                let div=document.createElement('div');
                div.classList.add('red');
                
                if(inputs[i].validity.patternMismatch){
                    inputs[i].setCustomValidity('El valor introducido no cumple con lo pedido.');
                }
                if(inputs[i].validity.valueMissing){
                    inputs[i].setCustomValidity('El campo es obligatorio.');
                }
                if(inputs[i].validity.tooShort){
                    inputs[i].setCustomValidity('Debes introducir al menos '+inputs[i].minLength+' caracteres.');
                }
                if(inputs[i].validity.tooLong){
                    inputs[i].setCustomValidity('Debes introducir como máximo '+inputs[i].maxLength+' caracteres.');
                }
                if(inputs[i].validity.rangeUnderflow){
                    inputs[i].setCustomValidity('El valor mínimo es '+inputs[i].min);
                }
                if(inputs[i].validity.rangeOverflow){
                    inputs[i].setCustomValidity('El valor máximo es '+inputs[i].max);
                }
                if(!inputs[i].checkValidity()){
                    inputs[i].classList.add('redBorder');
                    div.textContent=inputs[i].validationMessage;
                }

                if(!inputs[i].nextElementSibling.classList.contains('red')){
                    inputs[i].after(div);
                }else{
                    inputs[i].classList.remove('redBorder');
                    div.textContent="";
                }
            }
        }else{
            if(addButton.value=="Añadir"){
                storeApp.addProductToStore(id, name,price,units);
            }else{
            storeApp.changeProductInStore(id,name,price,units);
            document.getElementById('id').disabled=false;
            addButton.value='Añadir';
            }
            form.reset();
        }

    });

    let stockButtonPlus=document.getElementsByName("up");
        for (let i = 0; i < stockButtonPlus.length; i++) {
            stockButtonPlus[i].addEventListener('click',(e)=>{
            e.preventDefault();
            let fila=stockButtonPlus[i].closest('tr');
            let id=fila.querySelector('.idTable').textContent;
            let uds= Number (fila.querySelector('.idUds').textContent);
            let maxUnits= Number (document.getElementById('units').max);
            if(uds<maxUnits){
                storeApp.changeProductStock(id,'plus');
            }else{
                storeApp.sendErrorMessage('Se ha alcanzado el valor máximo de unidades.');
            }
            });
        }

        let stockButtonMinus=document.getElementsByName("down");
        for (let i = 0; i < stockButtonMinus.length; i++) {
            stockButtonMinus[i].addEventListener('click',(e)=>{
                e.preventDefault();
            let fila=stockButtonMinus[i].closest('tr');
            let id=fila.querySelector('.idTable').textContent;
            storeApp.changeProductStock(id,'minus');
            });
        }

    let editButton=document.getElementsByName("pen");
        for (let i = 0; i < editButton.length; i++) {
            editButton[i].addEventListener('click',()=>{
            let fila=editButton[i].closest('tr');
            let id=fila.querySelector('.idTable').textContent;
            document.getElementById('id').disabled=true;
            addButton.value='Cambiar';
            document.getElementById('id').value=id;
            document.getElementById('name').value=fila.children[1].textContent;
            document.getElementById('price').value=fila.children[3].textContent;
            document.getElementById('units').value=fila.children[2].textContent;
            
            let resetButton=form.lastElementChild;
            resetButton.addEventListener('click',(event)=>{
                event.preventDefault();
                document.getElementById('id').value=id;
                document.getElementById('name').value=fila.children[1].textContent;
                document.getElementById('price').value=fila.children[3].textContent;
                document.getElementById('units').value=fila.children[2].textContent;
            });
            });
        }

    let delButtons=document.querySelectorAll('i[name="x"]');
        for (let i = 0; i < delButtons.length; i++) {
            delButtons[i].addEventListener('click',()=>{
            let fila=delButtons[i].closest('tr');
            let id=fila.querySelector('.idTable').textContent;
            storeApp.deleteProductFromStore(id);
            }); 
        }


    function inputValidity(e){
        if(!e.target.checkValidity()){
            e.target.setCustomValidity("");
            if(e.target.validity.patternMismatch){
                e.target.setCustomValidity('El valor introducido no cumple con lo pedido.');
            }
            if(e.target.validity.valueMissing){
                e.target.setCustomValidity('El campo es obligatorio.');
            }
            if(e.target.validity.tooShort){
                e.target.setCustomValidity('Debes introducir al menos '+e.target.minLength+' caracteres.');
            }
            if(e.target.validity.tooLong){
                e.target.setCustomValidity('Debes introducir como máximo '+e.target.maxLength+' caracteres.');
            }
            if(e.target.validity.rangeUnderflow){
                e.target.setCustomValidity('El valor mínimo es '+e.target.min);
            }
            if(e.target.validity.rangeOverflow){
                e.target.setCustomValidity('El valor máximo es '+e.target.max);
            }
            e.target.nextElementSibling.textContent=e.target.validationMessage;
            
        }else{
            e.target.classList.remove('redBorder');
            e.target.nextElementSibling.textContent="";
        }
        
    }

}
window.onload=async function(){
  await init();
    
}




