
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalculationResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  downPaymentAmount: number;
  loanAmount: number;
  monthlyPI: number;
  monthlyTaxes: number;
  monthlyInsurance: number;
  monthlyHOA: number;
}

interface PropertyCalculatorProps {
  className?: string;
}

const PropertyCalculator: React.FC<PropertyCalculatorProps> = ({ className = '' }) => {
  const [homePrice, setHomePrice] = useState<string>('500000');
  const [downPayment, setDownPayment] = useState<string>('20');
  const [interestRate, setInterestRate] = useState<string>('7.5');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [propertyTax, setPropertyTax] = useState<string>('1.2');
  const [insurance, setInsurance] = useState<string>('1200');
  const [hoa, setHoa] = useState<string>('150');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const validateInputs = useCallback((): string[] => {
    const newErrors: string[] = [];
    
    if (!homePrice || parseFloat(homePrice) <= 0) {
      newErrors.push('Home price must be greater than 0');
    }
    if (!downPayment || parseFloat(downPayment) < 0 || parseFloat(downPayment) > 100) {
      newErrors.push('Down payment must be between 0% and 100%');
    }
    if (!interestRate || parseFloat(interestRate) <= 0) {
      newErrors.push('Interest rate must be greater than 0');
    }
    if (!loanTerm || parseFloat(loanTerm) <= 0) {
      newErrors.push('Loan term must be greater than 0');
    }

    return newErrors;
  }, [homePrice, downPayment, interestRate, loanTerm]);

  const calculateMortgage = useCallback(async () => {
    const validationErrors = validateInputs();
    setErrors(validationErrors);

    if (validationErrors.length > 0) {
      setResult(null);
      return;
    }

    setIsCalculating(true);

    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const price = parseFloat(homePrice);
    const downPercent = parseFloat(downPayment) / 100;
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseFloat(loanTerm) * 12;
    const taxRate = parseFloat(propertyTax) / 100 / 12;
    const insuranceMonthly = parseFloat(insurance) / 12;
    const hoaMonthly = parseFloat(hoa);

    const downPaymentAmount = price * downPercent;
    const loanAmount = price - downPaymentAmount;

    // Monthly payment calculation (P&I)
    const monthlyPI = loanAmount * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    
    // Individual monthly components
    const monthlyTaxes = price * taxRate;
    const monthlyPayment = monthlyPI + monthlyTaxes + insuranceMonthly + hoaMonthly;
    
    const totalPayment = monthlyPI * term;
    const totalInterest = totalPayment - loanAmount;

    setResult({
      monthlyPayment,
      totalInterest,
      totalPayment,
      downPaymentAmount,
      loanAmount,
      monthlyPI,
      monthlyTaxes,
      monthlyInsurance: insuranceMonthly,
      monthlyHOA: hoaMonthly
    });

    setIsCalculating(false);
  }, [homePrice, downPayment, interestRate, loanTerm, propertyTax, insurance, hoa, validateInputs]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (amount: number, total: number): string => {
    return ((amount / total) * 100).toFixed(1) + '%';
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (homePrice && downPayment && interestRate && loanTerm) {
        calculateMortgage();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [homePrice, downPayment, interestRate, loanTerm, propertyTax, insurance, hoa, calculateMortgage]);

  return (
    <section className={`calculator-section ${className}`} data-analytics="calculator">
      <div className="calculator-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Advanced Mortgage Calculator</h2>
          <p>Calculate your estimated monthly payment with detailed breakdown</p>
        </motion.div>

        <div className="calculator-form">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="homePrice">
                  Home Price
                  <span className="tooltip">💡 Average price in Emerson Estates: $650,000</span>
                </label>
                <div className="input-wrapper">
                  <span className="currency-symbol">$</span>
                  <input
                    id="homePrice"
                    type="number"
                    value={homePrice}
                    onChange={(e) => setHomePrice(e.target.value)}
                    placeholder="500000"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="downPayment">
                  Down Payment (%)
                  <span className="tooltip">💡 20% avoids PMI insurance</span>
                </label>
                <div className="slider-container">
                  <input
                    id="downPayment"
                    type="range"
                    min="0"
                    max="50"
                    step="0.5"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    className="slider"
                  />
                  <div className="slider-value">{downPayment}%</div>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="interestRate">
                  Interest Rate (%)
                  <span className="tooltip">💡 Current average: 7.5%</span>
                </label>
                <input
                  id="interestRate"
                  type="number"
                  step="0.01"
                  min="0"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="7.5"
                />
              </div>
              <div className="form-group">
                <label htmlFor="loanTerm">Loan Term</label>
                <select
                  id="loanTerm"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                >
                  <option value="15">15 years</option>
                  <option value="20">20 years</option>
                  <option value="25">25 years</option>
                  <option value="30">30 years</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="propertyTax">
                  Property Tax Rate (%)
                  <span className="tooltip">💡 Nevada average: 1.2%</span>
                </label>
                <input
                  id="propertyTax"
                  type="number"
                  step="0.01"
                  min="0"
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(e.target.value)}
                  placeholder="1.2"
                />
              </div>
              <div className="form-group">
                <label htmlFor="insurance">Home Insurance (Annual)</label>
                <div className="input-wrapper">
                  <span className="currency-symbol">$</span>
                  <input
                    id="insurance"
                    type="number"
                    min="0"
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
                    placeholder="1200"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="hoa">
                HOA Fee (Monthly)
                <span className="tooltip">💡 Includes community amenities</span>
              </label>
              <div className="input-wrapper">
                <span className="currency-symbol">$</span>
                <input
                  id="hoa"
                  type="number"
                  min="0"
                  value={hoa}
                  onChange={(e) => setHoa(e.target.value)}
                  placeholder="150"
                />
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {errors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="error-messages"
              >
                {errors.map((error, index) => (
                  <p key={index} className="error-message">{error}</p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button 
            type="button" 
            className="calculate-btn"
            onClick={calculateMortgage}
            disabled={isCalculating}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isCalculating ? (
              <span className="calculating">
                <span className="spinner"></span>
                Calculating...
              </span>
            ) : (
              'Calculate Payment'
            )}
          </motion.button>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="results"
              >
                <div className="results-header">
                  <h3>Payment Breakdown</h3>
                  <button 
                    className="toggle-view"
                    onClick={() => setShowComparison(!showComparison)}
                  >
                    {showComparison ? '📊 Chart View' : '📈 Details'}
                  </button>
                </div>

                <div className="result-grid">
                  <motion.div 
                    className="result-item highlight"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="result-label">Total Monthly Payment</span>
                    <span className="result-value">{formatCurrency(result.monthlyPayment)}</span>
                  </motion.div>
                  
                  <div className="result-item">
                    <span className="result-label">Principal & Interest</span>
                    <span className="result-value">{formatCurrency(result.monthlyPI)}</span>
                    <span className="result-percent">{formatPercentage(result.monthlyPI, result.monthlyPayment)}</span>
                  </div>
                  
                  <div className="result-item">
                    <span className="result-label">Property Taxes</span>
                    <span className="result-value">{formatCurrency(result.monthlyTaxes)}</span>
                    <span className="result-percent">{formatPercentage(result.monthlyTaxes, result.monthlyPayment)}</span>
                  </div>
                  
                  <div className="result-item">
                    <span className="result-label">Home Insurance</span>
                    <span className="result-value">{formatCurrency(result.monthlyInsurance)}</span>
                    <span className="result-percent">{formatPercentage(result.monthlyInsurance, result.monthlyPayment)}</span>
                  </div>
                  
                  <div className="result-item">
                    <span className="result-label">HOA Fee</span>
                    <span className="result-value">{formatCurrency(result.monthlyHOA)}</span>
                    <span className="result-percent">{formatPercentage(result.monthlyHOA, result.monthlyPayment)}</span>
                  </div>
                </div>

                <div className="loan-summary">
                  <div className="summary-item">
                    <span>Down Payment</span>
                    <span>{formatCurrency(result.downPaymentAmount)}</span>
                  </div>
                  <div className="summary-item">
                    <span>Loan Amount</span>
                    <span>{formatCurrency(result.loanAmount)}</span>
                  </div>
                  <div className="summary-item">
                    <span>Total Interest</span>
                    <span>{formatCurrency(result.totalInterest)}</span>
                  </div>
                  <div className="summary-item highlight">
                    <span>Total Cost</span>
                    <span>{formatCurrency(result.totalPayment + result.downPaymentAmount)}</span>
                  </div>
                </div>

                <div className="action-buttons">
                  <button className="action-btn primary">
                    📧 Email Results
                  </button>
                  <button className="action-btn secondary">
                    📞 Speak with Agent
                  </button>
                  <button className="action-btn tertiary">
                    🏠 View Properties
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .calculator-section {
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          position: relative;
          overflow: hidden;
        }

        .calculator-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23e5e7eb" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
          opacity: 0.5;
        }

        .calculator-container {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          padding: 3rem;
          box-shadow: 0 25px 60px rgba(0,0,0,0.1);
          position: relative;
          z-index: 1;
        }

        .calculator-container h2 {
          color: #1e40af;
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          text-align: center;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .calculator-container p {
          color: #64748b;
          text-align: center;
          margin-bottom: 3rem;
          font-size: 1.1rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .form-group label {
          color: #374151;
          font-weight: 600;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .tooltip {
          font-size: 0.75rem;
          background: #1e40af;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .form-group:hover .tooltip {
          opacity: 1;
        }

        .input-wrapper {
          position: relative;
        }

        .currency-symbol {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          font-weight: 600;
          z-index: 1;
        }

        .form-group input,
        .form-group select {
          padding: 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #fafafa;
        }

        .input-wrapper input {
          padding-left: 2.5rem;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #3b82f6;
          background: white;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .slider-container {
          position: relative;
        }

        .slider {
          width: 100%;
          height: 8px;
          border-radius: 5px;
          background: #e5e7eb;
          outline: none;
          -webkit-appearance: none;
        }

        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

        .slider-value {
          position: absolute;
          top: -2.5rem;
          right: 0;
          background: #1e40af;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .calculate-btn {
          width: 100%;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          padding: 1.25rem 2rem;
          border: none;
          border-radius: 12px;
          font-size: 1.2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 2rem 0;
          position: relative;
          overflow: hidden;
        }

        .calculate-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .calculating {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-messages {
          margin: 1rem 0;
        }

        .error-message {
          color: #dc2626;
          background: #fef2f2;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          margin: 0.5rem 0;
          border-left: 4px solid #dc2626;
          font-weight: 500;
        }

        .results {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2rem;
          border-radius: 16px;
          margin-top: 2rem;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .results h3 {
          color: #1e40af;
          margin: 0;
          font-size: 1.75rem;
        }

        .toggle-view {
          background: white;
          border: 2px solid #e5e7eb;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .toggle-view:hover {
          border-color: #3b82f6;
          background: #f8fafc;
        }

        .result-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .result-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 15px rgba(0,0,0,0.05);
          position: relative;
        }

        .result-item.highlight {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          grid-column: 1 / -1;
          padding: 2rem;
        }

        .result-label {
          font-weight: 600;
          font-size: 1rem;
        }

        .result-value {
          font-weight: 700;
          font-size: 1.3rem;
        }

        .result-percent {
          position: absolute;
          top: 0.5rem;
          right: 1rem;
          font-size: 0.75rem;
          opacity: 0.7;
        }

        .loan-summary {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          margin-bottom: 2rem;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .summary-item:last-child {
          border-bottom: none;
          font-weight: 700;
          font-size: 1.1rem;
          color: #1e40af;
        }

        .action-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
        }

        .action-btn {
          padding: 1rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          border: none;
        }

        .action-btn.secondary {
          background: white;
          color: #1e40af;
          border: 2px solid #1e40af;
        }

        .action-btn.tertiary {
          background: #f1f5f9;
          color: #64748b;
          border: 2px solid #e5e7eb;
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .calculator-container {
            padding: 2rem;
          }

          .calculator-container h2 {
            font-size: 2rem;
          }

          .action-buttons {
            grid-template-columns: 1fr;
          }

          .results-header {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default PropertyCalculator;
