import { Injectable } from '@angular/core';
import { Expense, Category } from '../models/expense.model';
import { v4 as uuidv4 } from 'uuid'; // Kita akan menginstal library ini

@Injectable({
  providedIn: 'root'
})

export class expenseService {

  private expenses: Expense[] = [];
  private categories: Category[] = [
    { name: 'Makanan' },
    { name: 'Transportasi' },
    { name: 'Belanja' },
    { name: 'Tagihan' }
  ];

  constructor() {
    // Data dummy untuk pengujian
    this.expenses.push(
      { id: uuidv4(), amount: 50000, category: 'Makanan', description: 'Makan siang di kantor', date: new Date() },
      { id: uuidv4(), amount: 25000, category: 'Transportasi', description: 'Ongkos taksi online', date: new Date() }
    );
  }

  getExpenses(): Expense[] {
    return this.expenses;
  }

  addExpense(expense: Expense): void {
    expense.id = uuidv4(); // Beri ID unik
    this.expenses.push(expense);
    console.log('Pengeluaran baru ditambahkan:', this.expenses);
  }

  getCategories(): Category[] {
    return this.categories;
  }

  // Tambahkan fitur baru: Menambahkan kategori baru
  addCategory(category: Category): void {
    this.categories.push(category);
  }
}