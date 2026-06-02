"use client";

import { useState, useEffect } from "react";
import { Container, SectionHeading, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Calculator, TrendingUp, Download, Printer } from "lucide-react";
import Script from "next/script";

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [tenureType, setTenureType] = useState<"years" | "months">("years");

  // String states for input display to handle empty values properly
  const [loanAmountInput, setLoanAmountInput] = useState("5000000");
  const [interestRateInput, setInterestRateInput] = useState("8.5");
  const [loanTenureInput, setLoanTenureInput] = useState("20");

  const [emi, setEmi] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<any[]>([]);
  const [isCalculated, setIsCalculated] = useState(false);
  const [isJsPDFLoaded, setIsJsPDFLoaded] = useState(false);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure, tenureType]);

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenureType === "years" ? loanTenure * 12 : loanTenure;

    if (monthlyRate === 0) {
      const emiValue = principal / months;
      setEmi(emiValue);
      setTotalAmount(principal);
      setTotalInterest(0);
      generateAmortization(principal, 0, months, emiValue);
    } else {
      const emiValue =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      const totalAmountValue = emiValue * months;
      const totalInterestValue = totalAmountValue - principal;

      setEmi(emiValue);
      setTotalAmount(totalAmountValue);
      setTotalInterest(totalInterestValue);
      generateAmortization(principal, monthlyRate, months, emiValue);
    }
  };

  const generateAmortization = (principal: number, monthlyRate: number, months: number, emiValue: number) => {
    let balance = principal;
    const schedule = [];

    for (let i = 1; i <= months; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emiValue - interestPayment;
      balance -= principalPayment;

      if (balance < 0) balance = 0;

      schedule.push({
        month: i,
        emi: emiValue,
        principal: principalPayment,
        interest: interestPayment,
        balance: balance,
      });
    }

    setAmortizationSchedule(schedule);
  };

  const handleCalculate = () => {
    calculateEMI();
    setIsCalculated(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return Math.round(value).toLocaleString("en-IN");
  };

  const formatCurrencyForPDF = (value: number) => {
    // Custom formatter for PDF to avoid spacing issues
    const num = Math.round(value).toString();
    let lastThree = num.substring(num.length - 3);
    const otherNumbers = num.substring(0, num.length - 3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return "Rs. " + formatted;
  };

  const formatNumberForPDF = (value: number) => {
    // Custom formatter for PDF to avoid spacing issues
    const num = Math.round(value).toString();
    let lastThree = num.substring(num.length - 3);
    const otherNumbers = num.substring(0, num.length - 3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    if (!isCalculated) {
      alert("Please calculate EMI first!");
      return;
    }

    if (!isJsPDFLoaded || !(window as any).jspdf) {
      alert("PDF library is loading. Please try again in a moment.");
      return;
    }

    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const W = doc.internal.pageSize.getWidth();
    let y = 0;

    // Header Background
    doc.setFillColor(26, 59, 93);
    doc.rect(0, 0, W, 40, "F");
    doc.setFillColor(232, 103, 26);
    doc.rect(0, 40, W, 3, "F");

    // Firm Name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("MAHESH JOSHI & ASSOCIATES", W / 2, 16, { align: "center" });
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(232, 103, 26);
    doc.text("CHARTERED ACCOUNTANTS", W / 2, 22, { align: "center" });
    doc.setTextColor(200, 220, 240);
    doc.setFontSize(7.5);
    doc.text("CA Mahesh Joshi  |  9130601393  |  camaheshjoshi25@gmail.com", W / 2, 35, { align: "center" });

    y = 52;
    // Title
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 59, 93);
    doc.text("EMI CALCULATION REPORT", W / 2, y, { align: "center" });
    y += 8;

    // Summary Box
    doc.setFillColor(247, 249, 252);
    doc.setDrawColor(214, 221, 232);
    doc.roundedRect(12, y, W - 24, 40, 3, 3, "FD");

    const labelX = 18,
      col2LX = 110;
    const rowH = 8;
    let ry = y + 8;

    // Loan Amount & Monthly EMI
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(99, 115, 144);
    doc.text("LOAN AMOUNT", labelX, ry);
    doc.text("MONTHLY EMI", col2LX, ry);
    ry += 4;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 59, 93);
    doc.text(formatCurrencyForPDF(loanAmount), labelX, ry);
    doc.text(formatCurrencyForPDF(emi), col2LX, ry);
    ry += rowH;

    // Interest Rate & Total Interest
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(99, 115, 144);
    doc.text("INTEREST RATE", labelX, ry);
    doc.text("TOTAL INTEREST", col2LX, ry);
    ry += 4;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(232, 103, 26);
    doc.text(interestRate.toFixed(2) + "% p.a.", labelX, ry);
    doc.text(formatCurrencyForPDF(totalInterest), col2LX, ry);
    ry += rowH;

    // Tenure & Total Payable
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(99, 115, 144);
    doc.text("TENURE", labelX, ry);
    doc.text("TOTAL PAYABLE", col2LX, ry);
    ry += 4;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(45, 164, 78);
    const tenureText = tenureType === "years" ? `${loanTenure} Years` : `${loanTenure} Months`;
    doc.text(tenureText, labelX, ry);
    doc.text(formatCurrencyForPDF(totalAmount), col2LX, ry);

    y += 48;

    // Amortization Schedule
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 59, 93);
    doc.text("Amortization Schedule", 12, y);
    y += 6;

    // Table Header
    const cols = [12, 45, 82, 122, 158];
    const headers = ["Month", "EMI (₹)", "Principal (₹)", "Interest (₹)", "Balance (₹)"];
    doc.setFillColor(26, 59, 93);
    doc.rect(12, y, W - 24, 7, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    headers.forEach((h, i) => doc.text(h, cols[i] + 1, y + 5));
    y += 7;

    let odd = true;
    amortizationSchedule.forEach((row, i) => {
      if (y > 270) {
        doc.addPage();
        y = 15;
        doc.setFillColor(26, 59, 93);
        doc.rect(12, y, W - 24, 7, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(7);
        doc.setFont("helvetica", "bold");
        headers.forEach((h, ix) => doc.text(h, cols[ix] + 1, y + 5));
        y += 7;
      }

      doc.setFillColor(odd ? 247 : 255, odd ? 249 : 255, odd ? 252 : 255);
      doc.rect(12, y, W - 24, 6, "F");
      doc.setTextColor(61, 80, 102);
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.text(`Month ${row.month}`, cols[0] + 1, y + 4.2);
      doc.setTextColor(26, 59, 93);
      doc.setFont("helvetica", "normal");
      doc.text(formatNumberForPDF(row.emi), cols[1] + 1, y + 4.2);
      doc.setTextColor(26, 82, 160);
      doc.text(formatNumberForPDF(row.principal), cols[2] + 1, y + 4.2);
      doc.setTextColor(180, 70, 20);
      doc.text(formatNumberForPDF(row.interest), cols[3] + 1, y + 4.2);
      doc.setTextColor(45, 164, 78);
      doc.text(formatNumberForPDF(row.balance), cols[4] + 1, y + 4.2);
      y += 6;
      odd = !odd;
    });

    // Disclaimer
    if (y > 260) {
      doc.addPage();
      y = 15;
    }
    y += 6;
    doc.setFontSize(6.5);
    doc.setTextColor(120, 130, 145);
    doc.setFont("helvetica", "italic");
    doc.text(
      "Disclaimer: This EMI calculation is indicative and for informational purposes only. Actual EMI may vary.",
      12,
      y
    );

    doc.save("EMI_Report_MaheshJoshi.pdf");
  };

  const principalPercentage = loanAmount > 0 ? (loanAmount / totalAmount) * 100 : 0;
  const interestPercentage = totalInterest > 0 ? (totalInterest / totalAmount) * 100 : 0;

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
        onLoad={() => setIsJsPDFLoaded(true)}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary-dark py-16 text-white print:hidden">
          <Container>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="h-10 w-10" />
                <h1 className="text-4xl md:text-5xl font-bold">EMI Calculator</h1>
              </div>
              <p className="text-xl text-white/90 leading-relaxed">
                Calculate your Equated Monthly Installment for home loans, car loans, personal loans with detailed
                amortization schedule.
              </p>
            </div>
          </Container>
        </section>

        {/* Calculator Section */}
        <Container className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card variant="bordered" className="print:hidden">
              <CardHeader>
                <CardTitle>Loan Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Loan Amount */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Loan Amount (₹)</label>
                  <div className="relative mb-3">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₹</span>
                    <input
                      type="number"
                      value={loanAmountInput}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        setLoanAmountInput(inputValue);
                        const numValue = inputValue === '' ? 100000 : Number(inputValue);
                        setLoanAmount(numValue);
                      }}
                      className="w-full pl-8 pr-4 py-3 text-lg font-medium border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background"
                      placeholder="Enter loan amount"
                      min="100000"
                      max="10000000"
                      step="50000"
                    />
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="10000000"
                    step="50000"
                    value={loanAmount}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setLoanAmount(value);
                      setLoanAmountInput(value.toString());
                    }}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>₹1L</span>
                    <span>₹1Cr</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Interest Rate (% per annum)
                  </label>
                  <div className="relative mb-3">
                    <input
                      type="number"
                      value={interestRateInput}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        setInterestRateInput(inputValue);
                        const numValue = inputValue === '' ? 1 : Number(inputValue);
                        setInterestRate(numValue);
                      }}
                      step="0.1"
                      className="w-full pl-4 pr-16 py-3 text-lg font-medium border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background"
                      placeholder="Enter interest rate"
                      min="1"
                      max="30"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">% p.a.</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="0.25"
                    value={interestRate}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setInterestRate(value);
                      setInterestRateInput(value.toString());
                    }}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1%</span>
                    <span>30%</span>
                  </div>
                </div>

                {/* Loan Tenure */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Loan Tenure</label>
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => {
                        setTenureType("years");
                        // Convert months to years when switching
                        if (tenureType === "months") {
                          const years = Math.max(1, Math.round(loanTenure / 12));
                          setLoanTenure(years);
                          setLoanTenureInput(years.toString());
                        }
                      }}
                      className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                        tenureType === "years"
                          ? "bg-primary text-white"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      Years
                    </button>
                    <button
                      onClick={() => {
                        setTenureType("months");
                        // Convert years to months when switching
                        if (tenureType === "years") {
                          const months = loanTenure * 12;
                          setLoanTenure(months);
                          setLoanTenureInput(months.toString());
                        }
                      }}
                      className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                        tenureType === "months"
                          ? "bg-primary text-white"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      Months
                    </button>
                  </div>
                  <div className="relative mb-3">
                    <input
                      type="number"
                      value={loanTenureInput}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        setLoanTenureInput(inputValue);
                        const minValue = tenureType === "years" ? 1 : 6;
                        const numValue = inputValue === '' ? minValue : Number(inputValue);
                        setLoanTenure(numValue);
                      }}
                      className="w-full pl-4 pr-24 py-3 text-lg font-medium border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background"
                      placeholder="Enter tenure"
                      min={tenureType === "years" ? "1" : "6"}
                      max={tenureType === "years" ? "30" : "360"}
                      step={tenureType === "years" ? "1" : "6"}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                      {tenureType === "years" ? "Years" : "Months"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={tenureType === "years" ? "1" : "6"}
                    max={tenureType === "years" ? "30" : "360"}
                    step={tenureType === "years" ? "1" : "6"}
                    value={loanTenure}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setLoanTenure(value);
                      setLoanTenureInput(value.toString());
                    }}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{tenureType === "years" ? "1 Yr" : "6 Mo"}</span>
                    <span>{tenureType === "years" ? "30 Yrs" : "360 Mo"}</span>
                  </div>
                </div>

                <button
                  onClick={handleCalculate}
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  ⚡ Calculate EMI
                </button>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      setLoanAmount(5000000);
                      setInterestRate(8.5);
                      setLoanTenure(20);
                      setLoanAmountInput("5000000");
                      setInterestRateInput("8.5");
                      setLoanTenureInput("20");
                      setTenureType("years");
                      setIsCalculated(false);
                    }}
                    className="py-2 px-3 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-colors"
                  >
                    ↺ Reset
                  </button>
                  <button
                    onClick={handlePrint}
                    disabled={!isCalculated}
                    className="py-2 px-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                  >
                    <Printer className="h-4 w-4" />
                    Print
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    disabled={!isCalculated}
                    className="py-2 px-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                  >
                    <Download className="h-4 w-4" />
                    PDF
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <div className="space-y-6">
              <Card variant="bordered" className="bg-gradient-to-br from-primary to-primary-dark text-white">
                <CardContent className="py-8">
                  {!isCalculated ? (
                    <div className="text-center text-white/80">
                      <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Enter loan details and click Calculate EMI</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="mb-2 text-white/80 text-sm font-medium uppercase tracking-wide">
                        Monthly EMI
                      </div>
                      <div className="text-5xl font-bold mb-2">{formatCurrency(emi)}</div>
                      <div className="text-white/70 text-sm">Pay this amount every month</div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {isCalculated && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card variant="bordered">
                      <CardContent className="py-6">
                        <div className="text-sm text-muted-foreground mb-1">Principal Amount</div>
                        <div className="text-2xl font-bold text-foreground">{formatCurrency(loanAmount)}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {principalPercentage.toFixed(1)}% of total
                        </div>
                      </CardContent>
                    </Card>

                    <Card variant="bordered">
                      <CardContent className="py-6">
                        <div className="text-sm text-muted-foreground mb-1">Total Interest</div>
                        <div className="text-2xl font-bold text-orange-600">{formatCurrency(totalInterest)}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {interestPercentage.toFixed(1)}% of total
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card variant="bordered">
                    <CardContent className="py-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Total Amount Payable</div>
                          <div className="text-3xl font-bold text-foreground">{formatCurrency(totalAmount)}</div>
                        </div>
                        <TrendingUp className="h-10 w-10 text-primary" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Pie Chart Visualization */}
                  <Card variant="bordered">
                    <CardHeader>
                      <CardTitle>Payment Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Principal</span>
                            <span className="font-medium">{principalPercentage.toFixed(1)}%</span>
                          </div>
                          <div className="h-3 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all duration-500"
                              style={{ width: `${principalPercentage}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Interest</span>
                            <span className="font-medium">{interestPercentage.toFixed(1)}%</span>
                          </div>
                          <div className="h-3 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-orange-500 transition-all duration-500"
                              style={{ width: `${interestPercentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>

          {/* Amortization Schedule */}
          {isCalculated && amortizationSchedule.length > 0 && (
            <div className="mt-8">
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>Amortization Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="px-4 py-3 text-left">Month</th>
                          <th className="px-4 py-3 text-right">EMI (₹)</th>
                          <th className="px-4 py-3 text-right">Principal (₹)</th>
                          <th className="px-4 py-3 text-right">Interest (₹)</th>
                          <th className="px-4 py-3 text-right">Balance (₹)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {amortizationSchedule.slice(0, 12).map((row, index) => (
                          <tr key={row.month} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                            <td className="px-4 py-3">Month {row.month}</td>
                            <td className="px-4 py-3 text-right font-medium">{formatNumber(row.emi)}</td>
                            <td className="px-4 py-3 text-right text-blue-600">{formatNumber(row.principal)}</td>
                            <td className="px-4 py-3 text-right text-orange-600">{formatNumber(row.interest)}</td>
                            <td className="px-4 py-3 text-right text-green-600">{formatNumber(row.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {amortizationSchedule.length > 12 && (
                    <p className="text-xs text-muted-foreground mt-4 text-center">
                      Showing first 12 months. Download PDF for complete schedule.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Information Section */}
          <div className="mt-16 print:hidden">
            <SectionHeading
              title="Understanding EMI"
              subtitle="Everything you need to know about Equated Monthly Installments"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>What is EMI?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a
                    specified date each calendar month. EMIs are used to pay off both interest and principal each
                    month, so that over a specified number of years, the loan is paid off in full.
                  </p>
                </CardContent>
              </Card>

              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>How is EMI Calculated?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">The EMI calculation formula is:</p>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm">EMI = [P × R × (1+R)^N] / [(1+R)^N-1]</div>
                  <p className="text-muted-foreground text-sm mt-4">
                    Where P = Principal loan amount, R = Monthly interest rate, N = Number of monthly installments
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg flex gap-3 print:block print:mt-4">
              <TrendingUp className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5 print:hidden" />
              <div className="text-sm text-orange-900">
                <strong>Disclaimer:</strong> This EMI calculation is indicative and for informational purposes only.
                Actual EMI may vary based on the lender's terms, processing fees, and applicable taxes. Please consult{" "}
                <strong>CA Mahesh Joshi</strong> for personalised financial advice.
              </div>
            </div>
          </div>
        </Container>
      </div>

      <style jsx global>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
          @page {
            margin: 0.5cm;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </>
  );
}
