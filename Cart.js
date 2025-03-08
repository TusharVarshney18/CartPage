// Define product data with details
const products = [
   {
      id: 1,
      name: "Vegetables",
      description: "Fresh mixed vegetables.",
      price: 2.99,
      weight: "1 kg",
      img: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=600",
      quantity: 0,
   },
   {
      id: 2,
      name: "Radish",
      description: "Juicy red apples.",
      price: 3.49,
      weight: "1 kg",
      img: "https://images.pexels.com/photos/2476542/pexels-photo-2476542.jpeg?auto=compress&cs=tinysrgb&w=600",
      quantity: 0,
   },
   {
      id: 3,
      name: "Potato",
      description: "Fresh potatoes from the farm.",
      price: 1.99,
      weight: "1 kg",
      img: "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=600",
      quantity: 0,
   },
   {
      id: 4,
      name: "Tomato",
      description: "Organic tomatoes.",
      price: 2.49,
      weight: "1 kg",
      img: "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600",
      quantity: 0,
   },
   {
      id: 5,
      name: "Onions",
      description: "Fresh onions.",
      price: 1.49,
      weight: "1 kg",
      img: "https://images.pexels.com/photos/144206/pexels-photo-144206.jpeg?auto=compress&cs=tinysrgb&w=600",
      quantity: 0,
   },
   {
      id: 6,
      name: "cucumber",
      description: "Fresh cucumber.",
      price: 1.59,
      weight: "1 kg",
      img: "https://images.pexels.com/photos/1656664/pexels-photo-1656664.jpeg?auto=compress&cs=tinysrgb&w=600",
      quantity: 0,
   },
   {
      id: 7,
      name: "LadyFinger",
      description: "Fresh LadyFinger.",
      price: 1.7,
      weight: "1 kg",
      img: "https://images.pexels.com/photos/28577186/pexels-photo-28577186/free-photo-of-fresh-okra-pods-uncut-and-sliced-on-dark-surface.jpeg?auto=compress&cs=tinysrgb&w=600",
      quantity: 0,
   },
   {
      id: 8,
      name: "Spinach",
      description: "Fresh Spinach.",
      price: 1.49,
      weight: "1 kg",
      img: "https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=600",
      quantity: 0,
   },
   {
      id: 9,
      name: "lettuce",
      description: "Fresh lettuce.",
      price: 1.22,
      weight: "1 kg",
      img: "https://images.pexels.com/photos/1352199/pexels-photo-1352199.jpeg?auto=compress&cs=tinysrgb&w=600",
      quantity: 0,
   },
   {
      id: 10,
      name: "cauliflower",
      description: "Fresh cauliflower.",
      price: 1.49,
      weight: "1 kg",
      img: "https://images.pexels.com/photos/4963458/pexels-photo-4963458.jpeg?auto=compress&cs=tinysrgb&w=600",
      quantity: 0,
   },
];

const productContainer = document.getElementById("productContainer");
const cartSummary = document.getElementById("cartSummary");

// Render product cards in the grid
function renderProducts() {
   productContainer.innerHTML = "";
   products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
         <img src="${product.img}" alt="${product.name}">
         <h3>${product.name}</h3>
         <p>${product.description}</p>
         <p class="price">$${product.price.toFixed(2)}</p>
         <p class="weight">${product.weight}</p>
         <div class="quantity-controls" id="controls-${product.id}">
           ${product.quantity === 0
            ? `<button onclick="addToCart(${product.id})">Add to Cart</button>`
            : `
               <button onclick="decrement(${product.id})">-</button>
               <span id="qty-${product.id}">${product.quantity}</span>
               <button onclick="increment(${product.id})">+</button>
             `
         }
         </div>
       `;
      productContainer.appendChild(card);
   });
}

// Render cart summary as a table
function renderCartSummary() {
   const itemsInCart = products.filter((p) => p.quantity > 0);
   if (itemsInCart.length === 0) {
      cartSummary.innerHTML = `<h2>Cart Summary</h2><p style="text-align:center;">No items in cart.</p>`;
      return;
   }
   let tableHTML = `
       <h2>Cart Summary</h2>
       <table>
         <thead>
           <tr>
             <th>Image</th>
             <th>Product</th>
             <th>Description</th>
             <th>Price</th>
             <th>Weight</th>
             <th>Quantity</th>
             <th>Total</th>
           </tr>
         </thead>
         <tbody>
     `;
   itemsInCart.forEach((item) => {
      tableHTML += `
         <tr>
           <td><img src="${item.img}" alt="${item.name}"></td>
           <td>${item.name}</td>
           <td>${item.description}</td>
           <td>$${item.price.toFixed(2)}</td>
           <td>${item.weight}</td>
           <td>${item.quantity}</td>
           <td>$${(item.price * item.quantity).toFixed(2)}</td>
         </tr>
       `;
   });
   tableHTML += `
         </tbody>
       </table>
     `;
   cartSummary.innerHTML = tableHTML;
}

// Add an item to the cart (sets initial quantity to 1)
function addToCart(id) {
   const product = products.find((p) => p.id === id);
   if (product) product.quantity = 1;
   renderProducts();
   renderCartSummary();
}

// Increase product quantity
function increment(id) {
   const product = products.find((p) => p.id === id);
   if (product) product.quantity++;
   document.getElementById(`qty-${id}`).textContent = product.quantity;
   renderCartSummary();
}

// Decrease product quantity; revert to "Add to Cart" if quantity becomes 0
function decrement(id) {
   const product = products.find((p) => p.id === id);
   if (product) {
      product.quantity--;
      if (product.quantity < 1) product.quantity = 0;
   }
   renderProducts();
   renderCartSummary();
}

renderProducts();
renderCartSummary();



// Buy Order Section


function placeOrder() {
   const itemsInCart = products.filter((p) => p.quantity > 0);
   if (itemsInCart.length === 0) {
      alert("No items in the cart to place an order.");
      return;
   }


   alert("Order placed successfully!");


   itemsInCart.forEach((item) => {
      item.quantity = 0;
   });

   renderProducts();
   renderCartSummary();
}

document.getElementById("placeOrderButton").addEventListener("click", placeOrder);