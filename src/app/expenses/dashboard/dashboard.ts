import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models/expense.model';
import { expenseService } from '../expense';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  expenses: Expense[] = [];
  totalExpenses: number = 0;
  expensesByCategory: { [key: string]: number } = {};

  constructor(private expenseService: expenseService) { }

  ngOnInit(): void {
    this.expenses = this.expenseService.getExpenses();
    this.calculateTotalAndByCategory();
  }

  calculateTotalAndByCategory(): void {
    this.totalExpenses = 0;
    this.expensesByCategory = {};

    this.expenses.forEach(expense => {
      this.totalExpenses += expense.amount;

      if (!this.expensesByCategory[expense.category]) {
        this.expensesByCategory[expense.category] = 0;
      }
      this.expensesByCategory[expense.category] += expense.amount;
    });
  }
}
