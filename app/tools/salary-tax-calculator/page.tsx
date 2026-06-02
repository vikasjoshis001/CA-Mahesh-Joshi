"use client";

import { useState, useEffect } from "react";
import { Container, SectionHeading, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Calculator, Wallet, PieChart } from "lucide-react";

export default function SalaryTaxCalculatorPage() {
  const [basicSalary, setBasicSalary] = useState(600000);
  const [hra, setHra] = useState(240000);
  const [otherAllowances, setOtherAllowances] = useState(100000);
  const [standardDeduction, setStandardDeduction] = useState(50000);
  const [section80C, setSection80C] = useState(150000);
  const [professionalTax, setProfessionalTax] = useState(2400);

  const [grossSalary, setGrossSalary] = useState(0);
  const [taxableIncome, setTaxableIncome] = useState(0);
  const [incomeTax, setIncomeTax] = useState(0);
  const [netSalary, setNetSalary] = useState(0);

  useEffect(() => {
    calculateSalaryTax();
  }, [basicSalary, hra, otherAllowances, standardDeduction, section80C, professionalTax]);

  const calculateSalaryTax = () => {
    // Calculate gross salary
    const gross = basicSalary + hra + otherAllowances;
    setGrossSalary(gross);

    // Calculate taxable income (after deductions)
    const totalDeductions = standardDeduction + section80C + professionalTax;
    const taxable = Math.max(0, gross - totalDeductions);
    setTaxableIncome(taxable);

    // Calculate income tax (New Regime - simplified)
    let tax = 0;
    if (taxable > 300000) {
      const taxableAmount = taxable - 300000;

      if (taxableAmount <= 300000) {
        tax = taxableAmount * 0.05;
      } else if (taxableAmount <= 600000) {
        tax = 15000 + (taxableAmount - 300000) * 0.1;
      } else if (taxableAmount <= 900000) {
        tax = 15000 + 30000 + (taxableAmount - 600000) * 0.15;
      } else if (taxableAmount <= 1200000) {
        tax = 15000 + 30000 + 45000 + (taxableAmount - 900000) * 0.2;
      } else if (taxableAmount <= 1500000) {
        tax = 15000 + 30000 + 45000 + 60000 + (taxableAmount - 1200000) * 0.25;
      } else {
        tax = 15000 + 30000 + 45000 + 60000 + 75000 + (taxableAmount - 1500000) * 0.3;
      }
    }

    // Add 4% cess
    tax = tax * 1.04;
    setIncomeTax(tax);

    // Calculate net salary
    const net = gross - tax - professionalTax;
    setNetSalary(net);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const monthlyNetSalary = netSalary / 12;
  const monthlyTax = incomeTax / 12;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 text-white">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="h-10 w-10" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Salary Tax Calculator
              </h1>
            </div>
            <p className="text-xl text-white/90 leading-relaxed">
              Calculate your take-home salary after income tax and deductions. Plan your finances better.
            </p>
          </div>
        </Container>
      </section>

      {/* Calculator Section */}
      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Salary Components</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Basic Salary */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Basic Salary (Annual)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <input
                      type="number"
                      value={basicSalary}
                      onChange={(e) => setBasicSalary(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      min="0"
                      step="10000"
                    />
                  </div>
                </div>

                {/* HRA */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    House Rent Allowance (HRA)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <input
                      type="number"
                      value={hra}
                      onChange={(e) => setHra(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      min="0"
                      step="10000"
                    />
                  </div>
                </div>

                {/* Other Allowances */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Other Allowances
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <input
                      type="number"
                      value={otherAllowances}
                      onChange={(e) => setOtherAllowances(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      min="0"
                      step="10000"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    LTA, Special Allowance, etc.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Deductions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Standard Deduction */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Standard Deduction
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <input
                      type="number"
                      value={standardDeduction}
                      onChange={(e) => setStandardDeduction(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      min="0"
                      step="1000"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Default: ₹50,000
                  </p>
                </div>

                {/* Section 80C */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Section 80C Deductions
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <input
                      type="number"
                      value={section80C}
                      onChange={(e) => setSection80C(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      min="0"
                      max="150000"
                      step="10000"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    PPF, ELSS, LIC, etc. (Max: ₹1.5L)
                  </p>
                </div>

                {/* Professional Tax */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Professional Tax
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <input
                      type="number"
                      value={professionalTax}
                      onChange={(e) => setProfessionalTax(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      min="0"
                      step="100"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    State-specific tax (Max: ₹2,500/year)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Take Home Salary */}
            <Card variant="bordered" className="bg-gradient-to-br from-primary to-primary-dark text-white">
              <CardContent className="py-8">
                <div className="text-center">
                  <Wallet className="h-10 w-10 mx-auto mb-3" />
                  <div className="text-sm uppercase tracking-wide mb-2 text-white/80">
                    Monthly Take-Home Salary
                  </div>
                  <div className="text-5xl font-bold mb-2">
                    {formatCurrency(monthlyNetSalary)}
                  </div>
                  <div className="text-lg text-white/90">
                    Annual: {formatCurrency(netSalary)}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Salary Breakdown */}
            <Card variant="bordered">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Salary Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-muted-foreground">Gross Salary</span>
                  <span className="font-bold text-lg">{formatCurrency(grossSalary)}</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Standard Deduction</span>
                    <span className="font-medium text-red-600">- {formatCurrency(standardDeduction)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Section 80C</span>
                    <span className="font-medium text-red-600">- {formatCurrency(section80C)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Professional Tax</span>
                    <span className="font-medium text-red-600">- {formatCurrency(professionalTax)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="font-medium text-blue-900">Taxable Income</span>
                  <span className="font-bold text-lg text-blue-600">{formatCurrency(taxableIncome)}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <span className="font-medium text-orange-900">Income Tax (with cess)</span>
                  <span className="font-bold text-lg text-orange-600">{formatCurrency(incomeTax)}</span>
                </div>

                <div className="text-xs text-muted-foreground text-center pt-2">
                  Monthly Tax: {formatCurrency(monthlyTax)}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Breakdown */}
            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Monthly Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gross Salary</span>
                  <span className="font-medium">{formatCurrency(grossSalary / 12)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Income Tax</span>
                  <span className="font-medium text-red-600">- {formatCurrency(monthlyTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Professional Tax</span>
                  <span className="font-medium text-red-600">- {formatCurrency(professionalTax / 12)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="font-semibold text-foreground">Net Salary</span>
                  <span className="text-xl font-bold text-primary">{formatCurrency(monthlyNetSalary)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-16">
          <SectionHeading
            title="Understanding Salary Components"
            subtitle="Key elements of your salary structure"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Basic Salary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  The fixed component of your salary, typically 40-50% of CTC. It forms the base for calculating other components like HRA, PF, and gratuity.
                </p>
              </CardContent>
            </Card>

            <Card variant="bordered">
              <CardHeader>
                <CardTitle>HRA (House Rent Allowance)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Tax-exempt allowance for employees living in rented accommodation. Exemption is the minimum of: actual HRA, 50% of basic (metro) or 40% (non-metro), or rent minus 10% of basic.
                </p>
              </CardContent>
            </Card>

            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Section 80C</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Tax-saving investments up to ₹1.5 lakh per year. Includes PPF, ELSS, EPF, life insurance premiums, home loan principal, NSC, and more.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
