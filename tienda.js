const addToShoppingCartButtons = document.querySelectorAll('.agregarProducto');
addToShoppingCartButtons.forEach((agregarProductoButton) => {
  agregarProductoButton.addEventListener('click', agregarProductoClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const svItemsContainer = document.querySelector(
  '.svItemsContainer'
);

function agregarProductoClicked(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemTitle = item.querySelector('.item-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;
  const itemImage = item.querySelector('.item-image').src;

  agregarItems(itemTitle, itemPrice, itemImage);
}

function agregarItems(itemTitle, itemPrice, itemImage) {
  const elementsTitle = svItemsContainer.getElementsByClassName(
    'compraItemTitle'
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let cantidadElementos = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.carComItemsQuantity'
      );
      cantidadElementos.value++;
      $('.toast').toast('show');
      updatecompraTotal();
      return;
    }
  }

  const cFila = document.createElement('div');
  const cContenido = `
  <div class="row carComItems">
        <div class="col-6">
            <div class="sectorVisual-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="sectorVisual-image">
                <h6 class="sectorVisual-item-title compraItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="sectorVisual-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 carComItemsPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="sectorVisual-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="sectorVisual-quantity-input carComItemsQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  cFila.innerHTML = cContenido;
  svItemsContainer.append(cFila);

  cFila
    .querySelector('.buttonDelete')
    .addEventListener('click', removecarComItems);

  cFila
    .querySelector('.carComItemsQuantity')
    .addEventListener('change', quantityChanged);

  updatecompraTotal();
}

function updatecompraTotal() {
  let total = 0;
  const compraTotal = document.querySelector('.compraTotal');

  const carComItemss = document.querySelectorAll('.carComItems');

  carComItemss.forEach((carComItems) => {
    const carComItemsPriceElement = carComItems.querySelector(
      '.carComItemsPrice'
    );
    const carComItemsPrice = Number(
      carComItemsPriceElement.textContent.replace('$', '')
    );
    const carComItemsQuantityElement = carComItems.querySelector(
      '.carComItemsQuantity'
    );
    const carComItemsQuantity = Number(
      carComItemsQuantityElement.value
    );
    total = total + carComItemsPrice * carComItemsQuantity;
  });
  compraTotal.innerHTML = `${total.toFixed(2)}$`;
}

function removecarComItems(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.carComItems').remove();
  updatecompraTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updatecompraTotal();
}

function comprarButtonClicked() {
  svItemsContainer.innerHTML = '';
  updatecompraTotal();
}
