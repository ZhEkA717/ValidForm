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
        blurTextarea(EO);
        blurSelect(EO);
        addFocusAndScroll();
        console.log("form----------validation");

    });

    function addFocusAndScroll() {
        const allErrors = document.querySelectorAll('.error');
        allErrors.forEach(item => {
            if (item.name != "answer" || item.name != "checkbox") {
                allErrors[0].focus();
                allErrors[0].scrollIntoView();
            }
        });
    }


    function addError(err, textErr, input) {
        let span = document.createElement("span");
        span.classList.add(err);
        const nameField = document.createTextNode(textErr);
        span.append(nameField);
        input.parentNode.parentNode.appendChild(span);
    }

    function removeError(err, parentAppend) {
        const sp = document.querySelector("." + err);
        if (sp) {
            parentAppend.parentNode.parentNode.lastElementChild.remove();
        }
    }

    const simpleInputs = document.querySelectorAll(".simple-input");
    simpleInputs.forEach((item, i) => {
        item.addEventListener('blur', funBlur);
    });

    function funBlur(EO, name = EO.target.name, err) {
        //разработчики, название сайта, URL сайта, дата запуска сайта,
        // посетителей в сутки,email для связи
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
                addFocusAndScroll();
                input.classList.add('error');
                input.classList.remove('noterror');
                addError(err, "error", input)
            }

        } else {
            input.classList.add('noterror');
            input.classList.remove('error');
            removeError(err, input);
        }
        // console.log(EO.target.parentNode.parentNode.lastElementChild);
    }

    const inputCheckbox = document.querySelector('input[type="checkbox"]');
    inputCheckbox.addEventListener('change', funblurCheckbox);

    function funblurCheckbox(EO) {
        // разрешить отзывы
        removeError("checkbox-err", inputCheckbox);
        if (inputCheckbox.checked) {
            inputCheckbox.classList.add('noterror');
            inputCheckbox.classList.remove('error');
            removeError("checkbox-err", inputCheckbox);
        } else {
            EO.preventDefault();
            addFocusAndScroll();
            inputCheckbox.classList.add('error');
            inputCheckbox.classList.remove('noterror');
            addError("checkbox-err", "разрешите отзыв", inputCheckbox)
        }
    }

    const inputComment = document.querySelector("textarea[name='mytext']");
    inputComment.addEventListener("blur", blurTextarea);

    function blurTextarea(EO) {
        removeError("textarea-err", inputComment);
        inputComment.value = inputComment.value.trim();
        if (inputComment.value == "") {
            EO.preventDefault();
            inputComment.classList.add("error");
            inputComment.classList.remove("noterror");
            addError('textarea-err', 'поле не может быть пустым', inputComment);

        } else {
            inputComment.classList.remove("error");
            inputComment.classList.add("noterror");
            removeError("textarea-err", inputComment);
        }
    }

    const select = document.querySelector('select');
    select.addEventListener('blur', blurSelect);
    function blurSelect(EO) {
        removeError('select-err', select);
        const option3 = document.querySelector("option[value='3']");
        if (option3.selected) {
            EO.preventDefault();
            addFocusAndScroll();
            select.classList.add("error");
            select.classList.remove("noterror");
            addError('select-err', "выбирите что-то другое", select);
        } else {
            select.classList.remove("error");
            select.classList.add("noterror");
            removeError('select-err', select);
        }
    }

    const inputRadio = document.querySelectorAll("input[type='radio']");
    const spanContentBox = document.querySelector(".span-content-box");
    inputRadio.forEach(item => {
        item.addEventListener('change', blurRadioInputs);
    });
    function blurRadioInputs(EO) {
        removeError("radio-err", spanContentBox);
        if (EO.target.name == "validForm") {
            var count = 0;
            inputRadio.forEach(item => {
                if (!item.checked) {
                    count++;
                }
            });
            if (count == 3) {
                EO.preventDefault();
                addFocusAndScroll();
                addError("radio-err", "выберите что-нибудь", spanContentBox);
            }
            const VIP = document.querySelector('input[value="3"]');
            if (VIP.checked) {
                EO.preventDefault();
                addFocusAndScroll();
                addError("radio-err", "VIP недоступен", spanContentBox);
            }
        }
        if (EO.target.name == "answer") {
            if (EO.target.value == "3") {
                EO.preventDefault();
                addFocusAndScroll();
                addError("radio-err", "VIP недоступен", spanContentBox);
            } else {
                removeError("radio-err", spanContentBox);
            }
        }
    }
});