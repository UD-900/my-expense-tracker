import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExpense } from './add-expense/add-expense';
import { ExpenseList } from './expense-list/expense-list';
import { Dashboard } from './dashboard/dashboard';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Diperlukan untuk form

const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'add', component: AddExpense },
  { path: 'list', component: ExpenseList },
];

@NgModule({
  declarations: [
    AddExpense,
    ExpenseList,
    Dashboard
  ],
  imports: [
    CommonModule,
    FormsModule, // Jangan lupa import ini!
    RouterModule.forChild(routes)
  ]
})
export class ExpensesModule { }
