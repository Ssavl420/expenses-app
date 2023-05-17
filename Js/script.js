const CURRENCY = ' \u20bd';
const statusGood = "#29aa18";
const statusNorm = "orange";
const statusBad = "red";
const notSelected = 'Выберите категорию:';
const CloseItem_CLASSNAME = "js-closed";
const OpenItem_CLASSNAME = "js-open";

const formLimit = document.querySelector('[data-find="form-limit"]');
const formExpenses = document.querySelector('[data-find="form-expenses"]');

const limitNode = document.querySelector('[data-find="limit"]');
const limitInfo = document.querySelector('[data-find="infoLimit"]');
const sumInfo = document.querySelector('[data-find="sumInfo"]');
const balanceInfo = document.querySelector('[data-find="balanceInfo"]');
const history = document.querySelector('[data-find="history"]');
const balanceNode = document.querySelector('[data-find="balance"]');
const historyNode = document.querySelector('[data-find="historyNode"]');
const sumNode = document.querySelector('[data-find="sum"]');

const inputFormLimitNode = document.querySelector('[data-find="limitInput"]');
const inputFormExpensesNode = document.querySelector('[data-find="expensesInput"]');
const inputFormCategoriesNode = document.querySelector('[data-find="categoryInput"]');

const limitBtn = document.querySelector('[data-find="LimitBtn"]');
const resetBtn = document.querySelector('[data-find="resetBtn"]');

const empty = "";

const limitChange = document.querySelector('[data-find="changeLimit"]');
const statusBalance = document.querySelector('[data-find="balanceStatus"]');

let expenses = [];
let categories = [];
let limit;
let sum;
let balance;
let categoryListHTML;
let expensesListHTML = '';

limit = localStorage.getItem('limit');
// ------------------------------------------------------------------------------------------------------------------------------------

if (!JSON.parse(localStorage.getItem('expenses')) == []) {
  expenses = JSON.parse(localStorage.getItem('expenses'))
  categories = JSON.parse(localStorage.getItem('categories'));
  initApp();
  getLimit();
  calcBalance();
  openStatistics();
  calcExpenses(expenses);
  showExpensesHistory()
  showBalance();
  getStatus();
  formExpenses.addEventListener('submit', function (e) {  // После нажатия кнопки "Добавить" - Фиксация трат и категории 
    e.preventDefault();
    if (!inputFormExpensesNode.value) {
      return;
    }
    createArrayExpenses();
    getCategory();
    openStatistics();
    clearExpenseForm();
    calcExpenses(expenses);
    showExpensesHistory();
    showBalance();
    getStatus();
  });
}

// ------------------------------------------------------------------------------------------------------------------------------------
formLimit.addEventListener('submit', function (e) {         // После нажатия кнопки "Утверждения лимита" - цепочка событий
  e.preventDefault();
  if (!inputFormLimitNode.value) {
    return;
  }
  getLimit();
  initApp();
  calcBalance();
    formExpenses.addEventListener('submit', function (e) {  // После нажатия кнопки "Добавить" - Фиксация трат и категории 
      e.preventDefault();
      if (!inputFormExpensesNode.value) {
        return;
      }
      createArrayExpenses();
      getCategory();
      openStatistics();
      clearExpenseForm();
      calcExpenses(expenses);
      showExpensesHistory();
      showBalance();
      getStatus();
    });
});
limitChange.addEventListener('click', changeLimit);         // После нажатия иконки "Изменение лимита" - Открывается окно ввода лимита.
resetBtn.addEventListener('click', resetHistory);           // После нажатия кнопки "Сбросить историю" - Сброс истории трат.
// ------------------------------------------------------------------------------------------------------------------------------------

// Открытие формы Expenses
function initApp () {
  formLimit.classList.add(CloseItem_CLASSNAME);
  formExpenses.classList.add(OpenItem_CLASSNAME);
  inputFormCategoriesNode.classList.add(OpenItem_CLASSNAME);
  limitInfo.classList.add(OpenItem_CLASSNAME);
}
// Получение лимита 
function getLimit () {
  if (!localStorage.getItem('limit') == 0 && inputFormLimitNode.value == 0) {
    limit = localStorage.getItem('limit')
  } else {
    limit = +inputFormLimitNode.value.replace("," , ".");
    localStorage.setItem('limit', JSON.stringify(limit));
  }
  inputFormExpensesNode.value = empty;
  limitNode.innerText = (limit + CURRENCY);
}
// Изменение лимита
function changeLimit () {
  formLimit.classList.remove(CloseItem_CLASSNAME);
  formExpenses.classList.remove(OpenItem_CLASSNAME);
  inputFormCategoriesNode.classList.remove(OpenItem_CLASSNAME);
  getStatus();
  inputFormLimitNode.value = empty;
}
// Получение категории
function getCategory () {
  let category;
  category = inputFormCategoriesNode.value;
  categories.push(category);
  localStorage.setItem('categories', JSON.stringify(categories));
  inputFormCategoriesNode.value = notSelected;
}
// Расчет баланса
function calcBalance () {
  if (expenses === null || expenses.length === 0) {
    balanceNode.innerText = (limit + CURRENCY);
  } else {
    balance = limit - sum;
    balanceNode.innerText = (+balance.toFixed(2) + CURRENCY);
  }
  getStatus();
}
// Получение статуса
function getStatus () {
  if (sum <= limit || sum === 0) {
    statusBalance.style.backgroundColor = statusGood;
  } if (sum >= (limit * 0.85)) {
    statusBalance.style.backgroundColor = statusNorm;
  } if (sum >= limit) {
    statusBalance.style.backgroundColor = statusBad;
  }
}
// Сброс истории и local Storage
function resetHistory () {
  resetBtn.classList.remove(OpenItem_CLASSNAME);

  expenses.length = 0;
  categories.length = 0;

  expensesListHTML = '';
  sum = 0;
  historyNode.innerHTML = " - ";
  sumNode.innerText = (sum.toFixed(2) + CURRENCY);
  balanceNode.innerText = (limit + CURRENCY);

  statusBalance.style.backgroundColor = statusGood;
  localStorage.removeItem('expenses');
  localStorage.removeItem('categories');
}
// Открытие баланса, расхода, истории трат и кнопки сброса. 
function openStatistics() {
  history.classList.add(OpenItem_CLASSNAME);
  resetBtn.classList.add(OpenItem_CLASSNAME);
  // sumInfo.classList.add(OpenItem_CLASSNAME);
  // balanceInfo.classList.add(OpenItem_CLASSNAME);
}
// Создать массив расходов
function createArrayExpenses () {
  const expense = +inputFormExpensesNode.value.replace("," , ".");
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  }
// Вычисление суммы трат из истории Expenses
function calcExpenses(expenses) {
  sum = 0;
  expenses.forEach(element => {
  sum += element;
})
return sum;
}
// Вывод истории (массива Expenses и Categories) в HTML
function showExpensesHistory() {
  let expensesListHTML = '';
  for (let i = 0; i < expenses.length; i++) {
    if (categories[i] === notSelected) {
      expensesListHTML += `<li>${expenses[i]} ${CURRENCY}</li>`;
    } else {
      expensesListHTML += `<li>${expenses[i]} ${CURRENCY} <br> ${categories[i]}</li>`
    }
  }
  historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
}
// Отчистка формы Expenses
function clearExpenseForm () {
  inputFormExpensesNode.value = empty;
}
  // Показать баланс и расходы
  function showBalance () {
    sumInfo.classList.add(OpenItem_CLASSNAME);
    balanceInfo.classList.add(OpenItem_CLASSNAME);
    sumNode.innerText = (sum.toFixed(2) + CURRENCY);
    balance = limit - sum;
    balanceNode.innerText = (+balance.toFixed(2) + CURRENCY);
  }
// ------------------------------------------------------------------------------------------------------------------------------------






