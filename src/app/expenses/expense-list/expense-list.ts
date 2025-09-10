import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models/expense.model';
import { expenseService } from '../expense';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../shared/confirmation-dialog/confirmation-dialog';

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
    private router: Router,
    private dialog: MatDialog
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
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        title: 'Hapus Pengeluaran',
        message: 'Apakah Anda yakin ingin menghapus pengeluaran ini?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.expenseService.deleteExpense(id);
        this.loadExpenses();
      }
    })
  }
}