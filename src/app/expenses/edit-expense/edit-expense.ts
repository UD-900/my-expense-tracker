import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense, Category } from '../../models/expense.model';
import { expenseService } from '../expense';

@Component({
  selector: 'app-edit-expense',
  standalone: false,
  templateUrl: './edit-expense.html',
  styleUrl: './edit-expense.scss'
})
export class EditExpense implements OnInit {

  expense: Expense | undefined;
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private expenseService: expenseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categories = this.expenseService.getCategories();
    this.getExpenseToEdit();
  }

  getExpenseToEdit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.expense = this.expenseService.getExpenseById(id);
    }
  }

  onSubmit(): void {
    if (this.expense) {
      this.expenseService.updateExpense(this.expense);
      this.router.navigate(['/expenses/list']);
    }
  }

  goBack(): void {
    this.router.navigate(['/expenses/list']);
  }
}