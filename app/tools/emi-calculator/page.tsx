"use client";

import { useState, useEffect } from "react";
import { Container, SectionHeading, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Calculator, TrendingUp, Download } from "lucide-react";

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(10);
  const [loanTenure, setLoanTenure] = useState(12);
  const [emi, setEmi] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure]);

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenure;

    if (monthlyRate === 0) {
      const emiValue = principal / months;
      setEmi(emiValue);
      setTotalAmount(principal);
      setTotalInterest(0);
    } else {
      const emiValue =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      const totalAmountValue = emiValue * months;
      const totalInterestValue = totalAmountValue - principal;

      setEmi(emiValue);
      setTotalAmount(totalAmountValue);
      setTotalInterest(totalInterestValue);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 text-white">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="h-10 w-10" />
              <h1 className="text-4xl md:text-5xl font-bold">
                EMI Calculator
              </h1>
            </div>
            <p className="text-xl text-white/90 leading-relaxed">
              Calculate your Equated Monthly Installment (EMI) for home loans, car loans, personal loans, and more.
            </p>
          </div>
        </Container>
      </section>

      {/* Calculator Section */}
      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Loan Amount */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Loan Amount
                </label>
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="50000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">₹1L</span>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="text-lg font-bold text-primary text-center bg-transparent border-none outline-none w-40"
                  />
                  <span className="text-xs text-muted-foreground">₹1Cr</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Interest Rate (% per annum)
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">1%</span>
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    step="0.1"
                    className="text-lg font-bold text-primary text-center bg-transparent border-none outline-none w-32"
                  />
                  <span className="text-xs text-muted-foreground">30%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Loan Tenure (Months)
                </label>
                <input
                  type="range"
                  min="6"
                  max="360"
                  step="6"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">6 months</span>
                  <input
                    type="number"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="text-lg font-bold text-primary text-center bg-transparent border-none outline-none w-32"
                  />
                  <span className="text-xs text-muted-foreground">30 years</span>
                </div>
                <div className="text-center text-sm text-muted-foreground mt-1">
                  {Math.floor(loanTenure / 12)} years {loanTenure % 12} months
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            <Card variant="bordered" className="bg-gradient-to-br from-primary to-primary-dark text-white">
              <CardContent className="py-8">
                <div className="text-center">
                  <div className="mb-2 text-white/80 text-sm font-medium uppercase tracking-wide">
                    Monthly EMI
                  </div>
                  <div className="text-5xl font-bold mb-2">
                    {formatCurrency(emi)}
                  </div>
                  <div className="text-white/70 text-sm">
                    Pay this amount every month
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card variant="bordered">
                <CardContent className="py-6">
                  <div className="text-sm text-muted-foreground mb-1">Principal Amount</div>
                  <div className="text-2xl font-bold text-foreground">
                    {formatCurrency(loanAmount)}
                  </div>
                </CardContent>
              </Card>

              <Card variant="bordered">
                <CardContent className="py-6">
                  <div className="text-sm text-muted-foreground mb-1">Total Interest</div>
                  <div className="text-2xl font-bold text-orange-600">
                    {formatCurrency(totalInterest)}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card variant="bordered">
              <CardContent className="py-6">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Total Amount Payable</div>
                    <div className="text-3xl font-bold text-foreground">
                      {formatCurrency(totalAmount)}
                    </div>
                  </div>
                  <TrendingUp className="h-10 w-10 text-primary" />
                </div>
              </CardContent>
            </Card>

            {/* Breakdown Chart */}
            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Payment Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Principal</span>
                      <span className="font-medium">{((loanAmount / totalAmount) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(loanAmount / totalAmount) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Interest</span>
                      <span className="font-medium">{((totalInterest / totalAmount) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500"
                        style={{ width: `${(totalInterest / totalAmount) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-16">
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
                  EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month, so that over a specified number of years, the loan is paid off in full.
                </p>
              </CardContent>
            </Card>

            <Card variant="bordered">
              <CardHeader>
                <CardTitle>How is EMI Calculated?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The EMI calculation formula is:
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                  EMI = [P × R × (1+R)^N] / [(1+R)^N-1]
                </div>
                <p className="text-muted-foreground text-sm mt-4">
                  Where P = Principal loan amount, R = Monthly interest rate, N = Number of monthly installments
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
