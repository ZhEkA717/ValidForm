"use strict";
window.addEventListener('DOMContentLoaded', () => {

    const formTag = document.forms.validForm;
    formTag.addEventListener('submit', (EO) => {
        EO.preventDefault();
        funBlur(EO, "develop", "develop-err");
        funBlur(EO, "name-site", "name-site-err");
        funBlur(EO, "url", "url-err");
        funBlur(EO, "email", "email-err");
        funBlur(EO, "colvo", "colvo-err");
        funBlur(EO, "date", "date-err");
        funBlur(EO, "answer", "answer-err");
        console.log("form----------validation");
    });

    const simpleInputs = document.querySelectorAll(".simple-input");
    simpleInputs.forEach((item, i) => {
        item.addEventListener('blur', funBlur);
    });

    function funBlur(EO, name = EO.target.name, err) {
        //разработчики
        EO = EO || window.event;
        EO.preventDefault();
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
            case "answer":
                err = "answer-err";
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

        if(name == "answer"){
            const inputs = document.querySelectorAll("input[name=" + name + "]");
            console.log(inputs);
        }

        if (provInput == "" || provInput.length > 30 || +provInput < 0 || inputDate > justNow) {
            if (!input.classList.contains('error')) {
                input.classList.add('error');
                input.classList.remove('noterror');
                var span = document.createElement("span");
                span.classList.add(err);
                const develop = document.createTextNode('error');
                span.append(develop);
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

});