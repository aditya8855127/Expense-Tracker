function About() {
  const features = [
    'Real-time expense tracking',
    'Smart budgeting tools',
    'Custom reports and charts',
    'Secure local storage',
    'Fully responsive design',
    'No subscription required'
  ];

  return (
    <main className="main">
      <div className="container">
        <h1>About Smart Wallet</h1>

        <div className="card mb-lg animate-fade-in">
          <h2>Our Mission</h2>
          <p>
            Smart Wallet is designed to empower individuals to take full control of their finances 
            with a simple, beautiful, and privacy-focused application. No accounts, no servers – 
            just you and your data.
          </p>
        </div>

        <div className="grid mb-lg">
          <div className="stat-card">
            <h3>Key Features</h3>
            <ul style={{ textAlign: 'left', paddingLeft: '1.5rem' }}>
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="stat-card">
            <h3>Built With</h3>
            <ul style={{ textAlign: 'left', paddingLeft: '1.5rem' }}>
              <li>React 19</li>
              <li>React Router</li>
              <li>Vite (Fast HMR)</li>
              <li>Modern CSS (Custom Properties)</li>
              <li>LocalStorage (Privacy First)</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default About;
