import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Sun, TrendingUp, IndianRupee, Leaf } from "lucide-react";

const CalculatorSection = () => {
  const [monthlyBill, setMonthlyBill] = useState(3000);
  const [results, setResults] = useState({
    systemSize: 0,
    estimatedCost: 0,
    yearlySavings: 0,
    totalSavings25Years: 0,
    co2Offset: 0,
    paybackPeriod: 0,
  });

  useEffect(() => {
    // Calculate solar system requirements based on electricity bill
    // Assuming ₹7 per unit average and 4.5 peak sun hours in Tamil Nadu
    const unitsPerMonth = monthlyBill / 7;
    const unitsPerYear = unitsPerMonth * 12;
    const systemSize = Math.ceil((unitsPerMonth / 30) / 4.5); // kW required
    
    // Cost calculation (₹50,000 per kW after subsidies)
    const estimatedCost = systemSize * 50000;
    
    // Savings calculation (accounting for 0.5% annual degradation)
    const yearlySavings = monthlyBill * 12 * 0.9; // 90% offset assumption
    
    // 25-year savings with 5% electricity price increase annually
    let totalSavings = 0;
    let currentSavings = yearlySavings;
    for (let i = 0; i < 25; i++) {
      totalSavings += currentSavings;
      currentSavings *= 1.05; // 5% annual increase
    }
    
    // CO2 offset (0.82 kg CO2 per kWh)
    const co2Offset = Math.round((unitsPerYear * 0.82) / 1000); // tons per year
    
    // Payback period
    const paybackPeriod = Math.round((estimatedCost / yearlySavings) * 10) / 10;

    setResults({
      systemSize,
      estimatedCost,
      yearlySavings: Math.round(yearlySavings),
      totalSavings25Years: Math.round(totalSavings),
      co2Offset,
      paybackPeriod,
    });
  }, [monthlyBill]);

  const formatCurrency = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    }
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <section id="calculator" className="section-padding bg-foreground text-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary font-semibold text-sm mb-4">
            Solar Calculator
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Calculate Your Savings
          </h2>
          <p className="text-lg text-background/70 max-w-2xl mx-auto">
            Enter your monthly electricity bill to see how much you can save
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Input Section */}
          <div className="bg-background/5 rounded-3xl p-8 border border-background/10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <IndianRupee className="w-6 h-6 text-primary" />
              Your Monthly Electricity Bill
            </h3>

            {/* Bill Amount Display */}
            <div className="text-center mb-8">
              <div className="text-6xl md:text-7xl font-bold text-primary mb-2">
                ₹{monthlyBill.toLocaleString('en-IN')}
              </div>
              <p className="text-background/60">per month</p>
            </div>

            {/* Slider */}
            <div className="mb-8">
              <Slider
                value={[monthlyBill]}
                onValueChange={(value) => setMonthlyBill(value[0])}
                min={1000}
                max={20000}
                step={500}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-background/60 mt-2">
                <span>₹1,000</span>
                <span>₹20,000</span>
              </div>
            </div>

            {/* Quick Select */}
            <div className="flex flex-wrap gap-2">
              {[2000, 4000, 6000, 8000, 10000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setMonthlyBill(amount)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    monthlyBill === amount
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background/10 text-background hover:bg-background/20'
                  }`}
                >
                  ₹{amount.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>

          {/* Right - Results Section */}
          <div className="space-y-6">
            {/* System Size Card */}
            <div className="bg-primary/20 rounded-2xl p-6 border border-primary/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-background/70 mb-1">Recommended System</p>
                  <p className="text-4xl font-bold">{results.systemSize} kW</p>
                </div>
                <Sun className="w-12 h-12 text-primary" />
              </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background/5 rounded-2xl p-6 border border-background/10">
                <p className="text-background/70 text-sm mb-1">Estimated Cost</p>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(results.estimatedCost)}
                </p>
                <p className="text-xs text-background/50 mt-1">After subsidies</p>
              </div>
              
              <div className="bg-background/5 rounded-2xl p-6 border border-background/10">
                <p className="text-background/70 text-sm mb-1">Yearly Savings</p>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(results.yearlySavings)}
                </p>
                <p className="text-xs text-background/50 mt-1">First year</p>
              </div>

              <div className="bg-background/5 rounded-2xl p-6 border border-background/10">
                <p className="text-background/70 text-sm mb-1">25 Year Savings</p>
                <p className="text-2xl font-bold text-gradient">
                  {formatCurrency(results.totalSavings25Years)}
                </p>
                <p className="text-xs text-background/50 mt-1">Total lifetime</p>
              </div>

              <div className="bg-background/5 rounded-2xl p-6 border border-background/10">
                <p className="text-background/70 text-sm mb-1">Payback Period</p>
                <p className="text-2xl font-bold">{results.paybackPeriod} Years</p>
                <p className="text-xs text-background/50 mt-1">ROI time</p>
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <Leaf className="w-8 h-8 text-green-500" />
              <div>
                <p className="font-medium">Environmental Impact</p>
                <p className="text-sm text-background/70">
                  Offset {results.co2Offset} tons of CO₂ per year - equivalent to planting {results.co2Offset * 15} trees
                </p>
              </div>
            </div>

            {/* CTA */}
            <Button 
              variant="solar" 
              size="xl" 
              className="w-full"
              asChild
            >
              <a href="#contact">
                Get Your Free Quote
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
