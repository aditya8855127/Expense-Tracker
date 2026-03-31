function Home() {
  const mockStats = [
    { label: 'Current Balance', value: '$4,250.00', color: 'var(--primary)' },
    { label: 'Monthly Expenses', value: '$1,250.00', color: 'var(--accent)' },
    { label: 'Income This Month', value: '$5,500.00', color: 'var(--secondary)' },
    { label: 'Savings Rate', value: '23%', color: 'var(--primary)' }
  ];

  const mockTransactions = [
    { date: '2024-01-15', desc: 'Groceries - Supermarket', amount: '-$45.30' },
    { date: '2024-01-14', desc: 'Salary', amount: '+$3,200.00' },
    { date: '2024-01-13', desc: 'Netflix', amount: '-$12.99' },
    { date: '2024-01-12', desc: 'Gas', amount: '-$55.00' },
    { date: '2024-01-11', desc: 'Freelance Work', amount: '+$450.00' }
  ];

  return (
    <main className="main">
      <div className="container">
        <h1>Dashboard</h1>

        <div className="grid mb-lg">
          {mockStats.map((stat, index) => (
            <div key={index} className="stat-card animate-fade-in">
              <div className="stat-number" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <h3>{stat.label}</h3>
            </div>
          ))}
        </div>

        <div className="card mb-lg">
          <h2>Recent Transactions</h2>
          <div className="grid" style={{ gridTemplateColumns: '2fr 2fr 1fr', alignItems: 'center' }}>
            <strong>Date</strong>
            <strong>Description</strong>
            <strong>Amount</strong>
            {mockTransactions.map((tx, index) => (
              <>
                <span key={`date-${index}`}>{tx.date}</span>
                <span key={`desc-${index}`}>{tx.desc}</span>
                <span key={`amt-${index}`} style={{ fontWeight: '600', color: tx.amount.startsWith('+') ? 'var(--primary)' : 'var(--accent)' }}>
                  {tx.amount}
                </span>
              </>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
