document.addEventListener('DOMContentLoaded', () => {
  const cart = [];
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalContainer = document.getElementById('cart-total');
  const clearCartButton = document.getElementById('clear-cart-btn');
  
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', event => {
      const pizzaElement = event.target.closest('.pizza');
      const pizzaName = pizzaElement.getAttribute('data-name');
      const pizzaPrice = parseFloat(pizzaElement.getAttribute('data-price'));

      const existingItem = cart.find(item => item.name === pizzaName);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name: pizzaName, price: pizzaPrice, quantity: 1 });
      }

      updateCartDisplay();
    });
  });

  clearCartButton.addEventListener('click', () => {
    cart.length = 0;
    updateCartDisplay();
  });

  function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');
      cartItemElement.innerHTML = `
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-quantity">${item.quantity}</span>
        <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
      `;
      cartItemsContainer.appendChild(cartItemElement);
      total += item.price * item.quantity;
    });

    cartTotalContainer.textContent = `Total: $${total.toFixed(2)}`;
  }
});
function toggleMenu() {
  const menuItems = document.querySelector('.menu-items');
  menuItems.classList.toggle('active');
}
