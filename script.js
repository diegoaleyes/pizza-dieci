// script.js

// Función para mostrar y ocultar el menú en dispositivos móviles
function toggleMenu() {
    const menuItems = document.querySelector('.menu-items');
    menuItems.classList.toggle('show-menu');
}

// Carrito de compras
let cart = [];

// Función para agregar un producto al carrito
function addToCart(pizza) {
    cart.push(pizza);
    displayCart();
}

// Función para mostrar los elementos del carrito
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price}</span>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartItems.appendChild(div);
    });
    updateTotal();
}

// Función para actualizar el total del carrito
function updateTotal() {
    const cartTotal = document.getElementById('cart-total');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

// Función para vaciar el carrito
document.getElementById('clear-cart-btn').addEventListener('click', () => {
    cart = [];
    displayCart();
});

// Event listeners para los botones de agregar al carrito
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const pizza = event.target.closest('.pizza');
        const name = pizza.getAttribute('data-name');
        const price = parseFloat(pizza.getAttribute('data-price'));
        addToCart({ name, price });
    });
});

