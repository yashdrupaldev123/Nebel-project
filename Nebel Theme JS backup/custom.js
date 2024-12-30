function checkNumberInName(str) {

  if (/\d/.test(str)) {
    return str.match(/\d+/g);
  }
  else {
    return str;
  }
  // return [/\d/.test(str),'/\d/'];
}

function checkStringInName(str) { 

  const match = str.match(/[a-zA-Z]+/g);
  
  return match ? match.join('') : '';
}


let callCount = 0;
let isHandlerAttached = false;
(function ($, Drupal) {
  Drupal.behaviors.new = {
    attach: function (context, settings) {


      // Function to attach the event handler if not already attached
      function attachChangeEventHandler() {
        if (!isHandlerAttached) {

          let productAttributeList = document.querySelector('ul.product-attribute-label2');
      if(productAttributeList!=null){
    
          
          if(!$('.js-form-item-purchased-entity-0-attributes-attribute-select-format select').length==0)
                      {
         console.log($('.js-form-item-purchased-entity-0-attributes-attribute-select-format select').length);
      let productAttrFormat = document.createElement('li');
      productAttrFormat.classList.add('selected-format');
      let defaultFormatText = document.querySelector('.js-form-item-purchased-entity-0-attributes-attribute-select-format select option:first-child') ? document.querySelector('.js-form-item-purchased-entity-0-attributes-attribute-select-format select option:first-child').innerText : '';
      
      productAttrFormat.innerText = 'Formate: '+ defaultFormatText;
      productAttributeList.appendChild(productAttrFormat);
            }
        


      if(!$('.js-form-item-purchased-entity-0-attributes-attribute-type select').length==0){
        // console.log($('.js-form-item-purchased-entity-0-attributes-attribute-type select').length);
      let productAttrType = document.createElement('li');
      productAttrType.classList.add('selected-type');
      let productAttrTypeText = document.querySelector('.js-form-item-purchased-entity-0-attributes-attribute-type select option:first-child') ? document.querySelector('.js-form-item-purchased-entity-0-attributes-attribute-type select option:first-child').innerText: '';
      
      productAttrType.innerText = 'Type: '+ productAttrTypeText;
      productAttributeList.appendChild(productAttrType);
        }

        if(!$('.js-form-item-purchased-entity-0-attributes-attribute-material-thickness select').length==0){
  
        let productAttrThickness = document.createElement('li');
        productAttrThickness.classList.add('selected-thickness');
        let defaultThicknessText = document.querySelector('.js-form-item-purchased-entity-0-attributes-attribute-material-thickness select option:first-child') ? document.querySelector('.js-form-item-purchased-entity-0-attributes-attribute-material-thickness select option:first-child').innerText: '';
        
        productAttrThickness.innerText = 'Materialstärke: '+ defaultThicknessText;
        productAttributeList.appendChild(productAttrThickness);
        }
          // Set the flag to true to prevent reattaching the event handler
          isHandlerAttached = true;
        }
      }
    }
    
      // Call the function to attach the event handler
      attachChangeEventHandler();
      
      $('.js-form-item-purchased-entity-0-attributes-attribute-select-format select').on('change', function (e) {

        let selectedFormat = $('.js-form-item-purchased-entity-0-attributes-attribute-select-format select').val();
        let selectedFormatText = '';

        if($('.js-form-item-purchased-entity-0-attributes-attribute-select-format select option')!=null){
          $('.js-form-item-purchased-entity-0-attributes-attribute-select-format select option').each((index, item)=>{
            if(item.value == selectedFormat){
              selectedFormatText = item.innerText;
            }
          })
        }
        let selectedFormatLi = document.querySelector('ul.product-attribute-label2 li.selected-format');
     
    
    
        selectedFormatLi.innerText = 'Formate: ' + selectedFormatText;

        // Perform any additional actions with the selected value
      });

      $('.js-form-item-purchased-entity-0-attributes-attribute-material-thickness select').on('change', function () {
        let selectedThickness = $('.js-form-item-purchased-entity-0-attributes-attribute-material-thickness select').val();
        let selectedThicknessText = '';
        if ($('.js-form-item-purchased-entity-0-attributes-attribute-material-thickness select option') != null) {
          $('.js-form-item-purchased-entity-0-attributes-attribute-material-thickness select option').each((index, item) => {
            if (item.value == selectedThickness) {
              selectedThicknessText = item.innerText;
            }
          });
        }
        let selectedThicknessLi = document.querySelector('ul.product-attribute-label2 li.selected-thickness');
        selectedThicknessLi.innerText = 'Materialstärke: ' + selectedThicknessText;
     
        // console.log('Selected value:', selectedThickness);
        // Perform any additional actions with the selected value
      });


          $('.js-form-item-purchased-entity-0-attributes-attribute-type select').on('change', function () {
            let selectedType = $('.js-form-item-purchased-entity-0-attributes-attribute-type select').val();
            let selectedTypeText = '';
            if ($('.js-form-item-purchased-entity-0-attributes-attribute-type select option') != null) {
              $('.js-form-item-purchased-entity-0-attributes-attribute-type select option').each((index, item) => {
                if (item.value == selectedType) {
                  selectedTypeText = item.innerText;
                }
              });
            }
            let selectedTypeLi = document.querySelector('ul.product-attribute-label2 li.selected-type');
            selectedTypeLi.innerText = 'Type: ' + selectedTypeText;
         
            // console.log('Selected value:', selectedThickness);
            // Perform any additional actions with the selected value
          });

      
     callCount++;
  

  }
  };
})(jQuery, Drupal);

(function ($, Drupal) {
  Drupal.behaviors.custom = {
    attach: function (context, settings) {

      // console.log();

      let format = document.querySelector('.js-form-item-purchased-entity-0-attributes-attribute-select-format select');
      let thickness = document.querySelector('.js-form-item-purchased-entity-0-attributes-attribute-material-thickness select');
if(format!=null){
      format.addEventListener('change',(e)=>{
        // console.log(e.target.value);
      })
    }

    if(thickness!=null){
      thickness.addEventListener('change',(e)=>{
        // console.log(e.target.value);
      })
    }
      let colorPalettes = document.querySelectorAll('.commerce-order-item-add-to-cart-form .js-form-type-radio');
      const imgTop = document.querySelector('.product-image-top img');

      if (colorPalettes != null) {
        colorPalettes.forEach((item, index) => {
          if (item.querySelector('img') != null) {
            if (item.querySelector('input').checked) {
              imgTop.src = item.querySelector('img').src;
            }

            if (item.querySelector('.field--name-name') != null) {
              item.querySelector('.field--name-name').innerText = checkNumberInName(item.querySelector('.field--name-name').innerText);
            }
          }
        })
      }
    }
  };
})(jQuery, Drupal);

(function ($, Drupal, once) {
  Drupal.behaviors.myModuleBehavior = {
    attach: function (context, settings) {
      once('myModuleBehavior', $('#quantity_button_area', context)).forEach(function (element) {
        var $quantityInput = $('#quantity_button_area').find('input[type="number"]');
        $('#quantity_button_area .plus_button').click(function () {
          var currentValue = parseInt($quantityInput.val());
          $quantityInput.val(currentValue + 1).trigger('change');
        });
        $('#quantity_button_area .minus_button').click(function () {
          var currentValue = parseInt($quantityInput.val());
          if (currentValue > 1) {
            $quantityInput.val(currentValue - 1).trigger('change');
          }
        });
      });


    }
  };
})(jQuery, Drupal, once);


document.addEventListener('DOMContentLoaded', function () {
  if (this.location.pathname.includes('/product')) {
    // const imgTop = document.querySelector('.product-image-top img');
    // const imgBottom = document.querySelectorAll('.product-image-bottom img');
    // const imgBottomContainer = document.querySelector('.product-image-bottom');
    // const prevButton = document.querySelector('.prev');
    // const nextButton = document.querySelector('.next');

    // if (imgBottom.length > 0) {
    //   imgBottom[0].classList.add('active');
    //   imgTop.src = imgBottom[0].src;
    // }

    // imgBottom.forEach((image) => {
    //   image.addEventListener('click', function() {       
    //     imgBottom.forEach((img) => img.classList.remove('active'));

    //     image.classList.add('active');

    //     imgTop.src = image.src;
    //   });
    // });


    // if (imgBottom.length > 6) {
    //   prevButton.style.display = 'block';
    //   nextButton.style.display = 'block';
    // }


    // nextButton.addEventListener('click', function() {
    //   imgBottomContainer.scrollBy({ left: 100, behavior: 'smooth' });
    // });

    // prevButton.addEventListener('click', function() {
    //   imgBottomContainer.scrollBy({ left: -100, behavior: 'smooth' });
    // });

    // Tabs Script for smaller screen
    const tabs = document.querySelectorAll('.product-tab-section #tabs .tab');
    const tabContent = document.querySelector('.product-tab-section #tab-contents');
    const closeBtn = document.querySelectorAll('.product-tab-section .tab-content-header .close');
    const offcanvasLayer = document.getElementById('offcanvas-backdrop-layer');

    if (window.innerWidth < 992) {
      tabs[0].classList.remove('active');
    }

    if (tabs.length > 0) {
      tabs.forEach((tab) => {
        tab.addEventListener('click', function () {
          tabContent.classList.add('open');
          document.body.classList.add('offcanvas-backdrop-active');
        });
      });
    }

    if (closeBtn.length > 0) {
      closeBtn.forEach((button) => {
        button.addEventListener('click', function () {
          tabContent.classList.remove('open');
          document.body.classList.remove('offcanvas-backdrop-active');
          tabs.forEach((tab) => { tab.classList.remove('active') });
        });
      });
    }

    offcanvasLayer.addEventListener('click', function () {
      tabContent.classList.remove('open');
      document.body.classList.remove('offcanvas-backdrop-active');
      tabs.forEach((tab) => { tab.classList.remove('active') });
    });

    // Color Pallet
    const checkElement = setInterval(() => {
      const colorPalletContainer = document.querySelector('.product--rendered-attribute .form-radios');
      if (colorPalletContainer) {
        clearInterval(checkElement);
        if (colorPalletContainer.scrollHeight >= 350) {
          const pallets = colorPalletContainer.querySelectorAll('.form-item');
          const showAllBtn = document.createElement('div');
          showAllBtn.classList.add('show-all-btn');
          showAllBtn.textContent = `Show all ${pallets.length} colors`;
          colorPalletContainer.parentNode.insertBefore(showAllBtn, colorPalletContainer.nextSibling);

          showAllBtn.addEventListener('click', function (e) {
            colorPalletContainer.classList.add('expand');
            e.target.style.display = 'none';
          });
        }
      }
    }, 100);
  }

  // Search result page filters
  if(this.location.pathname.includes('/product-search')){
    const filterForm = document.querySelector('#views-exposed-form-product-search-page-1');
    if(filterForm){
      const fieldsets = document.querySelectorAll('.fieldset-wrapper');
      if(fieldsets.length > 0){
        fieldsets.forEach((fieldset) => {
          if(fieldset.scrollHeight >= 240){
            // Creating show more button
            const showMoreButton = document.createElement('a');
            showMoreButton.textContent = 'Show more';
            showMoreButton.classList.add('show-more-btn');

            // Creating show less button
            const showLessButton = document.createElement('a');
            showLessButton.textContent = 'Show less';
            showLessButton.classList.add('show-less-btn');

            // Appending buttons
            const parentNode = fieldset.parentNode;
            
            parentNode.insertBefore(showMoreButton, fieldset.nextSibling);
            
            // Click event on show more button
            showMoreButton.addEventListener('click', function(){
              fieldset.classList.add('expanded');
              showMoreButton.remove();
              parentNode.insertBefore(showLessButton, fieldset.nextSibling);
            });

            showLessButton.addEventListener('click', function(){
              fieldset.classList.remove('expanded');
              showLessButton.remove();
              parentNode.insertBefore(showMoreButton, fieldset.nextSibling);
            });
            
          }
        });
      }
    }
    // adding quotes on the search term
    const searchElement = document.querySelectorAll(".block-views-exposed-filter-blockproduct-search-page-1 .form-item-title input");
    if(searchElement.length > 0){
      const val = searchElement[1].value;
      if(val != ''){
        searchElement[1].value = `' ${val} '`;
      }
    }
  }

});

// window.addEventListener('load', function (event) {
//   if(this.location.pathname.includes('/product')){
//     document.querySelector('.img-overlay').classList.add('hide');
//   }
// });
// window.addEventListener('beforeunload', function (event) {
//   if(this.location.pathname.includes('/product')){
//     document.querySelector('.img-overlay').classList.remove('hide');
//   }
// });

// window.addEventListener('pageshow', function (e) {
//   if(this.location.pathname.includes('/product')){
//     if (e.persisted) {
//       document.querySelector('.img-overlay').classList.add('hide');
//     }
//   }
// });

