function updateCartDisplay() {
  const cart = JSON.parse(localStorage.getItem('shoppingCart')) || {};
  const cartContainer = document.getElementById('cart-items');
  let totalCost = 0;

  if (!cartContainer) return;

  cartContainer.innerHTML = ''; // Clear existing cart items
  
  Object.keys(cart).forEach(key => {
      const item = cart[key];
      const itemCost = item.price * item.quantity;
      totalCost += itemCost; // Add item cost to total cost

      cartContainer.innerHTML += `
          <div class="cart-item">
            <img src="${item.image1}" width="160vw">
              <h2 class="product-title">${item.name}</h2>
              <p>Price: $${item.price}</p>
              <input type="number" value="${item.quantity}" min="1" class="cart-quantity" data-product-name="${item.name}">
              <button class="delete-item" data-product-name="${item.name}">Delete</button>
          </div>
          `;
      });
  
  // Display total cost
  cartContainer.innerHTML += `
      <div class="cart-total">
        <h2 class="product-title">Total Cost: $${totalCost.toFixed(2)}</h3>
      </div>
  `;
  attachEventListeners(); // Attach event listeners for quantity changes and delete buttons
  }

  function attachEventListeners() {
    // Quantity change listeners
    document.querySelectorAll('.cart-quantity').forEach(input => {
        input.addEventListener('change', function() {
            updateQuantity(this.dataset.productName, this.value);
        });
    });

    // Delete button listeners
    document.querySelectorAll('.delete-item').forEach(button => {
        button.addEventListener('click', function() {
            deleteItem(this.dataset.productName);
        });
    });
}

function updateQuantity(productName, quantity) {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || {};
    if (cart[productName]) {
        cart[productName].quantity = parseInt(quantity, 10);
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        updateCartDisplay(); // Refresh the cart display
    }
}

function deleteItem(productName) {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || {};
    if (cart[productName]) {
        delete cart[productName];
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        updateCartDisplay(); // Refresh the cart display
    }
}

document.addEventListener('DOMContentLoaded', updateCartDisplay);
