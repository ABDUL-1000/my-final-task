document.addEventListener('DOMContentLoaded', function () {
    const orderSummaryContainer = document.getElementById('final-order-summary');
    const orderData = JSON.parse(localStorage.getItem('orderSummary'));
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];

    if (!orderData || cartData.length === 0) {
        orderSummaryContainer.innerHTML = '<p>Order summary could not be loaded.</p>';
        return;
    }

    let totalAmount = 0;
    let orderHTML = `
        <h2>Billing Information</h2>
        <p><strong>Name:</strong> ${orderData.billingName}</p>
        <p><strong>Email:</strong> ${orderData.billingEmail}</p>
        <p><strong>Address:</strong> ${orderData.billingAddress}</p>
        <p><strong>Phone:</strong> ${orderData.billingPhone}</p>

        <h2>Shipping Information</h2>
        <p><strong>Name:</strong> ${orderData.shippingName}</p>
        <p><strong>Phone:</strong> ${orderData.shippingPhone}</p>
        <p><strong>Address:</strong> ${orderData.shippingAddress}</p>

        <h2>Payment Method</h2>
        <p>${orderData.paymentMethod}</p>

        <h2>Order Summary</h2>
        <ul class="list-group">
    `;

    cartData.forEach(item => {
        totalAmount += item.price * item.quantity;
        orderHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${item.title} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </li>
        `;
    });

    orderHTML += `
        </ul>
        <div class="mt-3">
            <h5>Total Amount: $${totalAmount.toFixed(2)}</h5>
        </div>
    `;

    orderSummaryContainer.innerHTML = orderHTML;
});
