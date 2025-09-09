export interface Expense {
  id: string; // ID unik untuk setiap pengeluaran
  amount: number; // Jumlah uang
  category: string; // Kategori pengeluaran (makanan, transportasi, dll.)
  description: string; // Deskripsi singkat
  date: Date; // Tanggal pengeluaran
}

export interface Category {
  name: string; // Nama kategori
  description?: string; // Deskripsi opsional
}

// Interface untuk Template Tagihan Bulanan
export interface MonthlyBillTemplate {
  id: string;
  name: string;
  amount: number;
  category: string;
  dueDate: number; // Tanggal jatuh tempo (misal: 15 untuk tanggal 15)
}

// Interface untuk Tagihan Bulanan (instance untuk bulan berjalan)
export interface MonthlyBill {
  id: string;
  name: string;
  amount: number;
  category: string;
  dueDate: Date;
  isPaid: boolean;
  isUnPaid: boolean;
  paidDate?: Date;
  paidExpenseId?: string; // Tambahkan properti ini
}