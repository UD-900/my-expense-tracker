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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialog } from '../shared/confirmation-dialog/confirmation-dialog';
import { MonthlyExpenseList } from './monthly-expense-list/monthly-expense-list';

const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'add', component: AddExpense },
  { path: 'list', component: ExpenseList },
  { path: 'edit/:id', component: EditExpense },
  { path: 'category/:categoryName', component: CategoryDetail },
  { path: 'bills', component: MonthlyBills },
  { path: 'bill-templates', component: BillTemplates },
  { path: 'monthly-list', component: MonthlyExpenseList }
];

@NgModule({
  declarations: [
    AddExpense,
    ExpenseList,
    Dashboard,
    EditExpense,
    CategoryDetail,
    BillTemplates,
    MonthlyBills,
    ConfirmationDialog,
    MonthlyExpenseList
  ],
  imports: [
    CommonModule,
    FormsModule, // Jangan lupa import ini!
    RouterModule.forChild(routes),
    MatFormFieldModule,  // Modul untuk input form
    MatInputModule,      // Modul untuk input
    MatDatepickerModule, // Modul utama datepicker
    MatNativeDateModule,  // Modul untuk format tanggal
    MatDialogModule,
  ]
})
export class ExpensesModule { }
