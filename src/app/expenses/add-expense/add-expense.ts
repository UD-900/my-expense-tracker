import { Component, OnInit } from '@angular/core';
import { Expense, Category } from '../../models/expense.model';
import { Router } from '@angular/router';
import { expenseService } from '../expense';

@Component({
  selector: 'app-add-expense',
  standalone: false,
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.scss'
})
export class AddExpense implements OnInit {

  newExpense: Expense = {
    id: '',
    amount: 0,
    category: '',
    description: '',
    date: new Date()
  };

  expenseDate: string = new Date().toISOString().substring(0, 10); // Variabel baru untuk tanggal, inisialisasi dengan tanggal hari ini
  newCategoryName: string = ''; // Variabel baru untuk kategori
  categories: Category[] = [];

  constructor(
    private expenseService: expenseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categories = this.expenseService.getCategories();
  }

  onSubmit(): void {
    if (this.newCategoryName) {
      this.expenseService.addCategory(this.newCategoryName);
      this.newExpense.category = this.newCategoryName;
    }

    // Pastikan input tanggal dan kategori/jumlah terisi
    if (this.expenseDate && this.newExpense.amount > 0 && this.newExpense.category) {
      // Konversi string tanggal dari form menjadi objek Date
      this.newExpense.date = new Date(this.expenseDate);

      this.expenseService.addExpense(this.newExpense);
      this.router.navigate(['/expenses/dashboard']);
    } else {
      // Opsi: Tampilkan pesan error jika data tidak lengkap
      console.log('Formulir tidak lengkap.');
    }
  }
}