import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import {
  PulseTableContainer,
  PulseTableHeader,
  PulseTableRow,
  PulseStatus,
  PulseSurface,
  PulseModal
} from '../../components/common/PulseUI';
import {
  Receipt,
  Download,
  Eye,
  Printer,
} from 'lucide-react';

export const OrgInvoicesPage: React.FC = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  const invoices = [
    {
      id: 'inv-2026-081',
      invoiceNumber: 'INV-2026-8801',
      billingPeriod: '01 Aug 2026 – 31 Aug 2026',
      requestNumber: 'PNC-B2B-2026-041',
      contractType: 'Monthly Retainer (Fixed ICU Roster)',
      netAmount: 549153,
      gstTax: 98847, // 18% GST
      totalAmount: 648000,
      status: 'paid',
      dueDate: '10 Sep 2026',
      paidDate: '08 Sep 2026',
    },
    {
      id: 'inv-2026-091',
      invoiceNumber: 'INV-2026-8802',
      billingPeriod: '01 Sep 2026 – 15 Sep 2026',
      requestNumber: 'PNC-B2B-2026-041',
      contractType: 'Bi-Weekly Retainer Billing',
      netAmount: 274576,
      gstTax: 49424, // 18% GST
      totalAmount: 324000,
      status: 'issued',
      dueDate: '25 Sep 2026',
    },
  ];

  return (
    <div className="space-y-8 text-left relative min-h-screen bg-canvas-primary p-4 sm:p-6 lg:p-8">

      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10 border border-brand-teal/20">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal/20 text-teal-300 text-xs font-heading font-black uppercase tracking-wider border border-brand-teal/30">
            <Receipt className="w-3.5 h-3.5" />
            Institutional Retainer Billing & GST Accounting
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
            Retainer Invoices & Ledger
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-medium font-sans">
            Itemized invoices, 18% GST tax breakdown, and contract billing records.
          </p>
        </div>

        <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/20 text-center">
          <p className="text-[10px] text-teal-300 font-bold uppercase tracking-wider font-heading">Current Billing Status</p>
          <p className="text-xl font-heading font-extrabold text-white">Account Clear</p>
        </div>
      </div>

      {/* INVOICES TABLE */}
      <PulseTableContainer title="Institutional Billing Records" subtitle="Retainer tax invoices & payment status">
        <table className="w-full text-left text-xs">
          <PulseTableHeader>
            <tr>
              <th className="p-4">Invoice No</th>
              <th className="p-4">Billing Period</th>
              <th className="p-4">Contract Ref</th>
              <th className="p-4 text-right">Net Amount</th>
              <th className="p-4 text-right">18% GST</th>
              <th className="p-4 text-right">Total Amount</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </PulseTableHeader>
          <tbody className="divide-y divide-border-light">
            {invoices.map((inv) => (
              <PulseTableRow key={inv.id} statusAccent={inv.status === 'paid' ? 'success' : 'warning'}>
                <td className="p-4 font-mono font-bold text-brand-teal">{inv.invoiceNumber}</td>
                <td className="p-4 font-heading font-bold text-text-primary">{inv.billingPeriod}</td>
                <td className="p-4">
                  <span className="font-mono text-[11px] font-bold text-text-primary bg-surface-subtle px-2 py-0.5 rounded border border-border-default">
                    {inv.requestNumber}
                  </span>
                </td>
                <td className="p-4 text-right font-bold text-text-secondary">
                  ₹{inv.netAmount.toLocaleString('en-IN')}
                </td>
                <td className="p-4 text-right font-bold text-text-muted">
                  ₹{inv.gstTax.toLocaleString('en-IN')}
                </td>
                <td className="p-4 text-right font-heading font-black text-text-primary text-sm">
                  ₹{inv.totalAmount.toLocaleString('en-IN')}
                </td>
                <td className="p-4 text-center">
                  <PulseStatus
                    status={inv.status === 'paid' ? 'success' : 'warning'}
                    label={inv.status}
                    size="sm"
                  />
                </td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedInvoice(inv)}
                      leftIcon={<Eye className="w-3.5 h-3.5" />}
                      className="border-border-default text-text-primary hover:bg-slate-100 font-bold text-[11px] cursor-pointer rounded-full"
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => alert(`Downloading PDF for ${inv.invoiceNumber}...`)}
                      leftIcon={<Download className="w-3.5 h-3.5" />}
                      className="border-border-default text-text-primary hover:bg-slate-100 font-bold text-[11px] cursor-pointer rounded-full"
                    >
                      PDF
                    </Button>
                  </div>
                </td>
              </PulseTableRow>
            ))}
          </tbody>
        </table>
      </PulseTableContainer>

      {/* INVOICE ITEMIZED BREAKDOWN MODAL */}
      {selectedInvoice && (
        <PulseModal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          title={`Tax Invoice — ${selectedInvoice.invoiceNumber}`}
        >
          <div className="space-y-5 text-left text-xs">
            <PulseSurface variant="flat" padding="md" className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-brand-teal uppercase">
                  GSTIN: 07AABCP9921D1ZB
                </span>
                <PulseStatus status={selectedInvoice.status === 'paid' ? 'success' : 'warning'} label={selectedInvoice.status} size="sm" />
              </div>
              <h3 className="text-base font-heading font-extrabold text-text-primary pt-1">
                Tax Invoice #{selectedInvoice.invoiceNumber}
              </h3>
              <p className="text-text-muted">Period: <strong className="text-text-primary">{selectedInvoice.billingPeriod}</strong></p>
              <p className="text-text-muted">Contract Ref: <strong className="text-text-primary">{selectedInvoice.requestNumber}</strong></p>
            </PulseSurface>

            {/* Itemized Line Items */}
            <div className="space-y-2">
              <h4 className="font-heading font-bold text-text-primary uppercase tracking-wider text-[11px]">Itemized Service Breakdown</h4>
              <div className="border border-border-default rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-subtle border-b border-border-default font-bold text-text-secondary">
                    <tr>
                      <th className="p-2.5">Description</th>
                      <th className="p-2.5 text-center">Qty / Shift Days</th>
                      <th className="p-2.5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light">
                    <tr>
                      <td className="p-2.5 font-bold text-text-primary">
                        ICU Registered Nurse Retainer Deployment (4 Day Staff)
                      </td>
                      <td className="p-2.5 text-center font-semibold text-text-secondary">120 Shifts</td>
                      <td className="p-2.5 text-right font-bold text-text-primary">₹3,84,000</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-text-primary">
                        Physiotherapy Specialist Retainer Deployment (2 Day Staff)
                      </td>
                      <td className="p-2.5 text-center font-semibold text-text-secondary">60 Shifts</td>
                      <td className="p-2.5 text-right font-bold text-text-primary">₹1,65,153</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* GST Tax Calculation Breakup */}
            <div className="p-4 rounded-xl bg-teal-50/50 border border-brand-teal/20 space-y-2 text-text-primary">
              <div className="flex justify-between">
                <span>Net Subtotal:</span>
                <span className="font-bold">₹{selectedInvoice.netAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>CGST (9%):</span>
                <span>₹{(selectedInvoice.gstTax / 2).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>SGST (9%):</span>
                <span>₹{(selectedInvoice.gstTax / 2).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-t border-brand-teal/20 pt-2 font-heading font-black text-sm text-text-primary">
                <span>Total Amount Payable (Incl. 18% GST):</span>
                <span className="text-brand-teal">₹{selectedInvoice.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                onClick={() => alert(`Printing Tax Invoice ${selectedInvoice.invoiceNumber}...`)}
                leftIcon={<Printer className="w-3.5 h-3.5" />}
                className="border-border-default text-text-primary font-bold text-xs rounded-full"
              >
                Print Invoice
              </Button>
              <Button
                variant="primary"
                onClick={() => setSelectedInvoice(null)}
                className="bg-brand-teal hover:bg-brand-teal-hover text-white font-bold text-xs rounded-full"
              >
                Close Invoice View
              </Button>
            </div>
          </div>
        </PulseModal>
      )}
    </div>
  );
};
