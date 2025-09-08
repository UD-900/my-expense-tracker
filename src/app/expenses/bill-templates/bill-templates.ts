import { Component, OnInit } from '@angular/core';
import { MonthlyBillTemplate, Category } from '../../models/expense.model';
import { expenseService } from '../expense';

@Component({
  selector: 'app-bill-templates',
  standalone: false,
  templateUrl: './bill-templates.html',
  styleUrl: './bill-templates.scss'
})
export class BillTemplates implements OnInit {

  newTemplate: MonthlyBillTemplate = {
    id: '',
    name: '',
    amount: 0,
    category: '',
    dueDate: 1
  };
  templates: MonthlyBillTemplate[] = [];
  categories: Category[] = [];

  constructor(private expenseService: expenseService) { }

  ngOnInit(): void {
    this.getTemplates();
    this.categories = this.expenseService.getCategories();
  }

  getTemplates(): void {
    this.templates = this.expenseService.getBillTemplates();
  }

  onSubmit(): void {
    if (this.newTemplate.name && this.newTemplate.amount > 0 && this.newTemplate.category) {
      this.expenseService.addBillTemplate(this.newTemplate);
      this.newTemplate = {
        id: '',
        name: '',
        amount: 0,
        category: '',
        dueDate: 1
      };
      this.getTemplates(); // Muat ulang daftar
    }
  }

  deleteTemplate(id: string): void {
    const confirmation = confirm('Apakah Anda yakin ingin menghapus template tagihan ini?');
    if (confirmation) {
      this.expenseService.deleteBillTemplate(id);
      this.getTemplates(); // Muat ulang daftar
    }
  }
}
