document.addEventListener('DOMContentLoaded', () => {
  const cart = [];

  function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</span>
        <div>
          <button class="increase-qty-btn" data-name="${item.name}">+</button>
          <button class="decrease-qty-btn" data-name="${item.name}">-</button>
          <button class="remove-from-cart-btn" data-name="${item.name}">Eliminar</button>
        </div>
      `;
      cartItems.appendChild(cartItem);
      total += item.price * item.quantity;
    });

    document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
  }

  function addToCart(name, price) {
    const item = cart.find(item => item.name === name);
    if (item) {
      item.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    updateCart();
  }

  function increaseQty(name) {
    const item = cart.find(item => item.name === name);
    if (item) {
      item.quantity += 1;
    }
    updateCart();
  }

  function decreaseQty(name) {
    const item = cart.find(item => item.name === name);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
    } else {
      removeFromCart(name);
    }
    updateCart();
  }

  function removeFromCart(name) {
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex > -1) {
      cart.splice(itemIndex, 1);
    }
    updateCart();
  }

  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const pizza = e.target.closest('.pizza');
      const name = pizza.getAttribute('data-name');
      const price = parseFloat(pizza.getAttribute('data-price'));
      addToCart(name, price);
    });
  });

  document.querySelectorAll('.increase-qty-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const name = e.target.getAttribute('data-name');
      increaseQty(name);
    });
  });

  document.querySelectorAll('.decrease-qty-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const name = e.target.getAttribute('data-name');
      decreaseQty(name);
    });
  });

  document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const name = e.target.getAttribute('data-name');
      removeFromCart(name);
    });
  });

  document.getElementById('clear-cart-btn').addEventListener('click', () => {
    cart.length = 0;
    updateCart();
  });
});
