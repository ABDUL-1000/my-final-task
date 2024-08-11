document.addEventListener("DOMContentLoaded", function () {
  // Variables for DOM elements
  let cartData = JSON.parse(localStorage.getItem("cartData")) || [];
  let orderSummaryContainer = document.querySelector(".order-summary");
  let cartCountElement = document.querySelector(".cart-count"); // Element to display cart count
  let totalAmount = 0;

  // Function to update cart count
  function updateCartCount() {
    const totalItems = cartData.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountElement) {
      cartCountElement.textContent = totalItems;
    }
  }

  // Update cart count on page load
  updateCartCount();

  // Render the order summary if the container is present
  if (orderSummaryContainer) {
    if (cartData.length === 0) {
      orderSummaryContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      let orderSummaryHTML = '<ul class="list-group">';

      // Use Promise.all to wait for all fetch requests to finish
      Promise.all(
        cartData.map((item) => {
          return fetch(`https://fakestoreapi.com/products/${item.productId}`)
            .then((response) => response.json())
            .then((product) => {
              let itemTotal = product.price * item.quantity;
              totalAmount += itemTotal;

              // Accumulate the HTML for each product in the cart
              return `
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <img src="${product.image}" alt="${
                product.title
              }" style="width: 25px; height: auto; object-fit: contain;" class="me-1">
                                <span>${product.title} (x${
                item.quantity
              })</span>
                                <span>$${itemTotal.toFixed(2)}</span>
                            </li>
                        `;
            });
        })
      )
        .then((itemsHTML) => {
          // Join all the individual item HTML strings
          orderSummaryHTML += itemsHTML.join("");
          orderSummaryHTML += "</ul>";

          // Add the total amount to the HTML
          orderSummaryHTML += `
                    <div class="mt-3">
                        <h5>Total Amount: $${totalAmount.toFixed(2)}</h5>
                    </div>
                `;

          // Set the accumulated HTML to the container
          orderSummaryContainer.innerHTML = orderSummaryHTML;
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
          orderSummaryContainer.innerHTML =
            "<p>There was an error loading your cart.</p>";
        });
    }
  }

  // Form submission handling
  if (document.getElementById("billing-form")) {
    document
      .getElementById("billing-form")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        saveOrderSummary();
      });
  }

  if (document.getElementById("shipping-form")) {
    document
      .getElementById("shipping-form")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        saveOrderSummary();
      });
  }

  // Update the button selector if needed
  const placeOrderButton = document.querySelector('button[type="submit"]');
  if (placeOrderButton) {
    placeOrderButton.addEventListener("click", function (e) {
      e.preventDefault();
      saveOrderSummary();
      console.log("Place Order button clicked"); // Debugging statement
      window.location.href = "order-summary.html"; // Ensure this path is correct
    });
  }

  function saveOrderSummary() {
    // Gather all the form data
    const billingName = document.getElementById("billing-name").value;
    const billingEmail = document.getElementById("billing-email").value;
    const billingAddress = document.getElementById("billing-address").value;
    const billingPhone = document.getElementById("billing-phone").value;
    const billingCard = document.getElementById("billing-card").value;

    const shippingName = document.getElementById("shipping-name").value;
    const shippingPhone = document.getElementById("shipping-phone").value;
    const shippingAddress = document.getElementById("shipping-address").value;

    const paymentMethod = document.getElementById("payment-method").value;

    // Store the order summary and cart data in localStorage
    localStorage.setItem(
      "orderSummary",
      JSON.stringify({
        billingName,
        billingEmail,
        billingAddress,
        billingPhone,
        billingCard,
        shippingName,
        shippingPhone,
        shippingAddress,
        paymentMethod,
      })
    );

    localStorage.setItem("cartData", JSON.stringify(cartData));
  }

  // Cart icon click handling
  if (document.querySelector(".cart-icon")) {
    document.querySelector(".cart-icon").addEventListener("click", function () {
      window.location.href = "cart.html";
    });
  }
});
