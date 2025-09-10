import { Component, OnInit } from '@angular/core';
import { MonthlyBill } from '../../models/expense.model';
import { expenseService } from '../expense';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../shared/confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-monthly-bills',
  standalone: false,
  templateUrl: './monthly-bills.html',
  styleUrl: './monthly-bills.scss'
})
export class MonthlyBills implements OnInit {

  monthlyBills: MonthlyBill[] = [];

  constructor(
    private expenseService: expenseService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getBills();
  }

  getBills(): void {
    this.monthlyBills = this.expenseService.getMonthlyBillsForCurrentMonth();
  }

  markAsPaid(bill: MonthlyBill): void {
    const confirmation = confirm('Apakah Anda yakin ingin menandai tagihan ini sebagai sudah dibayar? Ini akan mencatat pengeluaran di dashboard Anda.');
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        title: 'peringatan',
        message: 'Apakah Anda yakin ingin menandai tagihan ini sebagai sudah dibayar? Ini akan mencatat pengeluaran di dashboard Anda.'
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.expenseService.markBillAsPaid(bill);
        this.getBills();
      }
    })
  }

  // Metode BARU untuk membatalkan pembayaran
  unmarkAsPaid(bill: MonthlyBill): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        title: 'peringatan',
        message: 'Apakah Anda yakin ingin membatalkan pembayaran ini? Pengeluaran yang terkait akan dihapus.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.expenseService.unmarkBillAsPaid(bill);
        this.getBills();
      }
    });
  }

}