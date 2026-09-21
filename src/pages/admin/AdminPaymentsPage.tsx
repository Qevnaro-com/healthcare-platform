import React, { useState } from 'react';
import { Search, PlusCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useBookings } from '../../context/BookingContext';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import type { PaymentRecord } from '../../types';

export const AdminPaymentsPage: React.FC = () => {
  const { careInvoices, paymentRecords, recordPayment } = useBookings();
  const [search, setSearch] = useState('');
  const [recordModalOpen, setRecordModalOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>('');
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentRecord['paymentMethod']>('upi_manual');
  const [paymentReference, setPaymentReference] = useState('');

  const filteredInvoices = careInvoices.filter((inv) =>
    inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
    inv.clientName.toLowerCase().includes(search.toLowerCase()) ||
    inv.careRequestId.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenRecordPayment = (invoiceId: string, amount: number) => {
    setSelectedInvoiceId(invoiceId);
    setPaymentAmount(amount);
    setRecordModalOpen(true);
  };

  const handleSavePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoiceId) return;

    recordPayment(selectedInvoiceId, paymentAmount, paymentMethod, paymentReference || `UTR-${Date.now()}`);
    setRecordModalOpen(false);
    setSelectedInvoiceId('');
    setPaymentReference('');
  };

  return (
    <div className="space-y-6 text-left max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-brand-teal uppercase tracking-widest">Financial Operations & Invoicing</span>
          <h1 className="text-2xl font-bold text-slate-900">Invoices & Payment Recording</h1>
          <p className="text-slate-600 text-xs mt-1">Invoices generated from frozen PriceSnapshots. Payment gateway is NOT implemented (Manual receipt recording only).</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-extrabold flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Gateway: Not Implemented (Offline Ledger Mode)</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search Invoice #, Client Name, Request Ref..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Invoice #</th>
                <th className="p-4">Client / Patient</th>
                <th className="p-4">Issue Date</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Invoice Status</th>
                <th className="p-4 text-right">Payment Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((inv) => {
                const isPaid = paymentRecords.some((p) => p.invoiceId === inv.id && p.status === 'PAID');

                return (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-900">{inv.invoiceNumber}</td>
                    <td className="p-4">
                      <span className="font-bold text-slate-900 block">{inv.clientName}</span>
                      <span className="text-[11px] text-slate-500">Patient: {inv.patientName}</span>
                    </td>
                    <td className="p-4">{inv.issueDate}</td>
                    <td className="p-4 font-extrabold text-slate-900">₹{inv.totalAmount.toLocaleString('en-IN')}</td>
                    <td className="p-4">
                      {isPaid ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> PAID
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                          UNPAID / ISSUED
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {!isPaid ? (
                        <Button
                          variant="primary"
                          size="sm"
                          className="bg-brand-teal text-white font-bold"
                          leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
                          onClick={() => handleOpenRecordPayment(inv.id, inv.totalAmount)}
                        >
                          Record Payment
                        </Button>
                      ) : (
                        <span className="text-[11px] font-mono font-bold text-slate-400">
                          Receipt Logged
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Payment Recording Modal */}
      <Modal
        isOpen={recordModalOpen}
        onClose={() => setRecordModalOpen(false)}
        title="Record Manual Payment Receipt"
        subtitle="Log offline payment (Cash, Bank Transfer, UPI, Cheque) against issued invoice."
      >
        <form onSubmit={handleSavePayment} className="space-y-4 text-xs text-left">
          <div>
            <label className="block font-extrabold text-slate-900 mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentRecord['paymentMethod'])}
              className="w-full h-9 px-3 border border-slate-200 rounded-lg bg-white"
            >
              <option value="upi_manual">UPI Transfer (Manual Verification)</option>
              <option value="bank_transfer">Bank Transfer / NEFT / RTGS</option>
              <option value="cash">Cash Received at Office / Doorstep</option>
              <option value="cheque">Cheque Deposit</option>
            </select>
          </div>

          <div>
            <label className="block font-extrabold text-slate-900 mb-1">Amount Received (₹)</label>
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(Number(e.target.value))}
              className="w-full h-9 px-3 border border-slate-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-extrabold text-slate-900 mb-1">Transaction Reference (UTR / Receipt #)</label>
            <input
              type="text"
              value={paymentReference}
              onChange={(e) => setPaymentReference(e.target.value)}
              placeholder="e.g. UTR-994182041289 / Cash Receipt #1042"
              className="w-full h-9 px-3 border border-slate-200 rounded-lg"
            />
          </div>

          <Button type="submit" variant="primary" className="w-full bg-brand-teal text-white font-bold py-2.5">
            Log Payment & Update Invoice Status
          </Button>
        </form>
      </Modal>
    </div>
  );
};
