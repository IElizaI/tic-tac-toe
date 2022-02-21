const cells = document.querySelectorAll('.cell');

let move = 'cross'; // Ход игрока Х
const arrValue = [];

// Проверка наличия класса в ячейке
function classСheck(cell) {
  return cell.classList.contains('cross') || cell.classList.contains('zero');
}

// Добавление hover класса
function mouseoverOnElem(event) {
  const cell = event.target;
  if (classСheck(cell)) {
    return;
  }
  if (move === 'cross') {
    cell.classList.add('hover-cross');
  } else {
    cell.classList.add('hover-zero');
  }
}

// Удаление hover класса
function mouseoutElem(event) {
  const cell = event.target;
  if (classСheck(cell)) {
    return;
  }
  if (move === 'cross') {
    cell.classList.remove('hover-cross');
  } else {
    cell.classList.remove('hover-zero');
  }
}

// Добавление cross или zero по клику
function clickOnElem(event) {
  const cell = event.target;
  if (classСheck(cell)) {
    return;
  }
  if (move === 'cross') {
    cell.classList.add('cross');
    move = 'zero';
  } else {
    cell.classList.add('zero');
    move = 'cross';
  }
}

cells.forEach((cell) => {
  cell.addEventListener('mouseover', mouseoverOnElem); // Наведении мышки на Х
  cell.addEventListener('mouseout', mouseoutElem); // Отведение мышки
  cell.addEventListener('click', clickOnElem); // Клик X
});
