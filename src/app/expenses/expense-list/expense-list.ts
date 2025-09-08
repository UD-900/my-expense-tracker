import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models/expense.model';
import { expenseService } from '../expense';

@Component({
  selector: 'app-expense-list',
  standalone: false,
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.scss'
})
export class ExpenseList implements OnInit {

  expenses: Expense[] = [];

  constructor(private expenseService: expenseService) { }

  ngOnInit(): void {
    this.expenses = this.expenseService.getExpenses();
  }
}