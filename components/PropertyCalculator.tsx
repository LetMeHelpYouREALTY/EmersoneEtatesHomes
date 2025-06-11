
import React, { useState, useCallback } from 'react';

interface CalculationResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  downPaymentAmount: number;
  loanAmount: number;
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

  const calculateMortgage = useCallback(() => {
    const validationErrors = validateInputs();
    setErrors(validationErrors);

    if (validationErrors.length > 0) {
      setResult(null);
      return;
    }

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
    
    // Total monthly payment including taxes, insurance, HOA
    const monthlyTaxes = price * taxRate;
    const monthlyPayment = monthlyPI + monthlyTaxes + insuranceMonthly + hoaMonthly;
    
    const totalPayment = monthlyPI * term;
    const totalInterest = totalPayment - loanAmount;

    setResult({
      monthlyPayment,
      totalInterest,
      totalPayment,
      downPaymentAmount,
      loanAmount
    });
  }, [homePrice, downPayment, interestRate, loanTerm, propertyTax, insurance, hoa, validateInputs]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className={`calculator-section ${className}`}>
      <div className="calculator-container">
        <h2>Mortgage Calculator</h2>
        <p>Calculate your estimated monthly payment for homes in Emerson Estates</p>

        <div className="calculator-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="homePrice">Home Price</label>
              <input
                id="homePrice"
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(e.target.value)}
                placeholder="500000"
              />
            </div>
            <div className="form-group">
              <label htmlFor="downPayment">Down Payment (%)</label>
              <input
                id="downPayment"
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                placeholder="20"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="interestRate">Interest Rate (%)</label>
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
              <label htmlFor="loanTerm">Loan Term (years)</label>
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
              <label htmlFor="propertyTax">Property Tax Rate (%)</label>
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

          <div className="form-group">
            <label htmlFor="hoa">HOA Fee (Monthly)</label>
            <input
              id="hoa"
              type="number"
              min="0"
              value={hoa}
              onChange={(e) => setHoa(e.target.value)}
              placeholder="150"
            />
          </div>

          {errors.length > 0 && (
            <div className="error-messages">
              {errors.map((error, index) => (
                <p key={index} className="error-message">{error}</p>
              ))}
            </div>
          )}

          <button 
            type="button" 
            className="calculate-btn"
            onClick={calculateMortgage}
          >
            Calculate Payment
          </button>

          {result && (
            <div className="results">
              <h3>Payment Breakdown</h3>
              <div className="result-grid">
                <div className="result-item highlight">
                  <span className="result-label">Monthly Payment</span>
                  <span className="result-value">{formatCurrency(result.monthlyPayment)}</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Down Payment</span>
                  <span className="result-value">{formatCurrency(result.downPaymentAmount)}</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Loan Amount</span>
                  <span className="result-value">{formatCurrency(result.loanAmount)}</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Total Interest</span>
                  <span className="result-value">{formatCurrency(result.totalInterest)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .calculator-section {
          padding: 3rem 2rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .calculator-container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 16px;
          padding: 2.5rem;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
        }

        .calculator-container h2 {
          color: #1e40af;
          font-size: 2rem;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .calculator-container p {
          color: #64748b;
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          color: #374151;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .form-group input,
        .form-group select {
          padding: 0.875rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .calculate-btn {
          width: 100%;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s ease;
          margin: 1.5rem 0;
        }

        .calculate-btn:hover {
          transform: translateY(-2px);
        }

        .error-messages {
          margin: 1rem 0;
        }

        .error-message {
          color: #dc2626;
          background: #fef2f2;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          margin: 0.25rem 0;
          border-left: 4px solid #dc2626;
        }

        .results {
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 12px;
          margin-top: 1.5rem;
        }

        .results h3 {
          color: #1e40af;
          margin-bottom: 1rem;
          text-align: center;
        }

        .result-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .result-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .result-item.highlight {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          grid-column: 1 / -1;
        }

        .result-label {
          font-weight: 500;
        }

        .result-value {
          font-weight: 700;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .result-grid {
            grid-template-columns: 1fr;
          }

          .calculator-container {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default PropertyCalculator;
