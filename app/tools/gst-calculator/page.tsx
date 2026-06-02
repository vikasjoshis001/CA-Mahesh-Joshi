"use client";

import { useState, useEffect } from "react";
import { Container, SectionHeading, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Calculator, TrendingUp, Download, PlusCircle, MinusCircle } from "lucide-react";

type CalculationType = "exclude" | "include";

export default function GSTCalculatorPage() {
  const [calculationType, setCalculationType] = useState<CalculationType>("exclude");
  const [amount, setAmount] = useState(10000);
  const [gstRate, setGstRate] = useState(18);
  const [cgst, setCgst] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [igst, setIgst] = useState(0);
  const [netAmount, setNetAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isInterState, setIsInterState] = useState(false);

  useEffect(() => {
    calculateGST();
  }, [amount, gstRate, calculationType, isInterState]);

  const calculateGST = () => {
    if (calculationType === "exclude") {
      // Add GST to the amount
      const gstAmount = (amount * gstRate) / 100;
      const total = amount + gstAmount;

      setNetAmount(amount);
      setTotalAmount(total);

      if (isInterState) {
        setIgst(gstAmount);
        setCgst(0);
        setSgst(0);
      } else {
        const halfGst = gstAmount / 2;
        setCgst(halfGst);
        setSgst(halfGst);
        setIgst(0);
      }
    } else {
      // Extract GST from the amount
      const net = (amount * 100) / (100 + gstRate);
      const gstAmount = amount - net;

      setNetAmount(net);
      setTotalAmount(amount);

      if (isInterState) {
        setIgst(gstAmount);
        setCgst(0);
        setSgst(0);
      } else {
        const halfGst = gstAmount / 2;
        setCgst(halfGst);
        setSgst(halfGst);
        setIgst(0);
      }
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);
  };

  const gstRates = [0, 0.25, 3, 5, 12, 18, 28];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 text-white">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="h-10 w-10" />
              <h1 className="text-4xl md:text-5xl font-bold">
                GST Calculator
              </h1>
            </div>
            <p className="text-xl text-white/90 leading-relaxed">
              Calculate GST amount, CGST, SGST, and IGST for your business transactions. Add or remove GST with ease.
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
              <CardTitle>GST Calculation Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Calculation Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Calculation Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setCalculationType("exclude")}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                      calculationType === "exclude"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <PlusCircle className="h-6 w-6 mb-2" />
                    <span className="font-medium">Add GST</span>
                    <span className="text-xs text-muted-foreground mt-1">Exclude GST</span>
                  </button>
                  <button
                    onClick={() => setCalculationType("include")}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                      calculationType === "include"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <MinusCircle className="h-6 w-6 mb-2" />
                    <span className="font-medium">Remove GST</span>
                    <span className="text-xs text-muted-foreground mt-1">Include GST</span>
                  </button>
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {calculationType === "exclude" ? "Amount (Excluding GST)" : "Amount (Including GST)"}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 text-lg font-medium border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              {/* GST Rate Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  GST Rate (%)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {gstRates.map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setGstRate(rate)}
                      className={`py-2.5 rounded-lg border-2 font-medium transition-all ${
                        gstRate === rate
                          ? "border-primary bg-primary text-white"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <input
                    type="number"
                    value={gstRate}
                    onChange={(e) => setGstRate(Number(e.target.value))}
                    className="w-full px-4 py-2 text-center border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="Custom rate"
                  />
                </div>
              </div>

              {/* Inter-State Toggle */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <div className="font-medium text-foreground">Inter-State Transaction</div>
                  <div className="text-sm text-muted-foreground">
                    {isInterState ? "IGST will be applied" : "CGST + SGST will be applied"}
                  </div>
                </div>
                <button
                  onClick={() => setIsInterState(!isInterState)}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    isInterState ? "bg-primary" : "bg-border"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      isInterState ? "translate-x-7" : ""
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Main Result */}
            <Card variant="bordered" className="bg-gradient-to-br from-primary to-primary-dark text-white">
              <CardContent className="py-8">
                <div className="text-center">
                  <div className="mb-2 text-white/80 text-sm font-medium uppercase tracking-wide">
                    {calculationType === "exclude" ? "Total Amount (With GST)" : "Net Amount (Without GST)"}
                  </div>
                  <div className="text-5xl font-bold mb-2">
                    {calculationType === "exclude"
                      ? formatCurrency(totalAmount)
                      : formatCurrency(netAmount)
                    }
                  </div>
                  <div className="text-white/70 text-sm">
                    {calculationType === "exclude"
                      ? "Amount payable by customer"
                      : "Amount received by seller"
                    }
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* GST Breakdown */}
            <Card variant="bordered">
              <CardHeader>
                <CardTitle>GST Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-muted-foreground">Original Amount</span>
                  <span className="font-bold text-lg">{formatCurrency(netAmount)}</span>
                </div>

                {!isInterState ? (
                  <>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div>
                        <div className="font-medium">CGST ({(gstRate / 2).toFixed(2)}%)</div>
                        <div className="text-xs text-muted-foreground">Central GST</div>
                      </div>
                      <span className="font-bold text-lg text-blue-600">{formatCurrency(cgst)}</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium">SGST ({(gstRate / 2).toFixed(2)}%)</div>
                        <div className="text-xs text-muted-foreground">State GST</div>
                      </div>
                      <span className="font-bold text-lg text-green-600">{formatCurrency(sgst)}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <div>
                      <div className="font-medium">IGST ({gstRate}%)</div>
                      <div className="text-xs text-muted-foreground">Integrated GST</div>
                    </div>
                    <span className="font-bold text-lg text-purple-600">{formatCurrency(igst)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border-2 border-primary">
                  <span className="font-medium text-foreground">Total GST Amount</span>
                  <span className="font-bold text-xl text-primary">
                    {formatCurrency(isInterState ? igst : cgst + sgst)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20">
                  <span className="font-semibold text-foreground">Final Amount</span>
                  <span className="font-bold text-2xl text-primary">{formatCurrency(totalAmount)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Summary */}
            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST Rate:</span>
                    <span className="font-medium">{gstRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction Type:</span>
                    <span className="font-medium">{isInterState ? "Inter-State" : "Intra-State"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST Components:</span>
                    <span className="font-medium">{isInterState ? "IGST" : "CGST + SGST"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-16">
          <SectionHeading
            title="Understanding GST"
            subtitle="Everything you need to know about Goods and Services Tax"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card variant="bordered">
              <CardHeader>
                <CardTitle>What is GST?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  GST (Goods and Services Tax) is an indirect tax levied on the supply of goods and services in India. It replaced multiple indirect taxes like VAT, Service Tax, and Excise Duty.
                </p>
              </CardContent>
            </Card>

            <Card variant="bordered">
              <CardHeader>
                <CardTitle>CGST & SGST</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  For intra-state transactions, GST is divided equally between Central GST (CGST) and State GST (SGST). Both are levied at equal rates on the same transaction.
                </p>
              </CardContent>
            </Card>

            <Card variant="bordered">
              <CardHeader>
                <CardTitle>IGST</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Integrated GST (IGST) is levied on inter-state supply of goods and services. The entire tax is collected by the Central Government and then shared with the respective states.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card variant="bordered" className="mt-6">
            <CardHeader>
              <CardTitle>GST Rate Slabs in India</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">0%</div>
                  <div className="text-sm text-muted-foreground mt-1">Essential items</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">5%</div>
                  <div className="text-sm text-muted-foreground mt-1">Common use items</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">12%</div>
                  <div className="text-sm text-muted-foreground mt-1">Standard items</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">18%</div>
                  <div className="text-sm text-muted-foreground mt-1">Most goods</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
