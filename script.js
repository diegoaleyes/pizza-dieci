const pizzas = document.querySelectorAll('.pizza');

pizzas.forEach(pizza => {
  pizza.addEventListener('click', () => {
    pizza.classList.toggle('flip'); // Agrega o quita la clase 'flip' al hacer clic
  });
});
