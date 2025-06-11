import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface CalculatorState {
  homePrice: number;
  downPayment: number;
  downPaymentPercent: number;
  loanTerm: number;
  interestRate: number;
  propertyTax: number;
  homeInsurance: number;
  pmi: number;
  hoaFees: number;
}

interface CalculationResults {
  monthlyPayment: number;
  principalAndInterest: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyPMI: number;
  monthlyHOA: number;
  totalMonthly: number;
  totalInterest: number;
  totalCost: number;
  loanAmount: number;
}

const PropertyCalculator: React.FC = () => {
  const [values, setValues] = useState<CalculatorState>({
    homePrice: 675000,
    downPayment: 135000,
    downPaymentPercent: 20,
    loanTerm: 30,
    interestRate: 7.25,
    propertyTax: 8100,
    homeInsurance: 2400,
    pmi: 0,
    hoaFees: 150
  });

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');

  useEffect(() => {
    // Auto-calculate down payment amount when percentage changes
    const newDownPayment = (values.homePrice * values.downPaymentPercent) / 100;
    if (Math.abs(newDownPayment - values.downPayment) > 1) {
      setValues(prev => ({ ...prev, downPayment: newDownPayment }));
    }
  }, [values.homePrice, values.downPaymentPercent, values.downPayment]);

  useEffect(() => {
    // Auto-calculate down payment percentage when amount changes
    const newPercent = (values.downPayment / values.homePrice) * 100;
    if (Math.abs(newPercent - values.downPaymentPercent) > 0.1) {
      setValues(prev => ({ ...prev, downPaymentPercent: newPercent }));
    }
  }, [values.downPayment, values.homePrice, values.downPaymentPercent]);

  useEffect(() => {
    calculatePayments();
  }, [values]);

  const calculatePayments = () => {
    setIsCalculating(true);

    setTimeout(() => {
      const loanAmount = values.homePrice - values.downPayment;
      const monthlyRate = values.interestRate / 100 / 12;
      const numberOfPayments = values.loanTerm * 12;

      let principalAndInterest = 0;
      if (monthlyRate > 0) {
        principalAndInterest = loanAmount * 
          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      } else {
        principalAndInterest = loanAmount / numberOfPayments;
      }

      const monthlyTax = values.propertyTax / 12;
      const monthlyInsurance = values.homeInsurance / 12;
      const monthlyPMI = values.downPaymentPercent < 20 ? values.pmi : 0;
      const monthlyHOA = values.hoaFees;

      const totalMonthly = principalAndInterest + monthlyTax + monthlyInsurance + monthlyPMI + monthlyHOA;
      const totalInterest = (principalAndInterest * numberOfPayments) - loanAmount;
      const totalCost = values.homePrice + totalInterest;

      setResults({
        monthlyPayment: principalAndInterest,
        principalAndInterest,
        monthlyTax,
        monthlyInsurance,
        monthlyPMI,
        monthlyHOA,
        totalMonthly,
        totalInterest,
        totalCost,
        loanAmount
      });

      setIsCalculating(false);
    }, 500);
  };

  const handleInputChange = (field: keyof CalculatorState, value: number) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getAffordabilityLevel = (ratio: number): { level: string, color: string, description: string } => {
    if (ratio <= 28) return { level: 'Excellent', color: '#10b981', description: 'Well within recommended range' };
    if (ratio <= 36) return { level: 'Good', color: '#f59e0b', description: 'Acceptable debt-to-income ratio' };
    if (ratio <= 43) return { level: 'Caution', color: '#ef4444', description: 'Higher than recommended' };
    return { level: 'High Risk', color: '#dc2626', description: 'Consider lower price range' };
  };

  return (
    <section className="property-calculator">
      <div className="calculator-container">
        <div className="calculator-header">
          <h2>Mortgage Payment Calculator</h2>
          <p>Calculate your monthly payments and see what you can afford</p>

          <div className="tab-navigation">
            <button 
              className={`tab-btn ${activeTab === 'basic' ? 'active' : ''}`}
              onClick={() => setActiveTab('basic')}
            >
              Basic Calculator
            </button>
            <button 
              className={`tab-btn ${activeTab === 'advanced' ? 'active' : ''}`}
              onClick={() => setActiveTab('advanced')}
            >
              Advanced Details
            </button>
          </div>
        </div>

        <div className="calculator-content">
          <div className="calculator-inputs">
            <div className="input-section">
              <h3>Loan Details</h3>

              <div className="input-group">
                <label>Home Price</label>
                <div className="input-with-icon">
                  <span className="input-icon">$</span>
                  <input
                    type="number"
                    value={values.homePrice}
                    onChange={(e) => handleInputChange('homePrice', Number(e.target.value))}
                    min="0"
                    step="1000"
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Down Payment</label>
                  <div className="input-with-icon">
                    <span className="input-icon">$</span>
                    <input
                      type="number"
                      value={values.downPayment}
                      onChange={(e) => handleInputChange('downPayment', Number(e.target.value))}
                      min="0"
                      step="1000"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Down Payment %</label>
                  <div className="input-with-icon">
                    <input
                      type="number"
                      value={Math.round(values.downPaymentPercent * 10) / 10}
                      onChange={(e) => handleInputChange('downPaymentPercent', Number(e.target.value))}
                      min="0"
                      max="100"
                      step="0.5"
                    />
                    <span className="input-icon">%</span>
                  </div>
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Loan Term</label>
                  <select
                    value={values.loanTerm}
                    onChange={(e) => handleInputChange('loanTerm', Number(e.target.value))}
                  >
                    <option value={15}>15 years</option>
                    <option value={20}>20 years</option>
                    <option value={25}>25 years</option>
                    <option value={30}>30 years</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Interest Rate</label>
                  <div className="input-with-icon">
                    <input
                      type="number"
                      value={values.interestRate}
                      onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
                      min="0"
                      max="20"
                      step="0.125"
                    />
                    <span className="input-icon">%</span>
                  </div>
                </div>
              </div>
            </div>

            {activeTab === 'advanced' && (
              <div className="input-section">
                <h3>Additional Costs</h3>

                <div className="input-group">
                  <label>Annual Property Tax</label>
                  <div className="input-with-icon">
                    <span className="input-icon">$</span>
                    <input
                      type="number"
                      value={values.propertyTax}
                      onChange={(e) => handleInputChange('propertyTax', Number(e.target.value))}
                      min="0"
                      step="100"
                    />
                  </div>
                </div>

                <div className="input-row">
                  <div className="input-group">
                    <label>Home Insurance (Annual)</label>
                    <div className="input-with-icon">
                      <span className="input-icon">$</span>
                      <input
                        type="number"
                        value={values.homeInsurance}
                        onChange={(e) => handleInputChange('homeInsurance', Number(e.target.value))}
                        min="0"
                        step="100"
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>PMI (Monthly)</label>
                    <div className="input-with-icon">
                      <span className="input-icon">$</span>
                      <input
                        type="number"
                        value={values.pmi}
                        onChange={(e) => handleInputChange('pmi', Number(e.target.value))}
                        min="0"
                        step="25"
                        disabled={values.downPaymentPercent >= 20}
                      />
                    </div>
                  </div>
                </div>

                <div className="input-group">
                  <label>HOA Fees (Monthly)</label>
                  <div className="input-with-icon">
                    <span className="input-icon">$</span>
                    <input
                      type="number"
                      value={values.hoaFees}
                      onChange={(e) => handleInputChange('hoaFees', Number(e.target.value))}
                      min="0"
                      step="25"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="calculator-results">
            {isCalculating ? (
              <div className="loading-results">
                <div className="loading-spinner"></div>
                <p>Calculating payments...</p>
              </div>
            ) : results && (
              <>
                <div className="result-card primary">
                  <div className="result-icon">🏠</div>
                  <div className="result-value">{formatCurrency(results.totalMonthly)}</div>
                  <div className="result-label">Total Monthly Payment</div>
                </div>

                <div className="result-breakdown">
                  <h4>Payment Breakdown</h4>
                  <div className="breakdown-item">
                    <span>Principal & Interest</span>
                    <span>{formatCurrency(results.principalAndInterest)}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Property Tax</span>
                    <span>{formatCurrency(results.monthlyTax)}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Home Insurance</span>
                    <span>{formatCurrency(results.monthlyInsurance)}</span>
                  </div>
                  {results.monthlyPMI > 0 && (
                    <div className="breakdown-item">
                      <span>PMI</span>
                      <span>{formatCurrency(results.monthlyPMI)}</span>
                    </div>
                  )}
                  {results.monthlyHOA > 0 && (
                    <div className="breakdown-item">
                      <span>HOA Fees</span>
                      <span>{formatCurrency(results.monthlyHOA)}</span>
                    </div>
                  )}
                </div>

                <div className="loan-summary">
                  <h4>Loan Summary</h4>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span className="summary-label">Loan Amount</span>
                      <span className="summary-value">{formatCurrency(results.loanAmount)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Total Interest</span>
                      <span className="summary-value">{formatCurrency(results.totalInterest)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Total Cost</span>
                      <span className="summary-value">{formatCurrency(results.totalCost)}</span>
                    </div>
                  </div>
                </div>

                <div className="affordability-check">
                  {(() => {
                    const monthlyIncome = results.totalMonthly / 0.28; // Assuming 28% DTI
                    const debtRatio = (results.totalMonthly / monthlyIncome) * 100;
                    const affordability = getAffordabilityLevel(debtRatio);

                    return (
                      <div className="affordability-card">
                        <h4>Affordability Assessment</h4>
                        <div className="affordability-indicator" style={{ borderColor: affordability.color }}>
                          <div className="affordability-level" style={{ color: affordability.color }}>
                            {affordability.level}
                          </div>
                          <div className="affordability-description">
                            {affordability.description}
                          </div>
                          <div className="recommended-income">
                            Recommended monthly income: {formatCurrency(monthlyIncome)}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="action-buttons">
                  <Link 
                    href="/contact" 
                    style={{
                      display: 'inline-block',
                      padding: '12px 24px',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      margin: '8px'
                    }}
                  >
                    Get Pre-Approved
                  </Link>
                  <Link 
                    href="/homes" 
                    style={{
                      display: 'inline-block',
                      padding: '12px 24px',
                      backgroundColor: 'transparent',
                      color: '#2563eb',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      border: '2px solid #2563eb',
                      margin: '8px'
                    }}
                  >
                    View Available Homes
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .property-calculator {
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .calculator-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .calculator-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .calculator-header h2 {
          font-size: 2.5rem;
          color: #1e40af;
          margin-bottom: 1rem;
        }

        .calculator-header p {
          font-size: 1.2rem;
          color: #64748b;
          margin-bottom: 2rem;
        }

        .tab-navigation {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          background: white;
          padding: 0.5rem;
          border-radius: 50px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          display: inline-flex;
        }

        .tab-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          background: transparent;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #64748b;
        }

        .tab-btn.active {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
        }

        .calculator-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-top: 3rem;
        }

        .calculator-inputs {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          height: fit-content;
        }

        .input-section {
          margin-bottom: 2.5rem;
        }

        .input-section h3 {
          color: #1e40af;
          margin-bottom: 1.5rem;
          font-size: 1.3rem;
        }

        .input-group {
          margin-bottom: 1.5rem;
        }

        .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .input-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #374151;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: #64748b;
          font-weight: 600;
          z-index: 1;
        }

        .input-with-icon input {
          padding-left: 2.5rem;
        }

        .input-with-icon input:has(+ .input-icon) {
          padding-left: 1rem;
          padding-right: 2.5rem;
        }

        .input-with-icon .input-icon:last-child {
          left: auto;
          right: 1rem;
        }

        .input-group input,
        .input-group select {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .input-group input:focus,
        .input-group select:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .input-group input:disabled {
          background: #f9fafb;
          color: #9ca3af;
          cursor: not-allowed;
        }

        .calculator-results {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          height: fit-content;
        }

        .loading-results {
          text-align: center;
          padding: 3rem 0;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e5e7eb;
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        .result-card {
          text-align: center;
          padding: 2rem;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          border-radius: 16px;
          color: white;
          margin-bottom: 2rem;
        }

        .result-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .result-value {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .result-label {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .result-breakdown,
        .loan-summary,
        .affordability-check {
          margin-bottom: 2rem;
        }

        .result-breakdown h4,
        .loan-summary h4,
        .affordability-check h4 {
          color: #1e40af;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        .breakdown-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .breakdown-item:last-child {
          border-bottom: none;
        }

        .summary-grid {
          display: grid;
          gap: 1rem;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 8px;
        }

        .summary-label {
          color: #64748b;
        }

        .summary-value {
          font-weight: 700;
          color: #1e40af;
        }

        .affordability-card {
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 12px;
        }

        .affordability-indicator {
          padding: 1rem;
          border-left: 4px solid;
          background: white;
          border-radius: 8px;
        }

        .affordability-level {
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .affordability-description {
          color: #64748b;
          margin-bottom: 0.5rem;
        }

        .recommended-income {
          font-size: 0.9rem;
          color: #374151;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .action-btn {
          flex: 1;
          padding: 1rem 2rem;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          text-align: center;
          transition: transform 0.3s ease;
          min-width: 180px;
        }

        .action-btn:hover {
          transform: translateY(-2px);
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
        }

        .action-btn.secondary {
          background: white;
          color: #1e40af;
          border: 2px solid #1e40af;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .calculator-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .input-row {
            grid-template-columns: 1fr;
          }

          .action-buttons {
            flex-direction: column;
          }

          .tab-navigation {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default PropertyCalculator;