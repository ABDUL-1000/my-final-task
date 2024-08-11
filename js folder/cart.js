let cartCountElement = document.querySelector(".cart-count");
let cartItemsContainer = document.querySelector(".cart-items");
let cartTotalElement = document.querySelector(".cart-total p");
let cartData = JSON.parse(localStorage.getItem("cartData")) || []; // Load cart data from localStorage or initialize as empty

// Initialize cart count
let cartCount = cartData.length;
cartCountElement.innerText = cartCount;

// Function to render the cart summary
function renderCartSummary() {
  cartItemsContainer.innerHTML = ""; // Clear existing items
  let subtotal = 0;

  cartData.forEach((item, index) => {
    fetch(`https://fakestoreapi.com/products/${item.productId}`)
      .then((response) => response.json())
      .then((product) => {
        let totalItemPrice = product.price * item.quantity;
        subtotal += totalItemPrice;

        // Create cart item HTML
        let cartItemHTML = `
          <div class="list-group-item d-flex justify-content-between align-items-center">
            <img src="${product.image}" alt="${
          product.title
        }" style="width: 50px; height: auto; object-fit: contain;" class="me-3">
            <div>
              <p style=fon">${product.title}</p>
              <p>Price: $${product.price.toFixed(2)} x ${
          item.quantity
        } = $${totalItemPrice.toFixed(2)}</p>
            </div>
            <div>
            <input type="number" class="form-control quantity-input" value="${
              item.quantity
            }" min="1" style="width: 50px;" onchange="updateCart(${index}, this.value)">
            </div>
            <b utton class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
          </div>
        `;

        // Append to cart items container
        cartItemsContainer.innerHTML += cartItemHTML;

        // Update total once all items are rendered
        if (index === cartData.length - 1) {
          cartTotalElement.innerHTML = `Total: $${subtotal.toFixed(2)}`;
        }
      });
  });

  if (cartData.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalElement.innerHTML = "Total: $0.00";
  }
}

// Function to update cart item quantity
function updateCart(index, newQuantity) {
  if (newQuantity <= 0) {
    removeFromCart(index); // Remove item if quantity is set to 0 or less
  } else {
    cartData[index].quantity = parseInt(newQuantity);
    localStorage.setItem("cartData", JSON.stringify(cartData)); // Update localStorage
    renderCartSummary(); // Re-render the cart summary
  }
}

// Function to remove item from cart
function removeFromCart(index) {
  cartData.splice(index, 1); // Remove item from cart data
  localStorage.setItem("cartData", JSON.stringify(cartData)); // Update localStorage
  cartCount -= 1;
  cartCountElement.innerText = cartCount; // Update cart count
  renderCartSummary(); // Re-render the cart summary
}

// Function to proceed to checkout
function proceedToCheckout() {
  window.location.href = "checkout.html"; // Redirect to the checkout page
}

// Initialize the cart summary when the page loads
renderCartSummary();
document.querySelector(".cart-icon").addEventListener("click", function () {
  window.location.href = "cart.html"; // Replace with the actual URL of your cart summary page
});
