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
    this.loadExpenses();
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

  // Mengambil daftar kategori
  getCategories(): Category[] {
    return this.categories;
  }

  // Menambahkan fitur baru: Menambahkan kategori baru
  addCategory(category: Category): void {
    this.categories.push(category);
    // Jika Anda ingin kategori juga persisten, tambahkan logika penyimpanan di sini
  }
}