import { useState, ChangeEvent } from 'react';
import styles from '../styles/Home.module.css';

interface PropertyCalculatorProps {
  className?: string;
}

interface CalculationResults {
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
}

interface CalculatorFormData {
  loanAmount: string;
  interestRate: string;
  loanTerm: string;
}

const PropertyCalculator: React.FC<PropertyCalculatorProps> = ({ className = '' }) => {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [results, setResults] = useState<CalculationResults | null>(null);

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setter(e.target.value);
  };

  const calculatePayment = (): void => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const payments = parseFloat(loanTerm) * 12;

    if (principal && rate && payments) {
      const monthlyPayment = (principal * rate * Math.pow(1 + rate, payments)) /
                            (Math.pow(1 + rate, payments) - 1);
      const totalAmount = monthlyPayment * payments;
      const totalInterest = totalAmount - principal;

      setResults({
        monthlyPayment,
        totalInterest,
        totalAmount
      });
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <section className={`${styles.section} ${className}`} style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <div className="property-calculator">
        <div className="calculator-header">
          <h2>Mortgage Calculator</h2>
          <p>Calculate your monthly payments for luxury homes</p>
        </div>

        <div className="calculator-inputs">
        <div className="input-group">
          <label htmlFor="loan-amount">Loan Amount:</label>
          <input
            id="loan-amount"
            type="number"
            value={loanAmount}
            onChange={handleInputChange(setLoanAmount)}
            placeholder="Enter loan amount"
          />
        </div>

        <div className="input-group">
          <label htmlFor="interest-rate">Interest Rate (%):</label>
          <input
            id="interest-rate"
            type="number"
            step="0.01"
            value={interestRate}
            onChange={handleInputChange(setInterestRate)}
            placeholder="Enter interest rate"
          />
        </div>

        <div className="input-group">
          <label htmlFor="loan-term">Loan Term (years):</label>
          <select
            id="loan-term"
            value={loanTerm}
            onChange={handleInputChange(setLoanTerm)}
          >
            <option value="15">15 years</option>
            <option value="20">20 years</option>
            <option value="30">30 years</option>
          </select>
        </div>

        <button
          type="button"
          onClick={calculatePayment}
          className="calculate-btn"
        >
          Calculate Payment
        </button>
      </div>

      {results && (
        <div className="calculation-results">
          <h4>Results:</h4>
          <p>Monthly Payment: {formatCurrency(results.monthlyPayment)}</p>
          <p>Total Interest: {formatCurrency(results.totalInterest)}</p>
          <p>Total Amount: {formatCurrency(results.totalAmount)}</p>
        </div>
      )}
      <style jsx>{`
        .property-calculator {
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem 2rem;
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
        }

        .calculator-inputs {
          background: white;
          padding: 3rem;
          border-radius: 16px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
          display: grid;
          gap: 2rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
        }

        label {
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #374151;
        }

        input, select {
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        input:focus, select:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .calculate-btn {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s ease;
          margin-top: 1rem;
        }

        .calculate-btn:hover {
          transform: translateY(-2px);
        }

        .calculation-results {
          margin-top: 2rem;
          padding: 2rem;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: white;
          border-radius: 12px;
        }

        .calculation-results h4 {
          color: #fbbf24;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .calculation-results p {
          margin-bottom: 0.75rem;
          font-size: 1.1rem;
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .calculation-results p:last-child {
          border-bottom: none;
          font-weight: 700;
          color: #fbbf24;
        }

        @media (max-width: 768px) {
          .calculator-inputs {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PropertyCalculator;