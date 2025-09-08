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
export class AddExpense implements OnInit{

  newExpense: Expense = {
    id: '',
    amount: 0,
    category: '',
    description: '',
    date: new Date()
  };

  categories: Category[] = [];

  constructor(
    private expenseService: expenseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categories = this.expenseService.getCategories();
  }

  onSubmit(): void {
    if (this.newExpense.amount > 0 && this.newExpense.category) {
      this.expenseService.addExpense(this.newExpense);
      this.router.navigate(['/expenses/dashboard']);
    }
  }
}