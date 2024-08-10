// function showSection(sectionId) {
//     document.querySelectorAll('.section').forEach(section => {
//       section.classList.remove('active');
//     });
//     document.getElementById(sectionId).classList.add('active');
//   }
  let cartCountElement = document.querySelector('.cart-count'),
        productView = document.querySelector('.data-view'),
        cardImg = document.querySelector('.card-img'),
        cardTitle = document.querySelector('.card-title'),
        cardText = document.querySelector('.card-text'),
        productBtn = document.querySelector('.btn-product'),
        cartIcon = document.querySelector('.cart-icon'),
        categoryView = document.querySelector('.category-view')
  
let cartData = [];

function getItem(){
  fetch('https://fakestoreapi.com/products')
  .then((res)=>res.json())
  .then((data)=>{
    data.forEach((product, index) => {
     console.log(product);
    let productItem = `
       <div class="col each-item">
  <div class="card each">
    <img class="card-img" src="${product.image}" class="card-img-top" alt="Product 1">
    <div class="card-body">
      <h5 class="card-title">${product.title}</h5>
      <p class="card-text">$${product.price}</p>
      
    </div>
  </div>
</div>
     `;
     productView.innerHTML+=productItem;
     viewProduct()
    });
  })
  
}


getItem()

function viewProduct() {
  let viewProduct = document.querySelectorAll('.each-item')
  viewProduct.forEach((product, index) => {
  product.addEventListener('click', ()=>{
   localStorage.setItem("productId", index+1)
   window.location.href="product.html"
  })


  });

  
}
function cartItem(){
  fetch('https://fakestoreapi.com/products/category')
  .then((res)=>res.json())
  .then((e)=>{
    data.forEach((item, index) => {
     console.log(item);
    let Item = `
       <div class="col each-item">
  <div class="card each">
    <img class="card-img" src="${item.image}" class="card-img-top" alt="Product 1">
    <div class="card-body">
      <h5 class="card-title">${item.title}</h5>
      <p class="card-text">$${item.price}</p>
      
    </div>
  </div>
</div>
     `;
     categoryView.innerHTML=Item;
  
    });
  })
  
}
cartItem()
document.querySelector('.cart-icon').addEventListener('click', function() {
  window.location.href = 'cart.html'; // Replace with the actual URL of your cart summary page
});