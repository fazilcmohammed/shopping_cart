let cart = [];

// Fetch products from the products.json file
function fetchProducts() {
  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      displayProducts(data);
    })
    .catch(error => console.error('Error fetching products:', error));
}

// Function to display products
function displayProducts(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = ''; // Clear any existing content
  products.forEach(product => {
    const productCard = `
      <div class="product">
        <img src="${product.image_url}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="description">${product.description}</p>
        <p class="price"><strong>INR ${product.price}</strong></p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    productList.innerHTML += productCard;
  });
}

// Function to add an item to the cart
function addToCart(productId) {
  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      const product = products.find(p => p.id === productId);
      const cartItem = cart.find(item => item.id === productId);

      if (cartItem) {
        cartItem.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      displayCart(); // Update cart immediately after adding/updating quantity
    });
}

// Function to display items in the cart
function displayCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = ''; // Clear the cart display

  let totalPrice = 0; // Initialize total price

  cart.forEach((item, index) => {
    totalPrice += item.price * item.quantity; // Calculate total price for each item
    const cartItem = `
      <div class="cart-item">
        <h4>${item.name}</h4>
        <p>Price: INR ${item.price}</p>
        <div class="quantity-controls">
          <button onclick="updateQuantity(${index}, 'decrease')">-</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity(${index}, 'increase')">+</button>
        </div>
      </div>
    `;
    cartItems.innerHTML += cartItem;
  });

  // Update the total price element (assuming you have one with the ID 'total-price')
  document.getElementById('total-price').innerText = `${totalPrice}`;
}

// Function to update the quantity of a product in the cart
function updateQuantity(index, action) {
  if (action === 'increase') {
    cart[index].quantity++;
  } else if (action === 'decrease') {
    cart[index].quantity--;
    if (cart[index].quantity === 0) {
      cart.splice(index, 1);
    }
  }

  displayCart(); // Update cart view and total price
}

// Fetch products and display them when the page loads
window.onload = function() {
  fetchProducts();
};