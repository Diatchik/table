import { orders } from './orders.js';

const tbody = document.querySelector('tbody');
const thead = document.querySelector('thead');
const th = document.querySelectorAll('thead th');
const err = document.querySelector('.err');


// CREATION
orders.forEach((order) => {
  const values = Object.values(order);
  let row = tbody.insertRow(-1);
  row.className = 'order';

  for (const value of values) {
    let cell = row.insertCell();
    cell.innerHTML = value;
  }
});

// FILTER
let filterInput = document.querySelector('.filter-input');
const order = document.querySelectorAll('.order');

filterInput.addEventListener('keyup', () => {
  let criteria = filterInput.value.toUpperCase().trim();
  let j = 0;

  order.forEach((data) => {
    thead.style.opacity = '1'
    err.style.display = '';

    if (data.innerText.toUpperCase().indexOf(criteria) > -1) {
      data.style.display = '';
    } else {
      data.style.display = 'none';
      j++;
      if (j === order.length) {
        thead.style.opacity = '0.2'
        err.style.display = 'flex';
      }
    }
  });
});

// SORT
let sortDirection;

th.forEach((col, idx) => {
  col.addEventListener('click', () => {
    sortDirection = !sortDirection;
    const rowsArrFromNodeList = Array.from(order);
    const filteredRows = rowsArrFromNodeList.filter(item => item.style.display != 'none');

    filteredRows.sort((a, b) => {
      return a.childNodes[idx].innerHTML.localeCompare(b.childNodes[idx].innerHTML, 'en', { numeric: true, sensitivity: 'base' });
    }).forEach((row) => {
      sortDirection ? tbody.insertBefore(row, tbody.childNodes[tbody.length]) : tbody.insertBefore(row, tbody.childNodes[0]);
    });

  });
});