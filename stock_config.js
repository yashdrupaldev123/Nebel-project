Drupal.behaviors.myBehavior = {
        attach: function (context, settings) {
                let currentLangcode = location.pathname.split('/')[1];

                let selectedVariationElement = document.querySelector('.selected-variation');
                console.log(selectedVariationElement);
                if (selectedVariationElement != null) {
                        //getting current vID from route
                        let variationId = location.href.split('?v=')[1];
                        // console.log(variationId);
                        if (variationId != null) {
                                if (settings.stock_data != null) {
                                        settings.stock_data.forEach((v) => {
                                                if (v.variation_id == variationId) {
                                                        selectedVariationElement.innerText = v.variation_title;
                                                }
                                        });
                                }
                        }
                        else {
                                selectedVariationElement.innerText = drupalSettings.first_variation;
                        }
                }

                // let quantityInput = document.querySelector('#edit-quantity-0-value');

                // let quantityMinusBtn = document.querySelector('#edit-quantity-minus');
                // if(quantityInput!=null){
                //         if(quantityMinusBtn!=null){
                //                 quantityMinusBtn.addEventListener('click',(e)=>{
                //                         console.log("value:" + quantityInput.value);
                //                 });  
                //         }
                // }

                let mainPrice = document.querySelector('.field--type-commerce-price .field__item:last-child');
                if (mainPrice != null) {
                        let price = mainPrice.innerText;
                        if (currentLangcode == 'de') {
                                mainPrice.innerText = price.replace('.', ',');
                        }
                }

                let colorPalettes = document.querySelectorAll("form.commerce-order-item-add-to-cart-form .form-item-purchased-entity-0-attributes-attribute-color > input[type='radio']");
                let formatWrapper = document.querySelector('form.commerce-order-item-add-to-cart-form .form-item-purchased-entity-0-attributes-attribute-select-format select');
                let quantityWrapper = document.querySelector('form.commerce-order-item-add-to-cart-form .price-quantity-wrapper');
                let thicknessWrapper = document.querySelector('form.commerce-order-item-add-to-cart-form .form-item-purchased-entity-0-attributes-attribute-select-materials select');
                let typeWrapper = document.querySelector('form.commerce-order-item-add-to-cart-form .form-item-purchased-entity-0-attributes-attribute-type select');


                if (colorPalettes != null) {
                        if (formatWrapper != null)
                                formatWrapper.disabled = true;
                        if (typeWrapper != null)
                                typeWrapper.disabled = true;
                        if (thicknessWrapper != null) {
                                thicknessWrapper.disabled = true;
                        }
                        if (quantityWrapper != null) {
                                quantityWrapper.classList.add('out-of-stock-item')
                                let allQuantityInputs = quantityWrapper.querySelectorAll('input');
                                if (allQuantityInputs != null) {
                                        allQuantityInputs.forEach((inputItem) => {
                                                inputItem.disabled = true;
                                        });
                                }

                        }

                        if (settings.stock_data != null && Array.isArray(settings.stock_data)) {

                                for (let i = 0; i != settings.stock_data.length; i++) {

                                        if (settings.stock_data[i].stock == 0) {

                                                if (colorPalettes[i] != null) {
                                                        colorPalettes[i].disabled = true;
                                                        colorPalettes[i].classList.add('out-of-stock-item');
                                                }
                                        }

                                        for (let i = 0; i != settings.stock_data.length; i++) {
                                                if (colorPalettes[i] != null) {

                                                        if (colorPalettes[i].checked && settings.stock_data[i].stock != 0) {

                                                                if (formatWrapper != null)
                                                                        formatWrapper.disabled = false;

                                                                if (typeWrapper != null)
                                                                        typeWrapper.disabled = false;

                                                                if (thicknessWrapper != null) {
                                                                        thicknessWrapper.disabled = false;
                                                                }

                                                                if (quantityWrapper != null) {
                                                                        quantityWrapper.classList.remove('out-of-stock-item')
                                                                        let allQuantityInputs = quantityWrapper.querySelectorAll('input');
                                                                        if (allQuantityInputs != null) {
                                                                                allQuantityInputs.forEach((inputItem) => {
                                                                                        inputItem.disabled = false;
                                                                                });
                                                                        }

                                                                }


                                                        }
                                                } else {

                                                        if (formatWrapper != null)
                                                                formatWrapper.disabled = false;

                                                        if (typeWrapper != null)
                                                                typeWrapper.disabled = false;

                                                        if (thicknessWrapper != null) {
                                                                thicknessWrapper.disabled = false;
                                                        }

                                                        if (quantityWrapper != null) {
                                                                quantityWrapper.classList.remove('out-of-stock-item')
                                                                let allQuantityInputs = quantityWrapper.querySelectorAll('input');
                                                                if (allQuantityInputs != null) {
                                                                        allQuantityInputs.forEach((inputItem) => {
                                                                                inputItem.disabled = false;
                                                                        });
                                                                }

                                                        }

                                                }

                                        }

                                }




                        }

                }

        }

};





