const cells = document.querySelectorAll('.cell');
const btn = document.querySelector('.btn-reset');

let move = 'cross'; // Ход игрока Х
let arrValueCross = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let arrValueZero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const arrOfCorrectResults = [
  [1, 0, 0, 1, 0, 0, 1, 0, 0], [0, 1, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1], [0, 0, 1, 0, 1, 0, 1, 0, 0],
];

// Обновляет данные по нажатию кнопки reset
function dataUpdate() {
  cells.forEach((cell) => {
    cell.classList.remove('cross');
    cell.classList.remove('zero');
  });
  move = 'cross';
  arrValueCross = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  arrValueZero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

// Сравнивает массив cross или zero с многомерным массивом победных значений
function compareArrayValues() {
  if (move === 'cross') {
    let cross = 0;
    for (let i = 0; i < arrOfCorrectResults.length; i += 1) {
      for (let j = 0; j < arrOfCorrectResults[i].length; j += 1) {
        if (arrValueCross[j] === 1 && arrOfCorrectResults[i][j] === 1) {
          cross += 1;
          console.log(cross);
          if (cross === 3) {
            return true;
          }
        }
      }
      cross = 0;
    }
  } else {
    let zero = 0;
    for (let i = 0; i < arrOfCorrectResults.length; i += 1) {
      for (let j = 0; j < arrOfCorrectResults[i].length; j += 1) {
        if (arrValueZero[j] === 1 && arrOfCorrectResults[i][j] === 1) {
          zero += 1;
          console.log(zero);
          if (zero === 3) {
            return true;
          }
        }
      }
      zero = 0;
    }
  }
  return false;
}

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
    cell.classList.remove('hover-cross');
    arrValueCross[cell.dataset.cell] = 1;
    if (compareArrayValues()) {
      console.log('Win X!!!');
    }
    move = 'zero';
  } else {
    cell.classList.add('zero');
    cell.classList.remove('hover-zero');
    arrValueZero[cell.dataset.cell] = 1;
    if (compareArrayValues()) {
      console.log('Win 0!!!');
    }
    move = 'cross';
  }
}

cells.forEach((cell) => {
  cell.addEventListener('mouseover', mouseoverOnElem); // Наведении мышки на Х
  cell.addEventListener('mouseout', mouseoutElem); // Отведение мышки
  cell.addEventListener('click', clickOnElem); // Клик X
});

btn.addEventListener('click', dataUpdate); // Событие по клику на кнопку
