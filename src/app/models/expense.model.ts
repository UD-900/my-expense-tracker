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