document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  // Retrieve data from localStorage
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = parseFloat(localStorage.getItem("totalAmount")) || 0;

  // Render initial data
  renderExpenses();
  updateTotalDisplay();

  expenseForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = expenseNameInput.value.trim();
      const amount = parseFloat(expenseAmountInput.value.trim());

      if (name !== "" && !isNaN(amount) && amount > 0) {
          const newExpense = {
              id: Date.now(),
              name: name,
              amount: amount,
          };
          expenses.push(newExpense);
          totalAmount += amount; // Update total amount
          saveDataToLocalStorage();
          renderExpenses();
          updateTotalDisplay();

          // Clear input
          expenseNameInput.value = "";
          expenseAmountInput.value = "";
      } else {
          alert("Please enter a valid name and amount.");
      }
  });

  function renderExpenses() {
      expenseList.innerHTML = "";
      expenses.forEach((expense) => {
          const li = document.createElement("li");
          li.innerHTML = `
            ${expense.name} - $${expense.amount}
            <button data-id="${expense.id}">Delete</button>
            `;
          expenseList.appendChild(li);
      });
  }

  function updateTotalDisplay() {
      totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }

  function saveDataToLocalStorage() {
      localStorage.setItem("expenses", JSON.stringify(expenses));
      localStorage.setItem("totalAmount", totalAmount.toFixed(2));
  }

  expenseList.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
          const expenseId = parseInt(e.target.getAttribute("data-id"));
          const expenseToDelete = expenses.find((expense) => expense.id === expenseId);

          if (expenseToDelete) {
              totalAmount -= expenseToDelete.amount; // Deduct from total amount
              expenses = expenses.filter((expense) => expense.id !== expenseId);
              saveDataToLocalStorage();
              renderExpenses();
              updateTotalDisplay();
          }
      }
  });
});
