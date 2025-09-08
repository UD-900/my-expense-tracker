import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExpense } from './add-expense/add-expense';
import { ExpenseList } from './expense-list/expense-list';
import { Dashboard } from './dashboard/dashboard';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EditExpense } from './edit-expense/edit-expense';
import { CategoryDetail } from './category-detail/category-detail';
import { BillTemplates } from './bill-templates/bill-templates';
import { MonthlyBills } from './monthly-bills/monthly-bills'; // Diperlukan untuk form

const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'add', component: AddExpense },
  { path: 'list', component: ExpenseList },
  { path: 'edit/:id', component: EditExpense },
  { path: 'category/:categoryName', component: CategoryDetail },
  { path: 'bills', component: MonthlyBills },
  { path: 'bill-templates', component: BillTemplates }
];

@NgModule({
  declarations: [
    AddExpense,
    ExpenseList,
    Dashboard,
    EditExpense,
    CategoryDetail,
    BillTemplates,
    MonthlyBills
  ],
  imports: [
    CommonModule,
    FormsModule, // Jangan lupa import ini!
    RouterModule.forChild(routes)
  ]
})
export class ExpensesModule { }
