
let form = document.querySelector('.BMD');
let SendBtn = form.querySelector('.SendBtn');

let nameBMD = form.querySelector('.nameBMD');
let emailBMD = form.querySelector('.emailBMD');
let messageBMD = form.querySelector('.messageBMD');
let fields = form.querySelectorAll('.field');                                             
                                                
function SendForm(e){
    let errors = form.querySelectorAll('.error');
        for(let i =0;i<errors.length;i++){
            errors[i].remove();
        }
        let accepts = form.querySelectorAll('.accept');
        for(let i =0;i<accepts.length;i++){
            accepts[i].remove();
        }                                      
            for(let i=0; i<fields.length; i++) {
                if(!fields[i].value){
                    console.log('Empty fields', fields[i]);
                    let error = document.createElement('div');
                        error.className = 'error';
                        error.style.color = 'red';
                        error.innerHTML = 'Cant be empty';
                        form[i].parentElement.insertBefore(error, fields[i]);
                } else{ 
                                                                                        
                    let accept = document.createElement('div');
                        accept.className = 'accept';
                        accept.style.color = 'white';
                        //accept.innerHTML = 'Success :)';
                        form[i].parentElement.insertBefore(accept,fields[i]);
                    }
            }
            let counter = 0;
                for(let i=0; i<fields.length; i++) {
                    if(fields[i].value) counter++; 
                        console.log(fields[i].value);                                                                     
                }
                if(counter!=fields.length) {                                                                     
                        e.preventDefault();       
                    }else{
                        console.log("ok");                                                                 
                    }                                                          
    }                                            
    let sendButton = document.BMD.send;                                                    
    sendButton.addEventListener("click", SendForm);