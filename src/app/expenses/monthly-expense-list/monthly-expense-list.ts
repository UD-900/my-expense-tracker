import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models/expense.model';
import { MatDialog } from '@angular/material/dialog';
import { expenseService } from '../expense';
import { ConfirmationDialog } from '../../shared/confirmation-dialog/confirmation-dialog';


@Component({
  selector: 'app-monthly-expense-list',
  standalone: false,
  templateUrl: './monthly-expense-list.html',
  styleUrl: './monthly-expense-list.scss'
})
export class MonthlyExpenseList implements OnInit {

  monthlyExpenses: { [key: string]: Expense[] } = {};

  constructor(
    private expenseService: expenseService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadMonthlyExpenses();
  }

  loadMonthlyExpenses(): void {
    this.monthlyExpenses = this.expenseService.getGroupedExpensesByMonth();
  }

  getMonthName(key: string): string {
    const [year, month] = key.split('-');
    const date = new Date(+year, +month - 1, 1);
    return date.toLocaleString('default', { month: 'long' });
  }

  getYear(key: string): string {
    return key.split('-')[0];
  }

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
        this.loadMonthlyExpenses();
      }
    });
  }
}