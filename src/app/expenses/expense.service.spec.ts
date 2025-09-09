import { TestBed } from "@angular/core/testing";
import { expenseService } from "./expense";
import { Expense } from "../models/expense.model"

describe("expenseService", () => {
    let service: expenseService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(expenseService);
        // Clear localStorage for isolation
        localStorage.clear();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should add an expense", () => {
        const expense: Expense = {
            id: "",
            amount: 100,
            category: "Food",
            description: "Lunch",
            date: new Date()
        };
        service.addExpense(expense);
        const expenses = service.getExpenses();
        expect(expenses.length).toBeGreaterThan(0);
        expect(expenses[expenses.length - 1].amount).toBe(100);
    });

    it("should get expense by id", () => {
        const expense: Expense = {
            id: "",
            amount: 50,
            category: "Transport",
            description: "Taxi",
            date: new Date()
        };
        service.addExpense(expense);
        const added = service.getExpenses()[service.getExpenses().length - 1];
        const found = service.getExpenseById(added.id);
        expect(found).toBeTruthy();
        expect(found?.description).toBe("Taxi");
    });

    it("should update an expense", () => {
        const expense: Expense = {
            id: "",
            amount: 20,
            category: "Food",
            description: "Snack",
            date: new Date()
        };
        service.addExpense(expense);
        const added = service.getExpenses()[service.getExpenses().length - 1];
        added.amount = 30;
        service.updateExpense(added);
        const updated = service.getExpenseById(added.id);
        expect(updated?.amount).toBe(30);
    });

    it("should delete an expense", () => {
        const expense: Expense = {
            id: "",
            amount: 10,
            category: "Food",
            description: "Candy",
            date: new Date()
        };
        service.addExpense(expense);
        const added = service.getExpenses()[service.getExpenses().length - 1];
        service.deleteExpense(added.id);
        const found = service.getExpenseById(added.id);
        expect(found).toBeUndefined();
    });

    it("should add a category", () => {
        service.addCategory("NewCategory");
        const categories = service.getCategories();
        expect(categories.some(cat => cat.name === "NewCategory")).toBeTrue();
    });

    it("should get expenses by category", () => {
        service.addExpense({
            id: "",
            amount: 40,
            category: "TestCat",
            description: "Test",
            date: new Date()
        });
        const expenses = service.getExpensesByCategory("TestCat");
        expect(expenses.length).toBeGreaterThan(0);
        expect(expenses[0].category).toBe("TestCat");
    });
});
