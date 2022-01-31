"use strict";
window.addEventListener('DOMContentLoaded', () => {

    const formTag = document.forms.validForm;
    formTag.addEventListener('submit', (EO) => {
        funBlur(EO, "develop", "develop-err");
        funBlur(EO, "name-site", "name-site-err");
        funBlur(EO, "url", "url-err");
        funBlur(EO, "email", "email-err");
        funBlur(EO, "colvo", "colvo-err");
        funBlur(EO, "date", "date-err");
        funblurCheckbox(EO);
        blurRadioInputs(EO);
        console.log("form----------validation");
    });

    const simpleInputs = document.querySelectorAll(".simple-input");
    simpleInputs.forEach((item, i) => {
        item.addEventListener('blur', funBlur);
    });

    function funBlur(EO, name = EO.target.name, err) {
        //разработчики
        EO = EO || window.event;
        switch (name) {
            case "develop":
                err = "develop-err";
                break;
            case "name-site":
                err = "name-site-err";
                break;
            case "url":
                err = "url-err";
                break;
            case "colvo":
                err = "colvo-err";
                break;
            case "date":
                err = "date-err";
                break;
            case "email":
                err = "email-err";
                break;
        }
        const input = document.querySelector("input[name=" + name + "]");
        let provInput = input.value.trim();
        input.value = provInput;


        if (name == "date") {
            var justNow = new Date();
            var a = input.value;// yyyy-mm-dd
            var year = a[0] + a[1] + a[2] + a[3];//y+y+y+y=yyyy
            var month = a[5] + a[6] - 1;//m+m=mm-1
            var day = a[8] + a[9];//d+d=dd
            var inputDate = new Date(year, month, day);
        }
        
        if (provInput == "" || provInput.length > 30 || +provInput < 0 || (inputDate > justNow)) {
            if (!input.classList.contains('error')) {
                EO.preventDefault();
                input.classList.add('error');
                input.classList.remove('noterror');
                var span = document.createElement("span");
                span.classList.add(err);
                const nameField = document.createTextNode('error');
                span.append(nameField);
                input.parentNode.parentNode.appendChild(span);
            }

        } else {
            input.classList.add('noterror');
            input.classList.remove('error');
            const sp = document.querySelector('.' + err);
            if (sp) {
                input.parentNode.parentNode.lastElementChild.remove();
            }
        }
        // console.log(EO.target.parentNode.parentNode.lastElementChild);
    }

    const inputCheckbox=document.querySelector('input[type="checkbox"]');
    inputCheckbox.addEventListener('change',funblurCheckbox);

    function funblurCheckbox(EO){
        EO.preventDefault();
        const sp = document.querySelector(".checkbox-err");
        if (sp) {
            inputCheckbox.parentNode.parentNode.lastElementChild.remove();
        }
        if(inputCheckbox.checked){
            inputCheckbox.classList.add('noterror');
            inputCheckbox.classList.remove('error');
            const sp = document.querySelector(".checkbox-err");
            if (sp) {
                inputCheckbox.parentNode.parentNode.lastElementChild.remove();
            }
        }else{
            inputCheckbox.classList.add('error');
            inputCheckbox.classList.remove('noterror');
            let span1 = document.createElement("span");
            span1.classList.add("checkbox-err");
            const text1 = document.createTextNode('error');
            span1.append(text1);
            inputCheckbox.parentNode.parentNode.append(span1);
        }
    }

    const inputRadio = document.querySelectorAll("input[type='radio']");
    const spanContentBox = document.querySelector(".span-content-box");
    inputRadio.forEach(item=>{
        item.addEventListener('change',blurRadioInputs);
    });

    function blurRadioInputs(EO){
        EO.preventDefault();
        const sp = document.querySelector(".radio-err");
        if (sp) {
            spanContentBox.parentNode.parentNode.lastChild.remove();
        }
        if(EO.target.name=="validForm"){
            var count=0;
            inputRadio.forEach(item=>{
                if(!item.checked){
                    count++;
                }
            });
            if(count==3){
                let span1 = document.createElement("span");
                span1.classList.add("radio-err");
                const text1 = document.createTextNode('error');
                span1.append(text1);
                spanContentBox.parentNode.parentNode.append(span1);
            }
        }
        if(EO.target.name == "answer" ){
               if(EO.target.value=="3"){
                   let span1 = document.createElement("span");
                   span1.classList.add("radio-err");
                   const text1 = document.createTextNode('error');
                   span1.append(text1);
                   spanContentBox.parentNode.parentNode.append(span1);
               }else{
                   const sp = document.querySelector(".radio-err");
                   if (sp) {
                       spanContentBox.parentNode.parentNode.lastChild.remove();
                   }
               }
               
           }

    }

  

});