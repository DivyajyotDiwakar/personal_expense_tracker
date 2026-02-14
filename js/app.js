$(document).ready(function () {

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    function saveToLocalStorage() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function renderExpenses() {
        const expenseList = $("#expense-list");
        expenseList.empty();

        expenses.forEach((expense, index) => {
            expenseList.append(`
                <tr>
                    <td>${expense.title}</td>
                    <td>₹${expense.amount}</td>
                    <td>${expense.date}</td>
                    <td>
                        <button class="btn btn-sm btn-warning edit-btn" data-index="${index}">Edit</button>
                        <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
                    </td>
                </tr>
            `);
        });
    }

    $("#expense-form").submit(function (e) {
        e.preventDefault();

        const id = $("#expense-id").val();
        const title = $("#title").val();
        const amount = $("#amount").val();
        const date = $("#date").val();

        if (id === "") {
            expenses.push({ title, amount, date });
        } else {
            expenses[id] = { title, amount, date };
            $("#expense-id").val("");
        }

        saveToLocalStorage();
        renderExpenses();
        this.reset();
    });

    $(document).on("click", ".edit-btn", function () {
        const index = $(this).data("index");
        const expense = expenses[index];

        $("#expense-id").val(index);
        $("#title").val(expense.title);
        $("#amount").val(expense.amount);
        $("#date").val(expense.date);
    });

    $(document).on("click", ".delete-btn", function () {
        const index = $(this).data("index");
        expenses.splice(index, 1);
        saveToLocalStorage();
        renderExpenses();
    });

    renderExpenses();
});
