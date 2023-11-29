let bagItems;
 onload();
function onload() {
   let bagItemStr = localStorage.getItem('bagItems');
   bagItems = bagItemStr ? JSON.parse(bagItemStr) : [];
   displayitemsonHomePage();
   displayBagicon();
}


function addToBag(itemid) {
   bagItems.push(itemid)
   localStorage.setItem('bagItems',JSON.stringify(bagItems));
   displayBagicon();
}
function displayBagicon() {
   let bagItemCountElement = document.querySelector('.bag-item-count');
   if (bagItems.length > 0) {
      bagItemCountElement.style.visibility = 'visible';
      bagItemCountElement.innerText = bagItems.length;
   }
   else {
      bagItemCountElement.style.visibility = 'hidden';
   }
}
function displayitemsonHomePage() {
   let itemcontainerElement = document.querySelector('.items-container');
   let innerhtml = '';
   if (!itemcontainerElement){
      return;
   }
   items.forEach(item => {
      innerhtml += `
       <div class="item-container">
          <img src="${item.item_image}" class="item-image" alt="item image">
          <div class="rating">
             ${item.rating.stars}⭐|${item.rating.noofreviews} 
          </div>
          <div class="company-name">${item.company_name}</div>
          <div class="item-name">${item.item_name}</div>
          <div class="price">
              <span class="current-price">Rs${item.current_price}</span>
              <span class="original-price">Rs ${item.original_price} </span>
              <span class="discount">(${item.discount_percentage}% OFF)</span>
          </div>
          <button class="btn-add-bag" onclick = "addToBag(${item.id})">Add to Bag</button>
        </div>`
   });
   itemcontainerElement.innerHTML = innerhtml;

}
