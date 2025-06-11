
import React, { useState, useMemo } from 'react';

interface PropertyCalculatorProps {
  className?: string;
}

export default function PropertyCalculator({ className = "" }: PropertyCalculatorProps) {
  const [homePrice, setHomePrice] = useState(850000);
  const [downPayment, setDownPayment] = useState(170000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const calculations = useMemo(() => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      downPaymentPercent: ((downPayment / homePrice) * 100).toFixed(1)
    };
  }, [homePrice, downPayment, interestRate, loanTerm]);

  return (
    <section className={`property-calculator ${className}`}>
      <div className="calculator-container">
        <div className="calculator-header">
          <h2>Mortgage Calculator</h2>
          <p>Estimate your monthly payments for Emerson Estates properties</p>
        </div>

        <div className="calculator-content">
          <div className="inputs-section">
            <div className="input-group">
              <label htmlFor="homePrice">Home Price</label>
              <input
                id="homePrice"
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                step="10000"
                min="100000"
              />
            </div>

            <div className="input-group">
              <label htmlFor="downPayment">Down Payment</label>
              <input
                id="downPayment"
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                step="5000"
                min="0"
              />
              <span className="percentage">({calculations.downPaymentPercent}%)</span>
            </div>

            <div className="input-group">
              <label htmlFor="interestRate">Interest Rate (%)</label>
              <input
                id="interestRate"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                step="0.1"
                min="0"
                max="15"
              />
            </div>

            <div className="input-group">
              <label htmlFor="loanTerm">Loan Term (Years)</label>
              <select
                id="loanTerm"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
              >
                <option value={15}>15 years</option>
                <option value={20}>20 years</option>
                <option value={30}>30 years</option>
              </select>
            </div>
          </div>

          <div className="results-section">
            <div className="result-card main-result">
              <div className="result-label">Monthly Payment</div>
              <div className="result-value">${Number(calculations.monthlyPayment).toLocaleString()}</div>
            </div>

            <div className="result-card">
              <div className="result-label">Total Payment</div>
              <div className="result-value">${Number(calculations.totalPayment).toLocaleString()}</div>
            </div>

            <div className="result-card">
              <div className="result-label">Total Interest</div>
              <div className="result-value">${Number(calculations.totalInterest).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .property-calculator {
          background: #f8fafc;
          padding: 4rem 2rem;
          margin: 2rem 0;
        }

        .calculator-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .calculator-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .calculator-header h2 {
          font-size: 2.5rem;
          color: #1e293b;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .calculator-header p {
          font-size: 1.2rem;
          color: #64748b;
        }

        .calculator-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        .inputs-section {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .input-group {
          margin-bottom: 1.5rem;
          position: relative;
        }

        .input-group label {
          display: block;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .input-group input,
        .input-group select {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .input-group input:focus,
        .input-group select:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .percentage {
          position: absolute;
          right: 1rem;
          top: 2.5rem;
          color: #6b7280;
          font-size: 0.9rem;
        }

        .results-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .result-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          text-align: center;
        }

        .result-card.main-result {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          color: white;
          transform: scale(1.05);
        }

        .result-label {
          font-size: 0.9rem;
          font-weight: 600;
          opacity: 0.8;
          margin-bottom: 0.5rem;
        }

        .result-value {
          font-size: 1.8rem;
          font-weight: 800;
        }

        .main-result .result-value {
          font-size: 2.2rem;
          color: #fbbf24;
        }

        @media (max-width: 768px) {
          .calculator-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .calculator-header h2 {
            font-size: 2rem;
          }

          .result-card.main-result {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
import { useState, useMemo } from 'react';

interface PropertyCalculatorProps {
  className?: string;
}

export default function PropertyCalculator({ className = "" }: PropertyCalculatorProps) {
  const [homePrice, setHomePrice] = useState(850000);
  const [downPayment, setDownPayment] = useState(170000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const calculations = useMemo(() => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      downPaymentPercent: ((downPayment / homePrice) * 100).toFixed(1)
    };
  }, [homePrice, downPayment, interestRate, loanTerm]);

  return (
    <section className={`property-calculator ${className}`}>
      <div className="calculator-container">
        <div className="calculator-header">
          <h2>Mortgage Calculator</h2>
          <p>Estimate your monthly payments for Emerson Estates properties</p>
        </div>

        <div className="calculator-content">
          <div className="calculator-inputs">
            <div className="input-group">
              <label htmlFor="homePrice">Home Price</label>
              <input
                type="number"
                id="homePrice"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                min="100000"
                step="10000"
              />
            </div>

            <div className="input-group">
              <label htmlFor="downPayment">Down Payment</label>
              <input
                type="number"
                id="downPayment"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                min="0"
                step="5000"
              />
              <small>{calculations.downPaymentPercent}% of home price</small>
            </div>

            <div className="input-group">
              <label htmlFor="interestRate">Interest Rate (%)</label>
              <input
                type="number"
                id="interestRate"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                min="0"
                max="20"
                step="0.1"
              />
            </div>

            <div className="input-group">
              <label htmlFor="loanTerm">Loan Term (years)</label>
              <select
                id="loanTerm"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
              >
                <option value={15}>15 years</option>
                <option value={20}>20 years</option>
                <option value={25}>25 years</option>
                <option value={30}>30 years</option>
              </select>
            </div>
          </div>

          <div className="calculator-results">
            <div className="result-card primary">
              <h3>Monthly Payment</h3>
              <div className="amount">${Number(calculations.monthlyPayment).toLocaleString()}</div>
            </div>

            <div className="result-card">
              <h4>Total Interest</h4>
              <div className="amount">${Number(calculations.totalInterest).toLocaleString()}</div>
            </div>

            <div className="result-card">
              <h4>Total Payment</h4>
              <div className="amount">${Number(calculations.totalPayment).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .property-calculator {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          margin: 2rem 0;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }

        .calculator-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .calculator-header h2 {
          color: #1f2937;
          margin: 0 0 0.5rem 0;
          font-size: 1.8rem;
        }

        .calculator-header p {
          color: #6b7280;
          margin: 0;
        }

        .calculator-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        .calculator-inputs {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
        }

        .input-group label {
          color: #374151;
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .input-group input,
        .input-group select {
          padding: 0.75rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .input-group input:focus,
        .input-group select:focus {
          outline: none;
          border-color: #2563eb;
        }

        .input-group small {
          color: #6b7280;
          font-size: 0.8rem;
          margin-top: 0.25rem;
        }

        .calculator-results {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .result-card {
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          text-align: center;
        }

        .result-card.primary {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: white;
          transform: scale(1.05);
        }

        .result-card h3,
        .result-card h4 {
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
          opacity: 0.9;
        }

        .result-card .amount {
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0;
        }

        .result-card.primary .amount {
          font-size: 2.2rem;
        }

        @media (max-width: 768px) {
          .property-calculator {
            padding: 1.5rem;
          }

          .calculator-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .result-card .amount {
            font-size: 1.5rem;
          }

          .result-card.primary .amount {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </section>
  );
}
