let cartCountElement = document.querySelector('.cart-count');
let cartView = document.querySelector('.cart-view');
let cartData = JSON.parse(localStorage.getItem('cartData')) || []; // Load cart data from localStorage or initialize as empty

// Initialize cart count
let cartCount = cartData.length;
cartCountElement.innerText = cartCount;

function showProduct() {
  let productId = localStorage.getItem('productId');
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // Display main product
      let prodView = `
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${data.image}" class="img-fluid rounded-start">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${data.title}</h5>
                <p class="card-text">$${data.price}</p>
                <p class="card-text"><small class="text-body-secondary">${data.description}</small></p>
                <a class="btn btn-primary btn-product" onClick="addToCart(${data.id}, 1)">🛒 Add to cart</a>
              </div>
            </div>
          </div>
        </div>
      `;
      cartView.innerHTML = prodView;

      // Fetch and display related products
      fetchRelatedProducts(data.category, data.id);
    });
}

function fetchRelatedProducts(category, currentProductId) {
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((response) => response.json())
    .then((products) => {
      let relatedProductsHTML = '<h3>Related Products</h3><div class="row">';

      products.forEach((product) => {
        // Avoid showing the current product again in the related products
        if (product.id !== currentProductId) {
          relatedProductsHTML += `
            <div class="col-md-4 each-item mb-3">
              <div class="each card">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">$${product.price}</p>
                  <a class="btn btn-primary btn-product" onclick="viewRelatedProduct(${product.id})">View Product</a>
                </div>
              </div>
            </div>
          `;
        }
      });

      relatedProductsHTML += '</div>';
      cartView.innerHTML += relatedProductsHTML; // Append related products to the prodView
    });
}

// View a related product
function viewRelatedProduct(productId) {
  localStorage.setItem('productId', productId); // Update the product ID in localStorage
  showProduct(); // Reload the product view with the new product
}

function addToCart(productId, quantity) {
  // Check if product is already in the cart
  let existingProduct = cartData.find(item => item.productId === productId);
  
  if (existingProduct) {
    alert('This product is already in your cart.');
  } else {
    // Add product to cart data
    cartData.push({ productId, quantity });

    // Save updated cart data to localStorage
    localStorage.setItem('cartData', JSON.stringify(cartData));

    // Update cart count
    cartCount += 1;
    cartCountElement.innerText = cartCount;
  }
}

showProduct();

document.querySelector('.cart-icon').addEventListener('click', function() {
  window.location.href = 'cart.html'; // Replace with the actual URL of your cart summary page
});
