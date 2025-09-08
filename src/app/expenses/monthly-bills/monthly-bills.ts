import { Component, OnInit } from '@angular/core';
import { MonthlyBill } from '../../models/expense.model';
import { expenseService } from '../expense';

@Component({
  selector: 'app-monthly-bills',
  standalone: false,
  templateUrl: './monthly-bills.html',
  styleUrl: './monthly-bills.scss'
})
export class MonthlyBills implements OnInit {

  monthlyBills: MonthlyBill[] = [];

  constructor(private expenseService: expenseService) { }

  ngOnInit(): void {
    this.getBills();
  }

  getBills(): void {
    this.monthlyBills = this.expenseService.getMonthlyBillsForCurrentMonth();
  }

  markAsPaid(bill: MonthlyBill): void {
    const confirmation = confirm('Apakah Anda yakin ingin menandai tagihan ini sebagai sudah dibayar? Ini akan mencatat pengeluaran di dashboard Anda.');

    if (confirmation) {
      this.expenseService.markBillAsPaid(bill);
      this.getBills(); // Muat ulang daftar tagihan
    }
  }

  // Metode BARU untuk membatalkan pembayaran
  unmarkAsPaid(bill: MonthlyBill): void {
    const confirmation = confirm('Apakah Anda yakin ingin membatalkan pembayaran ini? Pengeluaran yang terkait akan dihapus.');

    if (confirmation) {
      this.expenseService.unmarkBillAsPaid(bill);
      this.getBills();
    }
  }

}