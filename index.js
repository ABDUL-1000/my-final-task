// Variables for DOM elements
let cartCountElement = document.querySelector('.cart-count'),
    productView = document.querySelector('.data-view'),
    cardImg = document.querySelector('.card-img'),
    cardTitle = document.querySelector('.card-title'),
    cardText = document.querySelector('.card-text'),
    productBtn = document.querySelector('.btn-product'),
    cartIcon = document.querySelector('.cart-icon'),
    categoryView = document.querySelector('.category-view');

let cartData = [];

// Function to get cart data from localStorage
function getCartData() {
    cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    updateCartCount();
}

// Function to update the cart count
function updateCartCount() {
    const totalItems = cartData.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Function to fetch and display products
function getItem() {
    fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((data) => {
        data.forEach((product, index) => {
            let productItem = `
                <div class="col each-item">
                    <div class="card each">
                        <img class="card-img" src="${product.image}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">$${product.price}</p>
                        </div>
                    </div>
                </div>
            `;
            productView.innerHTML += productItem;
        });
        viewProduct();
    });
}

// Function to set up click event on each product to view details
function viewProduct() {
    let viewProduct = document.querySelectorAll('.each-item');
    viewProduct.forEach((product, index) => {
        product.addEventListener('click', () => {
            localStorage.setItem("productId", index + 1);
            window.location.href = "product.html";
        });
    });
}

// Event listener for cart icon click
cartIcon.addEventListener('click', function() {
    window.location.href = 'cart.html'; // Replace with the actual URL of your cart summary page
});

// Initial setup
document.addEventListener('DOMContentLoaded', function() {
    getCartData(); // Fetch and update cart count
    getItem(); // Fetch and display products
});
