import { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      localStorage.setItem("isAuth", "true");
      window.location.href = "/home";
    }
  };

  return (
    <main className="main">
      <div className="container">
        <div className="card animate-fade-in">
          <h2>Sign Up</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn" style={{ width: '100%' }}>Sign Up</button>
          </form>

          <p className="text-center mb-sm">
            Already have an account?{' '}
            <a href="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>
              Login
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Signup;
