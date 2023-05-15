const inputFormLimitNode = document.querySelector('[data-find="limitInput"]');
const inputFormExpensesNode = document.querySelector('[data-find="expensesInput"]');
const inputFormCategoriesNode = document.querySelector('[data-find="category"]');
const limitBtn = document.querySelector('[data-find="LimitBtn"]');
const resetBtn = document.querySelector('[data-find="resetBtn"]');
const historyNode = document.querySelector('[data-find="history"]');
const formExpenses = document.querySelector('[data-find="form-expenses"]');
const formLimit = document.querySelector('[data-find="form-limit"]');
const sumNode = document.querySelector('[data-find="sum"]');
const limitNode = document.querySelector('[data-find="limit"]');
const balanceNode = document.querySelector('[data-find="balance"]');


let expenses = [];
let categories = [];
let category;
let thisCategory;
let sum;
let limit;
let balanceN;
let statusBalance;
let categoryListHTML


// Вывод статуса
function addStatus () {
  statusBalance = document.querySelector('.js-status');
  if (sum <= limit || sum === 0) {
    statusBalance.style.backgroundColor = "#29aa18";
  } if (sum >= (limit * 0.85)) {
    statusBalance.style.backgroundColor = "orange";
  } if (sum >= limit) {
    statusBalance.style.backgroundColor = "red";
  }
}

// Получение категории
function addCategory () {
  category = inputFormCategoriesNode.value;
  categories.push(category);
  inputFormCategoriesNode.value = 'Выберите категорию:';

  // thisCategory = categories.map();

  // categoryListHTML = '';
  // categories.forEach(element => {
  //   categoryListHTML += `<p>${element}</p>`;
  // });

}


formLimit.addEventListener('submit', function (e) {  // Функция задающая лимит трат.
  e.preventDefault();
  if (!inputFormLimitNode.value) {
    return;
  }
  inputFormExpensesNode.value = "";
  limit = +inputFormLimitNode.value.replace("," , ".");
  formLimit.classList.add("js-closed");
  formExpenses.classList.add("js-open");

  const limInfo = document.querySelector('.info__limit');
  limInfo.classList.add('js-active');

  limitNode.innerText = (limit + ' \u20bd');

  if (expenses.length === 0) {
    balanceNode.innerText = (limit + ' \u20bd');
  } else {
    balanceN = limit - sum;
    balanceNode.innerText = (+balanceN.toFixed(2) + ' \u20bd');
    addStatus();
  }

  formExpenses.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!inputFormExpensesNode.value) {
      return;
    } 

    resetBtn.addEventListener('click', function () {
      resetBtn.classList.remove('js-active');

      expenses.length = 0;

      let expensesListHTML = '';
      let sum = 0;
      historyNode.innerHTML = " - ";
      sumNode.innerText = (sum.toFixed(2) + ' \u20bd');
      balanceNode.innerText = (limit + ' \u20bd');

      statusBalance.style.backgroundColor = "#29aa18";
    });
    
    const history = document.querySelector('.__history');
    history.classList.add('js-active');

    resetBtn.classList.add('js-active');
    
    const sumInfo = document.querySelector('.info__sum');
    const balanceInfo = document.querySelector('.info__balance');
    sumInfo.classList.add('js-active');
    balanceInfo.classList.add('js-active');
  
    const expense = +inputFormExpensesNode.value.replace("," , ".");

    expenses.push(expense);
    addCategory();
    console.log(categories)
    console.log(category)
    
    inputFormExpensesNode.value = '';
  
    let expensesListHTML = '';
    sum = 0;

    expenses.forEach(element => {
      // expensesListHTML += `<li>${element} &#8381</li>`;
      sum += element;
    });

    for (let i = 0; i < expenses.length; i++) {
      if (categories[i] === 'Выберите категорию:') {
        expensesListHTML += `<li>${expenses[i]} &#8381</li>`;
      } else {
        expensesListHTML += `<li>${expenses[i]} &#8381 <br> ${categories[i]}</li>`
      }
    }

    
    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
  
    sumNode.innerText = (sum.toFixed(2) + ' \u20bd');

    balanceN = limit - sum;
    balanceNode.innerText = (+balanceN.toFixed(2) + ' \u20bd');

    addStatus();

  });

  const limitChange = document.querySelector(".js-info__limit-change");
  limitChange.addEventListener('click', function () {
    formLimit.classList.remove("js-closed");
    formExpenses.classList.remove("js-open");
    addStatus();
    inputFormLimitNode.value = "";

  });
});
