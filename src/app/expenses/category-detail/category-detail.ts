import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Expense } from '../../models/expense.model';
import { expenseService } from '../expense';

@Component({
  selector: 'app-category-detail',
  standalone: false,
  templateUrl: './category-detail.html',
  styleUrl: './category-detail.scss'
})
export class CategoryDetail implements OnInit {

  categoryName: string | null = '';
  expenses: Expense[] = [];

  constructor(
    private route: ActivatedRoute,
    private expenseService: expenseService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('categoryName');
      if (this.categoryName) {
        this.expenses = this.expenseService.getExpensesByCategory(this.categoryName);
      }
    });
  }
}
