import { Injectable } from '@angular/core';
import { Expense, Category } from '../models/expense.model';
import { v4 as uuidv4 } from 'uuid'; // Kita akan menginstal library ini

@Injectable({
  providedIn: 'root'
})

export class expenseService {

  private expenses: Expense[] = [];
  private categories: Category[] = []; // Ubah menjadi array kosong
  private defaultCategories: Category[] = [
    { name: 'Makanan' },
    { name: 'Transportasi' },
    { name: 'Belanja' },
    { name: 'Tagihan' }
  ];

  constructor() {
    this.loadExpenses();
    this.loadCategories(); // Panggil metode baru untuk memuat kategori
  }

  // Metode untuk memuat data dari localStorage saat aplikasi dimulai
  private loadExpenses(): void {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      // Jika ada data di localStorage, parse string JSON kembali menjadi array objek
      try {
        this.expenses = JSON.parse(storedExpenses).map((exp: any) => ({
          ...exp,
          // Mengkonversi string tanggal kembali menjadi objek Date
          date: new Date(exp.date)
        }));
      } catch (e) {
        console.error("Gagal memuat data dari localStorage, menggunakan data default.", e);
        this.resetToDefaultExpenses();
      }
    } else {
      // Jika tidak ada data, gunakan data dummy (default)
      this.resetToDefaultExpenses();
    }
  }

  // Metode untuk menyimpan data ke localStorage
  private saveExpenses(): void {
    try {
      // Konversi array objek menjadi string JSON sebelum disimpan
      localStorage.setItem('expenses', JSON.stringify(this.expenses));
    } catch (e) {
      console.error("Gagal menyimpan data ke localStorage.", e);
    }
  }

  // Metode untuk menyiapkan data dummy
  private resetToDefaultExpenses(): void {
    this.expenses = [
      { id: uuidv4(), amount: 50000, category: 'Makanan', description: 'Makan siang di kantor', date: new Date() },
      { id: uuidv4(), amount: 25000, category: 'Transportasi', description: 'Ongkos taksi online', date: new Date() }
    ];
    this.saveExpenses(); // Simpan data dummy ke localStorage
  }

  // Metode baru: Memuat kategori dari localStorage
  private loadCategories(): void {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      try {
        this.categories = JSON.parse(storedCategories);
      } catch (e) {
        console.error("Gagal memuat kategori dari localStorage, menggunakan data default.", e);
        this.categories = this.defaultCategories;
        this.saveCategories();
      }
    } else {
      this.categories = this.defaultCategories;
      this.saveCategories();
    }
  }

  // Metode baru: Menyimpan kategori ke localStorage
  private saveCategories(): void {
    try {
      localStorage.setItem('categories', JSON.stringify(this.categories));
    } catch (e) {
      console.error("Gagal menyimpan kategori ke localStorage.", e);
    }
  }

  // Mengambil semua pengeluaran
  getExpenses(): Expense[] {
    return this.expenses;
  }

  // Menambahkan pengeluaran baru
  addExpense(expense: Expense): void {
    expense.id = uuidv4(); // Memberikan ID unik
    this.expenses.push(expense);
    this.saveExpenses(); // Panggil metode ini untuk menyimpan perubahan
    console.log('Pengeluaran baru ditambahkan:', this.expenses);
  }

  // Metode baru: Cari pengeluaran berdasarkan ID
  getExpenseById(id: string): Expense | undefined {
    return this.expenses.find(exp => exp.id === id);
  }

  // Metode baru: Perbarui pengeluaran
  updateExpense(updatedExpense: Expense): void {
    const index = this.expenses.findIndex(exp => exp.id === updatedExpense.id);
    if (index !== -1) {
      this.expenses[index] = updatedExpense;
      this.saveExpenses(); // Panggil metode ini untuk menyimpan perubahan
      console.log('Pengeluaran berhasil diperbarui:', this.expenses);
    }
  }

  // Mengambil daftar kategori
  getCategories(): Category[] {
    return this.categories;
  }

  // Metode baru: Menambahkan kategori baru dari UI
  addCategory(categoryName: string): void {
    const existingCategory = this.categories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
    if (!existingCategory) {
      const newCategory: Category = { name: categoryName };
      this.categories.push(newCategory);
      this.saveCategories(); // Simpan perubahan ke localStorage
      console.log('Kategori baru ditambahkan:', this.categories);
    }
  }

}