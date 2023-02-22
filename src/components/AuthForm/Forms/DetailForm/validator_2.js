// function Validator(formSelector, _this = {}){ //ES6
export default function Validator(formSelector) {
    //ES6
    //ES5
    // if (!_this){
    //     _this = {}
    // }
    var _this = this;
    var formRules = {};

    var validatorRules = {
        required: function (value) {
            return value ? undefined : 'Please fill out this field';
        },

        email: function (value) {
            // eslint-disable-next-line
            var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return emailRegex.test(value) ? undefined : 'Please input valid email';
        },

        min: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `Must be at least ${min} characters long`;
            };
        },
    };

    var formElement = document.querySelector(formSelector);

    if (formElement) {
        var inputs = formElement.querySelectorAll('input[name][rules]');

        for (var input of inputs) {
            var rules = input.getAttribute('rules').split('|');
            for (var rule of rules) {
                var ruleFunc;
                if (rule.includes(':')) {
                    var ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                    ruleFunc = validatorRules[rule](ruleInfo[1]);
                } else {
                    ruleFunc = validatorRules[rule];
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [];
                    formRules[input.name].push(ruleFunc);
                }
            }

            input.onblur = handleValidate;
            input.oninput = handleClearErr;
        }

        function handleValidate(e) {
            var rules = formRules[e.target.name];

            for (var i = 0; i < rules.length; ++i) {
                var errMessage = rules[i](e.target.value);

                if (errMessage) {
                    handleWhenErr(e.target, errMessage);
                    break;
                }
            }

            return !errMessage;
        }

        function handleWhenErr(inputElement, message) {
            var formGroup = inputElement.closest('.form-group');
            if (formGroup) {
                var messageElement = formGroup.querySelector('.form-message');
                if (messageElement) {
                    messageElement.innerText = message;
                }

                formGroup.classList.add('invalid');
            }
        }

        function handleClearErr(e) {
            var formGroup = e.target.closest('.form-group');
            if (formGroup) {
                var messageElement = formGroup.querySelector('.form-message');
                if (messageElement) {
                    messageElement.innerText = '';
                }

                if (formGroup.classList.contains('invalid')) formGroup.classList.remove('invalid');
            }
        }

        formElement.onsubmit = function (e) {
            e.preventDefault();
            var isValid = true;

            var inputs = formElement.querySelectorAll('input[name][rules]');
            for (var input of inputs) {
                if (!handleValidate({ target: input })) {
                    isValid = false;
                }
            }

            if (isValid === true) {
                if (typeof _this.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce((values, input) => {
                        switch (input.type) {
                            case 'radio':
                                if (input.checked) {
                                    values[input.name] = input.value;
                                } else {
                                    values[input.name] = '';
                                }
                                break;
                            case 'checkbox':
                                if (input.checked) {
                                    Array.isArray(values[input.name])
                                        ? values[input.name].push(input.value)
                                        : (values[input.name] = [input.value]);
                                } else {
                                    values[input.name] = [];
                                }
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }

                        return values;
                    }, {});

                    _this.onSubmit(formValues);
                } else {
                    formElement.submit();
                }
            }
        };
    }
}
