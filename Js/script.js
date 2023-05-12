const inputFormLimitNode = document.querySelector('[data-find="limitInput"]');
const inputFormExpensesNode = document.querySelector('[data-find="expensesInput"]');
const limitBtn = document.querySelector('[data-find="LimitBtn"]');
const resetBtn = document.querySelector('[data-find="resetBtn"]');
const historyNode = document.querySelector('[data-find="history"]');
const formExpenses = document.querySelector('[data-find="form-expenses"]');
const formLimit = document.querySelector('[data-find="form-limit"]');
const sumNode = document.querySelector('[data-find="sum"]');
const limitNode = document.querySelector('[data-find="limit"]');
const balanceNode = document.querySelector('[data-find="balance"]');

let expenses = [];
let sum;
let limit;


formLimit.addEventListener('submit', function (e) {  // Функция задающая лимит трат.
  e.preventDefault();
  if (!inputFormLimitNode.value) {
    return;
  }
  limit = +inputFormLimitNode.value.replace("," , ".");
  formLimit.classList.add("js-closed");
  formExpenses.classList.add("js-open");

  const limInfo = document.querySelector('.info__limit');
  limInfo.classList.add('js-active');

  console.log(limit)

  limitNode.innerText = (limit + ' \u20bd');

  if (expenses.length === 0) {
    balanceNode.innerText = (limit + ' \u20bd');
  } else {
    let balanceN = limit - sum;
    balanceNode.innerText = (+balanceN.toFixed(2) + ' \u20bd');
  }

  inputFormExpensesNode.value = "";

  // ----------------------------------
  formExpenses.addEventListener('submit', function (e) {
    e.preventDefault();
    resetBtn.addEventListener('click', function () {
      resetBtn.classList.remove('js-active');

      expenses.length = 0;

      let expensesListHTML = '';
      let sum = 0;
      historyNode.innerHTML = " - ";
      sumNode.innerText = (sum.toFixed(2) + ' \u20bd');
      balanceNode.innerText = (limit + ' \u20bd');
      
    });

    if (!inputFormExpensesNode.value) {
      return;
    } 
    
    const history = document.querySelector('.__history');
    history.classList.add('js-active');

    resetBtn.classList.add('js-active');
    
    const sumInfo = document.querySelector('.info__sum');
    const balanceInfo = document.querySelector('.info__balance');
    sumInfo.classList.add('js-active');
    balanceInfo.classList.add('js-active');
  
    const expense = +inputFormExpensesNode.value.replace("," , ".");

    expenses.push(expense);
    
    inputFormExpensesNode.value = '';
  
    let expensesListHTML = '';
    sum = 0;

    expenses.forEach(element => {
      expensesListHTML += `<li>${element} &#8381</li>`;
      sum += element;
    });
    
    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
  
    sumNode.innerText = (sum.toFixed(2) + ' \u20bd');

    let balanceN = limit - sum;
    balanceNode.innerText = (+balanceN.toFixed(2) + ' \u20bd');

    console.log(+balanceN.toFixed(2));

  });

  const limitChange = document.querySelector(".js-info__limit-change");
  limitChange.addEventListener('click', function () {
    formLimit.classList.remove("js-closed");
    formExpenses.classList.remove("js-open");
    inputFormLimitNode.value = "";
  });
  // -----------------------------------
});
