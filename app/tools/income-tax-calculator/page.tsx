"use client";

import { useState, useEffect } from "react";
import { Container, SectionHeading, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Calculator, TrendingDown, Info } from "lucide-react";

type TaxRegime = "old" | "new";

export default function IncomeTaxCalculatorPage() {
  const [regime, setRegime] = useState<TaxRegime>("new");
  const [grossIncome, setGrossIncome] = useState(1000000);
  const [deductions, setDeductions] = useState(150000);
  const [age, setAge] = useState<"below60" | "60to80" | "above80">("below60");

  const [taxableIncome, setTaxableIncome] = useState(0);
  const [taxOld, setTaxOld] = useState(0);
  const [taxNew, setTaxNew] = useState(0);

  useEffect(() => {
    calculateTax();
  }, [grossIncome, deductions, age, regime]);

  const calculateTax = () => {
    // Calculate taxable income (old regime considers deductions)
    const taxableOld = Math.max(0, grossIncome - deductions);
    const taxableNew = Math.max(0, grossIncome); // New regime doesn't allow most deductions

    setTaxableIncome(regime === "old" ? taxableOld : taxableNew);

    // Calculate tax for old regime (AY 2026-27)
    let taxAmountOld = 0;
    const basicExemption = age === "below60" ? 250000 : age === "60to80" ? 300000 : 500000;

    if (taxableOld > basicExemption) {
      const taxable = taxableOld - basicExemption;
      if (taxable <= 250000) {
        taxAmountOld = taxable * 0.05;
      } else if (taxable <= 500000) {
        taxAmountOld = 12500 + (taxable - 250000) * 0.2;
      } else if (taxable <= 1000000) {
        taxAmountOld = 12500 + 50000 + (taxable - 500000) * 0.2;
      } else {
        taxAmountOld = 12500 + 50000 + 100000 + (taxable - 1000000) * 0.3;
      }
    }

    // Calculate tax for new regime (AY 2026-27)
    let taxAmountNew = 0;
    if (taxableNew > 300000) {
      const taxable = taxableNew - 300000;
      if (taxable <= 300000) {
        taxAmountNew = taxable * 0.05;
      } else if (taxable <= 300000) {
        taxAmountNew = 15000 + (taxable - 300000) * 0.1;
      } else if (taxable <= 600000) {
        taxAmountNew = 15000 + (taxable - 600000) * 0.15;
      } else if (taxable <= 600000) {
        taxAmountNew = 15000 + 30000 + (taxable - 900000) * 0.2;
      } else if (taxable <= 300000) {
        taxAmountNew = 15000 + 30000 + 60000 + (taxable - 1200000) * 0.25;
      } else {
        taxAmountNew = 15000 + 30000 + 60000 + 75000 + (taxable - 1500000) * 0.3;
      }
    }

    // Add 4% cess
    taxAmountOld = taxAmountOld * 1.04;
    taxAmountNew = taxAmountNew * 1.04;

    setTaxOld(taxAmountOld);
    setTaxNew(taxAmountNew);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const savings = taxOld - taxNew;
  const betterRegime = taxOld < taxNew ? "old" : "new";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 text-white">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="h-10 w-10" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Income Tax Calculator
              </h1>
            </div>
            <p className="text-xl text-white/90 leading-relaxed">
              Compare Old vs New Tax Regime for AY 2026-27. Find out which regime saves you more tax.
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
                <CardTitle>Income Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Gross Income */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Gross Annual Income
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <input
                      type="number"
                      value={grossIncome}
                      onChange={(e) => setGrossIncome(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 text-lg font-medium border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      min="0"
                      step="10000"
                    />
                  </div>
                </div>

                {/* Deductions (only for old regime) */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Deductions (80C, 80D, etc.)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <input
                      type="number"
                      value={deductions}
                      onChange={(e) => setDeductions(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 text-lg font-medium border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      min="0"
                      step="10000"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Only applicable for Old Tax Regime
                  </p>
                </div>

                {/* Age Group */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Age Group
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setAge("below60")}
                      className={`py-2.5 rounded-lg border-2 font-medium transition-all text-sm ${
                        age === "below60"
                          ? "border-primary bg-primary text-white"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      Below 60
                    </button>
                    <button
                      onClick={() => setAge("60to80")}
                      className={`py-2.5 rounded-lg border-2 font-medium transition-all text-sm ${
                        age === "60to80"
                          ? "border-primary bg-primary text-white"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      60-80
                    </button>
                    <button
                      onClick={() => setAge("above80")}
                      className={`py-2.5 rounded-lg border-2 font-medium transition-all text-sm ${
                        age === "above80"
                          ? "border-primary bg-primary text-white"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      Above 80
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Banner */}
            <Card variant="bordered" className="bg-blue-50 border-blue-200">
              <CardContent className="py-4">
                <div className="flex gap-3">
                  <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-medium mb-1">New Tax Regime Benefits:</p>
                    <ul className="list-disc list-inside space-y-1 text-blue-800">
                      <li>Lower tax rates</li>
                      <li>Higher basic exemption (₹3 lakh)</li>
                      <li>No deductions required</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Tax Comparison */}
            <Card variant="bordered" className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-900">Old Tax Regime</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-orange-700">Taxable Income</span>
                    <span className="font-medium">{formatCurrency(Math.max(0, grossIncome - deductions))}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-orange-300">
                    <span className="text-orange-900 font-medium">Tax Amount</span>
                    <span className="text-2xl font-bold text-orange-600">{formatCurrency(taxOld)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="bordered" className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-900">New Tax Regime</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Taxable Income</span>
                    <span className="font-medium">{formatCurrency(grossIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-green-300">
                    <span className="text-green-900 font-medium">Tax Amount</span>
                    <span className="text-2xl font-bold text-green-600">{formatCurrency(taxNew)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendation */}
            <Card variant="bordered" className="bg-gradient-to-br from-primary to-primary-dark text-white">
              <CardContent className="py-6">
                <div className="text-center">
                  <TrendingDown className="h-10 w-10 mx-auto mb-3" />
                  <div className="text-sm uppercase tracking-wide mb-2 text-white/80">
                    Recommended
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    {betterRegime === "old" ? "Old Tax Regime" : "New Tax Regime"}
                  </div>
                  <div className="text-lg text-white/90">
                    Save {formatCurrency(Math.abs(savings))}
                  </div>
                  {savings > 0 && (
                    <p className="text-sm text-white/70 mt-3">
                      The New Tax Regime saves you more money
                    </p>
                  )}
                  {savings < 0 && (
                    <p className="text-sm text-white/70 mt-3">
                      The Old Tax Regime saves you more with deductions
                    </p>
                  )}
                  {savings === 0 && (
                    <p className="text-sm text-white/70 mt-3">
                      Both regimes result in the same tax
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-16">
          <SectionHeading
            title="Tax Regime Comparison"
            subtitle="Understanding Old vs New Tax Regime in India"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Old Tax Regime</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Allows deductions under 80C, 80D, HRA, etc.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Basic exemption: ₹2.5L (below 60), ₹3L (60-80), ₹5L (above 80)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Higher tax rates but lower taxable income</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Best for those with significant deductions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card variant="bordered">
              <CardHeader>
                <CardTitle>New Tax Regime</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-green-600">•</span>
                    <span>No deductions allowed (few exceptions)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">•</span>
                    <span>Basic exemption: ₹3 lakh for all age groups</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">•</span>
                    <span>Lower tax rates across all slabs</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">•</span>
                    <span>Simpler calculation, best for salaried individuals</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
