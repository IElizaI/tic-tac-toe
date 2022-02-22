const cells = document.querySelectorAll('.cell');
const btn = document.querySelector('.btn-reset');
const whoseMove = document.querySelector('.whose-move');

let move = 'cross'; // Ход игрока Х
let arrValueCross = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let arrValueZero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const arrOfCorrectResults = [ // Массив выигрышных ходов
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
  whoseMove.innerText = 'Move X';
  arrValueCross = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  arrValueZero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

// Проверяет все ли ячейки заполнены классами
function allClassesAdded() {
  for (let i = 0; i < cells.length; i += 1) {
    if (cells[i].classList.contains('cross') !== true && cells[i].classList.contains('zero') !== true) {
      return false;
    }
  }
  return true;
}

// Сравнивает массив cross или zero с многомерным массивом победных значений
function compareArrayValues() {
  if (move === 'cross') {
    let cross = 0;
    for (let i = 0; i < arrOfCorrectResults.length; i += 1) {
      for (let j = 0; j < arrOfCorrectResults[i].length; j += 1) {
        if (arrValueCross[j] === 1 && arrOfCorrectResults[i][j] === 1) {
          cross += 1;
          if (cross === 3) {
            return 'win';
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
          if (zero === 3) {
            return 'win';
          }
        }
      }
      zero = 0;
    }
  }
  return allClassesAdded();
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

// Выводит окошко конца игры
function messageAboutWin(msg) {
  whoseMove.innerText = '';
  const main = document.querySelector('.main');
  const title = document.querySelector('.title');
  const winBackground = document.querySelector('.win-background');
  const winBtn = document.querySelector('.win-btn');
  const winMessage = document.querySelector('.win-message');
  winMessage.innerText = msg;
  main.style.opacity = '0.1';
  title.style.opacity = '0.1';
  winBackground.style.display = 'flex';

  // Начинает игру заново
  winBtn.addEventListener('click', () => {
    winMessage.innerText = '';
    main.style.opacity = '1';
    title.style.opacity = '1';
    winBackground.style.display = 'none';
    dataUpdate();
  });
}

// Добавление cross или zero по клику
function clickOnElem(event) {
  const cell = event.target;
  if (classСheck(cell)) {
    return;
  }
  if (move === 'cross') {
    whoseMove.innerText = 'Move 0';
    cell.classList.add('cross');
    cell.classList.remove('hover-cross');
    arrValueCross[cell.dataset.cell] = 1;
    if (compareArrayValues() === 'win') {
      messageAboutWin('Win X!!!');
    } else if (compareArrayValues()) {
      messageAboutWin("It's a draw!");
    }
    move = 'zero';
  } else {
    whoseMove.innerText = 'Move X';
    cell.classList.add('zero');
    cell.classList.remove('hover-zero');
    arrValueZero[cell.dataset.cell] = 1;
    if (compareArrayValues() === 'win') {
      messageAboutWin('Win 0!!!');
    } else if (compareArrayValues()) {
      messageAboutWin("It's a draw!");
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
