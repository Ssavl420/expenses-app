const inputFormNode = document.querySelector('[data-find="expensesInput"]');
const inputBtn = document.querySelector('[data-find="expensesBtn"]');
const historyNode = document.querySelector('[data-find="history"]')
const form = document.querySelector('.form');
const sumNode = document.querySelector('[data-find="sum"]');

let expenses = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!inputFormNode.value) {
    return;
  } 

  const history = document.querySelector('.__history');
  history.classList.add('js-active');
  
  const info = document.querySelector('.__info');
  info.classList.add('js-active');

  const expense = +inputFormNode.value.replace("," , ".");
  expenses.push(expense);
  
  inputFormNode.value = '';

  let expensesListHTML = '';
  let sum = 0;
  expenses.forEach(element => {
    expensesListHTML += `<li>${element} &#8381</li>`;
    sum += element;
  });
  
  historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;

  sumNode.innerText = (sum + ' \u20bd');
});