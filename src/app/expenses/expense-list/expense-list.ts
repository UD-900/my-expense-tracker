import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models/expense.model';
import { expenseService } from '../expense';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  standalone: false,
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.scss'
})
export class ExpenseList implements OnInit {

  expenses: Expense[] = [];

  constructor(
    private expenseService: expenseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadExpenses();
  }

  // Metode baru untuk memuat ulang daftar
  loadExpenses(): void {
    this.expenses = this.expenseService.getExpenses();
  }

  // Metode baru untuk menghapus pengeluaran
  deleteExpense(id: string): void {
    const confirmation = confirm('Apakah Anda yakin ingin menghapus pengeluaran ini?');
    if (confirmation) {
      this.expenseService.deleteExpense(id);
      this.loadExpenses(); // Muat ulang daftar setelah penghapusan
    }
  }


}