Drupal.behaviors.myBehavior = {
  attach: function (context, settings) {
          let currentLangcode = location.pathname.split('/')[1];

          let selectedVariationElement = document.querySelector('.selected-variation');
      
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



          let OriginalPrice = document.querySelector('.field--type-commerce-price .field__item:last-child');

          let prices = document.querySelectorAll('#edit-default-price label');

          if (OriginalPrice != null) {
                  let price = OriginalPrice.innerText;
                  if (currentLangcode == 'de') {
                          OriginalPrice.innerText = price.replace('.', ',');
                          if(prices!=null){
                                  prices.forEach((p)=>{
                                          p.innerText = p.innerText.replace('.', ',');
                                          // console.log(p.innerText);
                                  })
                          }
                  }
          }


          let quantityInput = document.querySelector('.js-form-item-quantity-0-value input[type="number"]');
          let mainPrice = document.querySelector('.field--type-commerce-price div:last-child');
          let allQuantities = document.querySelectorAll(".form-item-default-quantity label");

          let allPrices = document.querySelectorAll(".form-item-default-price label");
          if (currentLangcode == 'de') {
                  mainPrice.innerText = mainPrice.innerText.replace('.',','); 
              }
          if(quantityInput!=null){
                  
            quantityInput.addEventListener('input',(e)=>{
                  let currentQuantity = e.target.value;
                  console.log('Choosed quantity: '+parseFloat(currentQuantity))
          
          if(currentQuantity.length==0)
            {
              mainPrice.innerText = '€ '+ 0;
            }
          else{
          if(allQuantities!=null && allPrices!=null){

                if(allQuantities.length>1) {           
          for(let i=0;i!=allQuantities.length;i++){
          
            if(i === allQuantities.length - 1){
            if(parseFloat(currentQuantity) >= allQuantities[i].innerText){
              let currentPrice = parseFloat(allPrices[i].innerText.replace(',','.'));
              let currentQuantityVal  = parseFloat(currentQuantity)
              mainPrice.innerText = '€ '+(currentQuantityVal*currentPrice).toFixed(2); 
              if (currentLangcode == 'de') {
            
                  mainPrice.innerText = mainPrice.innerText.replace('.',',').replace(',00',''); 
              }
            }
            }
            else{
                  // 0 1 2 3    49
                  // console.log(parseFloat(allQuantities[i].innerText))
                  // console.log(parseFloat(allQuantities[i+1].innerText))
          if(parseFloat(currentQuantity) == parseFloat(allQuantities[i].innerText) || (parseFloat(currentQuantity) > parseFloat(allQuantities[i].innerText) && parseFloat(currentQuantity) < parseFloat(allQuantities[i+1].innerText))){
              let currentPrice = parseFloat(allPrices[i].innerText.replace(',','.'));
              console.log(currentPrice)
              let currentQuantityVal  = parseFloat(currentQuantity)
              let calculatedPrice = currentQuantityVal*currentPrice;
              console.log("Calculated price: "+calculatedPrice)
              mainPrice.innerText = '€ '+calculatedPrice; 
              if (currentLangcode == 'de') {
                 
                  mainPrice.innerText = mainPrice.innerText.replace('.',',').replace(',00',''); 
                  }
                  break;
            }
            else {
              let currentPrice = parseFloat(allPrices[i+1].innerText.replace(',','.'));
            let currentQuantityVal  = parseFloat(currentQuantity)
            mainPrice.innerText = '€ '+(currentQuantityVal*currentPrice).toFixed(2); 
            if (currentLangcode == 'de') {
                
                  mainPrice.innerText =mainPrice.innerText.replace('.',',').replace(',00',''); 
                  }
                  break;
            }
            }
          }
}else{
  let currentPrice = parseFloat(allPrices[0].innerText.replace(',','.'));
  console.log(currentPrice)
  let currentQuantityVal  = parseFloat(currentQuantity)
  mainPrice.innerText = '€ '+(currentQuantityVal*currentPrice).toFixed(2); 
  if (currentLangcode == 'de') {
      
        mainPrice.innerText =mainPrice.innerText.replace('.',',').replace(',00',''); 
        }
}
          
          
            }
          }
          
          });
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





