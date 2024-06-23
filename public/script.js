let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('select_category');
const amountInput = document.getElementById('amount');
const infoInput = document.getElementById('info');
const dateInput = document.getElementById('date');
const addBtn = document.getElementById('add_btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

addBtn.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission

    const category = categorySelect.value;
    const info = infoInput.value;
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;

    if (!category) {
        alert("Please select a category");
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (!info) {
        alert('Please enter valid info');
        return;
    }
    if (!date) {
        alert('Please select a date');
        return;
    }

    const expense = { category, amount, info, date };
    expenses.push(expense);

    if (category === 'Income') {
        totalAmount += amount;
    } else if (category === 'Expense') {
        totalAmount -= amount;
    }
    totalAmountCell.textContent = totalAmount.toFixed(2);

    const newRow = expenseTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const infoCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount.toFixed(2);
    infoCell.textContent = expense.info;
    dateCell.textContent = expense.date;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        deleteExpense(expense, newRow);
    });
    deleteCell.appendChild(deleteBtn);

    clearForm();
});

function deleteExpense(expense, row) {
    const index = expenses.indexOf(expense);
    if (index > -1) {
        expenses.splice(index, 1);
    }

    if (expense.category === 'Income') {
        totalAmount -= expense.amount;
    } else if (expense.category === 'Expense') {
        totalAmount += expense.amount;
    }
    totalAmountCell.textContent = totalAmount.toFixed(2);

    expenseTableBody.removeChild(row);
}

function clearForm() {
    categorySelect.value = '';
    amountInput.value = '';
    infoInput.value = '';
    dateInput.value = '';
}

// Initial rendering if there are any expenses
expenses.forEach(expense => {
    const newRow = expenseTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const infoCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount.toFixed(2);
    infoCell.textContent = expense.info;
    dateCell.textContent = expense.date;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        deleteExpense(expense, newRow);
    });
    deleteCell.appendChild(deleteBtn);
});
