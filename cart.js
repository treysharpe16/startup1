import MongoClient from pymongo.mongo_client 
import ServerApi from pymongo.server_api 

import secret from secrets 

db_user = secret.get('DATABASE_USER', 'root') 
db_pass = secret.get('DATABASE_PASSWORD', 'pass') 

const uri = `mongodb+srv://${db_user}:${db_pass}@apolloski.bw9jos2.mongodb.net/`;

// Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

// Send a ping to confirm a successful connection
// Assuming you have already required the MongoClient and connected to your database
const { MongoClient } = require('mongodb');

async function checkMongoDBConnection() {
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.db('admin').command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    client.close();
  } catch (e) {
    console.error(e);
  }
}

// Call the function
checkMongoDBConnection();

// Set up location in MangoDb Database
db = client.get_database('Shop')
shopItems = db.shopItems

// get user data on tasks

async function getUserShopData() {
  try {
    const shopCount = await shopItems.countDocuments({});
    console.log(`You have ${shopCount} items`);

    const items = await shopData.find().toArray();
    const itemList = items.map(item => item.item_name);
    console.log(itemList.slice(-10));
  } catch (e) {
    console.error(e);
  }
}

getUserShopData();





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


// OPEN & CLOSE CART
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

console.log("cart")
  if (cart) {
    cartIcon.addEventListener("click", () => {
      cart.classList.add("active");
    });
  }
  if (cart) {
    closeCart.addEventListener("click", () => {
      console.log("Closed")
      cart.classList.remove("active");
    });
  }


// ============= HANDLE EVENTS FUNCTIONS =============
let itemsAdded = [];

function handle_addCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".product-img").src;
  console.log(title, price, imgSrc);

  let newToAdd = {
    title,
    price,
    imgSrc,
  };

  // handle item is already exist
  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    alert("This Item Is Already Exist!");
    return;
  } else {
    itemsAdded.push(newToAdd);
  }

  // Add product to cart
  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);

  update();
}

function handle_removeCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) =>
      el.title !=
      this.parentElement.querySelector(".cart-product-title").innerHTML
  );

  update();
}

function handle_changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value); // to keep it integer

  update();
}

function handle_buyOrder() {
  if (itemsAdded.length <= 0) {
    alert("There is No Order to Place Yet! \nPlease Make an Order first.");
    return;
  }
  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = "";
  alert("Your Order is Placed Successfully :)");
  itemsAdded = [];

  update();
}

// =========== UPDATE & RERENDER FUNCTIONS =========
function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });

  // keep 2 digits after the decimal point
  total = total.toFixed(2);
  // or you can use also
  // total = Math.round(total * 100) / 100;

  totalElement.innerHTML = "$" + total;
}

// ============= HTML COMPONENTS =============
function CartBoxComponent(title, price, imgSrc) {
  return `
    <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- REMOVE CART  -->
        <i class='bx bxs-trash-alt cart-remove'></i>
    </div>`;
}

// 
class Product {
  constructor(name, image1, image2, price, description) {
      this.name = name;
      this.image1 = image1;
      this.image2 = image2;
      this.price = price;
      this.description = description;
  }

  displayProduct() {
      document.getElementById('product-name').textContent = this.name;
      document.getElementById('product-image1').src = this.image1;
      document.getElementById('product-image2').src = this.image2;
      // document.getElementById('product-image').alt = this.name + ' Image';
      document.getElementById('add-to-cart').textContent = `Add to Cart: $${this.price}`;
      document.getElementById('product-description').textContent = this.description;
  }
}

// Function to parse URL query parameters
function getQueryParams() {
  const queryParams = {};
  const queryStrings = window.location.search.substring(1).split('&');
  for (const queryString of queryStrings) {
      const [key, value] = queryString.split('=');
      queryParams[key] = decodeURIComponent(value);
  }
  return queryParams;
}

// Example product data, ideally this should come from a database or JSON file
const products = {
  ExampleProduct: new Product(
      'Example Product',
      'img/Mask1.png',
      'img/Mask2.png',  // Update the path to your product image
      '99.99',
      'This is a great product with many features. Get it now!'
  ),
  GreyMask: new Product(
    'GRey Mask',
    'img/Mask3.png',
    'img/Mask4.png',  // Update the path to your product image
    '39.99',
    'This is a great product with many features. Get it now!'
)
  // Add more products as needed
};

document.addEventListener('DOMContentLoaded', function() {
  const queryParams = getQueryParams();
  const productName = queryParams.productName;
  if (products[productName]) {
      products[productName].displayProduct();
  } else {
      // Handle case where product is not found
      console.error('Product not found');
  }
});

// Continuing from the previous example...

document.getElementById('add-to-cart').addEventListener('click', function() {
  const productName = getQueryParams().productName;
  const product = products[productName];
  if (product) {
      addToCart(product);
  } else {
      alert('Error adding product to cart.');
  }
});

function addToCart(product) {
  let cart = localStorage.getItem('shoppingCart');
  cart = cart ? JSON.parse(cart) : {};
  
  if (cart[product.name]) {
      cart[product.name].quantity += 1; // Increment quantity if product already exists
  } else {
      // Add new product to cart
      cart[product.name] = {...product, quantity: 1};
  }
  
  localStorage.setItem('shoppingCart', JSON.stringify(cart));
  updateCartDisplay(); // Refresh the cart display
  document.querySelector(".cart").classList.add("active");
}

// Example function to migrate local storage cart to server
function migrateCartToServer() {
  let cart = localStorage.getItem('shoppingCart');
  if (cart) {
    fetch('/api/cart/migrate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer <user-token>'
      },
      body: cart
    })
    .then(response => response.json())
    .then(data => {
      console.log('Cart migrated:', data);
      localStorage.removeItem('cart'); // Clear local storage cart after migration
    })
    .catch(error => console.error('Error migrating cart:', error));
  }
}

