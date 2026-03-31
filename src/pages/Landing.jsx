function Landing() {
  return (
    <main className="main">
      <div className="hero">
        <div className="container">
          <h1>Smart Wallet 💰</h1>
          <p>Take control of your finances with intelligent tracking, budgeting, and insights.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/login" className="btn">Get Started</a>
            <a href="/signup" className="btn btn-secondary">Learn More</a>
          </div>
        </div>
      </div>

      <section className="container mb-lg">
        <h2 className="text-center">Why Choose Smart Wallet?</h2>
        <div className="grid">
          <div className="stat-card animate-fade-in">
            <h3>📊 Track Expenses</h3>
            <p>Automatically categorize and track all your spending in real-time.</p>
          </div>
          <div className="stat-card animate-fade-in">
            <h3>💳 Set Budgets</h3>
            <p>Smart budgets that adapt to your spending habits and keep you on track.</p>
          </div>
          <div className="stat-card animate-fade-in">
            <h3>📈 Gain Insights</h3>
            <p>Beautiful charts and reports to understand your financial health.</p>
          </div>
          <div className="stat-card animate-fade-in">
            <h3>🔒 Secure & Private</h3>
            <p>Your data stays on your device. No accounts, no tracking.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Landing;
