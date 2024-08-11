// order-summary.js
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve order summary and cart data from localStorage
    const orderSummary = JSON.parse(localStorage.getItem('orderSummary')) || {};
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];

    const orderSummaryContainer = document.querySelector('.order-summary');
    let totalAmount = 0;

    if (orderSummaryContainer) {
        // Display order summary
        let orderSummaryHTML = `
            <h4>Billing Information</h4>
            <p>Name: ${orderSummary.billingName}</p>
            <p>Email: ${orderSummary.billingEmail}</p>
            <p>Address: ${orderSummary.billingAddress}</p>
            <p>Phone: ${orderSummary.billingPhone}</p>
            <p>Card: ${orderSummary.billingCard}</p>

            <h4>Shipping Information</h4>
            <p>Name: ${orderSummary.shippingName}</p>
            <p>Phone: ${orderSummary.shippingPhone}</p>
            <p>Address: ${orderSummary.shippingAddress}</p>

            <h4>Payment Method</h4>
            <p>${orderSummary.paymentMethod}</p>
        `;

        if (cartData.length === 0) {
            orderSummaryHTML += '<p>Your cart is empty.</p>';
        } else {
            orderSummaryHTML += '<h4>Order Summary</h4><ul class="list-group">';

            // Fetch product details and calculate totals
            Promise.all(cartData.map(item => {
                return fetch(`https://fakestoreapi.com/products/${item.productId}`)
                    .then(response => response.json())
                    .then(product => {
                        let itemTotal = product.price * item.quantity;
                        totalAmount += itemTotal;

                        return `
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <img src="${product.image}" alt="${product.title}" style="width: 25px; height: auto; object-fit: contain;" class="me-1">
                                <span>${product.title} (x${item.quantity})</span>
                                <span>$${itemTotal.toFixed(2)}</span>
                            </li>
                        `;
                    });
            }))
            .then(itemsHTML => {
                // Join all the individual item HTML strings
                orderSummaryHTML += itemsHTML.join('');
                orderSummaryHTML += '</ul>';

                // Add the total amount to the HTML
                orderSummaryHTML += `
                    <div class="mt-3">
                        <h5>Total Amount: $${totalAmount.toFixed(2)}</h5>
                    </div>
                `;

                // Set the accumulated HTML to the container
                orderSummaryContainer.innerHTML = orderSummaryHTML;
                // console.log(orderSummaryContainer);
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
                orderSummaryContainer.innerHTML = '<p>There was an error loading your cart.</p>';
            });
        }
    }
});
