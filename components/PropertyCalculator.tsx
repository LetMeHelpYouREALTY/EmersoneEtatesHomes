import { useState, ChangeEvent } from 'react';

interface PropertyCalculatorProps {
  className?: string;
}

interface CalculationResults {
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
}

const PropertyCalculator: React.FC<PropertyCalculatorProps> = ({ className = '' }) => {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [results, setResults] = useState<CalculationResults | null>(null);

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>>
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
    <div className={`property-calculator ${className}`}>
      <h3>Mortgage Calculator</h3>

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
          font-family: sans-serif;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
          margin: 20px;
        }

        .calculator-inputs {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
        }

        label {
          margin-bottom: 5px;
        }

        input, select {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .calculate-btn {
          padding: 10px 15px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .calculate-btn:hover {
          background-color: #0056b3;
        }

        .calculation-results {
          margin-top: 20px;
          padding: 15px;
          border: 1px solid #bbb;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default PropertyCalculator;