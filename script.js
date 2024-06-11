// script.js
function toggleMenu() {
  const menuItems = document.querySelector('.menu-items');
  menuItems.classList.toggle('show-menu');
}

// Agregar al carrito
document.addEventListener('DOMContentLoaded', function() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const clearCartBtn = document.getElementById('clear-cart-btn');
  let cart = [];

  function renderCart() {
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
      cartItems.appendChild(itemElement);
    });
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = `Total: $${total}`;
  }

  function addToCart(event) {
    const pizza = event.target.closest('.pizza');
    const name = pizza.dataset.name;
    const price = Number(pizza.dataset.price);
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    renderCart();
  }

  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', addToCart);
  });

  clearCartBtn.addEventListener('click', () => {
    cart = [];
    renderCart();
  });
});
