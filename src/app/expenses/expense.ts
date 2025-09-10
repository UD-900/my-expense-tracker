import { Injectable } from '@angular/core';
import { Expense, Category, MonthlyBillTemplate, MonthlyBill } from '../models/expense.model';
import { v4 as uuidv4 } from 'uuid'; // Kita akan menginstal library ini

@Injectable({
  providedIn: 'root'
})

export class expenseService {

  private expenses: Expense[] = [];
  private categories: Category[] = [];
  private defaultCategories: Category[] = [
    { name: 'Makanan' },
    { name: 'Transportasi' },
    { name: 'Belanja' },
    { name: 'Tagihan' }
  ];

  private billTemplates: MonthlyBillTemplate[] = [];

  constructor() {
    this.loadExpenses();
    this.loadCategories();
    this.loadBillTemplates();
  }

  // --- Logika untuk Expense ---
  private loadExpenses(): void {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      try {
        this.expenses = JSON.parse(storedExpenses).map((exp: any) => ({
          ...exp,
          date: new Date(exp.date)
        }));
      } catch (e) {
        this.resetToDefaultExpenses();
      }
    } else {
      this.resetToDefaultExpenses();
    }
  }

  private saveExpenses(): void {
    try {
      localStorage.setItem('expenses', JSON.stringify(this.expenses));
    } catch (e) {
      console.error("Gagal menyimpan pengeluaran ke localStorage.", e);
    }
  }

  private resetToDefaultExpenses(): void {
    this.expenses = [
      { id: uuidv4(), amount: 50000, category: 'Makanan', description: 'Makan siang di kantor', date: new Date() },
      { id: uuidv4(), amount: 25000, category: 'Transportasi', description: 'Ongkos taksi online', date: new Date() }
    ];
    this.saveExpenses();
  }

  getExpenses(): Expense[] {
    return this.expenses;
  }

  addExpense(expense: Expense): void {
    expense.id = uuidv4();
    this.expenses.push(expense);
    this.saveExpenses();
  }

  getExpenseById(id: string): Expense | undefined {
    return this.expenses.find(exp => exp.id === id);
  }

  updateExpense(updatedExpense: Expense): void {
    const index = this.expenses.findIndex(exp => exp.id === updatedExpense.id);
    if (index !== -1) {
      this.expenses[index] = updatedExpense;
      this.saveExpenses();
    }
  }

  deleteExpense(id: string): void {
    const index = this.expenses.findIndex(exp => exp.id === id);
    if (index !== -1) {
      this.expenses.splice(index, 1);
      this.saveExpenses();
    }
  }

  getExpensesByCategory(categoryName: string): Expense[] {
    return this.expenses.filter(exp => exp.category.toLowerCase() === categoryName.toLowerCase());
  }

  // --- Logika untuk Kategori ---
  private loadCategories(): void {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      try {
        this.categories = JSON.parse(storedCategories);
      } catch (e) {
        this.categories = this.defaultCategories;
        this.saveCategories();
      }
    } else {
      this.categories = this.defaultCategories;
      this.saveCategories();
    }
  }

  private saveCategories(): void {
    try {
      localStorage.setItem('categories', JSON.stringify(this.categories));
    } catch (e) {
      console.error("Gagal menyimpan kategori ke localStorage.", e);
    }
  }

  getCategories(): Category[] {
    return this.categories;
  }

  addCategory(categoryName: string): void {
    const existingCategory = this.categories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
    if (!existingCategory) {
      const newCategory: Category = { name: categoryName };
      this.categories.push(newCategory);
      this.saveCategories();
    }
  }

  // --- Logika untuk Template Tagihan Bulanan (BARU) ---
  private loadBillTemplates(): void {
    const storedTemplates = localStorage.getItem('billTemplates');
    if (storedTemplates) {
      try {
        this.billTemplates = JSON.parse(storedTemplates);
      } catch (e) {
        this.billTemplates = [];
      }
    } else {
      this.billTemplates = [];
    }
  }

  private saveBillTemplates(): void {
    localStorage.setItem('billTemplates', JSON.stringify(this.billTemplates));
  }

  getBillTemplates(): MonthlyBillTemplate[] {
    return this.billTemplates;
  }

  addBillTemplate(template: MonthlyBillTemplate): void {
    template.id = uuidv4();
    this.billTemplates.push(template);
    this.saveBillTemplates();
  }

  updateBillTemplate(updatedTemplate: MonthlyBillTemplate): void {
    const index = this.billTemplates.findIndex(t => t.id === updatedTemplate.id);
    if (index !== -1) {
      this.billTemplates[index] = updatedTemplate;
      this.saveBillTemplates();
    }
  }

  deleteBillTemplate(id: string): void {
    const index = this.billTemplates.findIndex(t => t.id === id);
    if (index !== -1) {
      this.billTemplates.splice(index, 1);
      this.saveBillTemplates();
    }
  }

  // --- Logika untuk menghasilkan Tagihan Bulanan (BARU) ---
  getMonthlyBillsForCurrentMonth(): MonthlyBill[] {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const bills: MonthlyBill[] = [];

    this.billTemplates.forEach(template => {
      const dueDate = new Date(currentYear, currentMonth, template.dueDate);
      const paidExpense = this.expenses.find(exp =>
        exp.category === template.category &&
        exp.description.includes(template.name) &&
        exp.date.getMonth() === currentMonth &&
        exp.date.getFullYear() === currentYear
      );

      bills.push({
        id: template.id,
        name: template.name,
        amount: template.amount,
        category: template.category,
        dueDate: dueDate,
        isPaid: !!paidExpense,
        isUnPaid: !!paidExpense,
        paidDate: paidExpense ? paidExpense.date : undefined,
        paidExpenseId: paidExpense ? paidExpense.id : undefined
      });


    });

    return bills;
  }

  // Perbarui metode untuk menandai sudah dibayar
  markBillAsPaid(bill: MonthlyBill): void {
    const paidExpense: Expense = {
      id: uuidv4(),
      amount: bill.amount,
      category: bill.category,
      description: bill.name,
      date: new Date()
    };
    this.addExpense(paidExpense);
  }

  // Metode BARU untuk membatalkan pembayaran
  unmarkBillAsPaid(bill: MonthlyBill): void {
    if (bill.paidExpenseId) {
      this.deleteExpense(bill.paidExpenseId);
    }
  }

  // Metode baru: Mengambil pengeluaran yang dikelompokkan per bulan
  getGroupedExpensesByMonth(): { [key: string]: Expense[] } {
    const groupedExpenses: { [key: string]: Expense[] } = {};

    this.expenses.forEach(expense => {
      const month = expense.date.getMonth() + 1; // getMonth() dimulai dari 0
      const year = expense.date.getFullYear();
      const key = `${year}-${month.toString().padStart(2, '0')}`; // Contoh: "2023-09"

      if (!groupedExpenses[key]) {
        groupedExpenses[key] = [];
      }
      groupedExpenses[key].push(expense);
    });

    return groupedExpenses;
  }

  // Metode baru: Mengambil data pengeluaran per kategori untuk chart
  getExpensesForChartByCategory(): { labels: string[], data: number[] } {
    const categoryTotals: { [key: string]: number } = {};

    this.expenses.forEach(expense => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }
      categoryTotals[expense.category] += expense.amount;
    });

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);

    return { labels, data };
  }


}