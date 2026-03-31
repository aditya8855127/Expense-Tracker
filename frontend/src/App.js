import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./App.css";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "General",
    date: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authMode, setAuthMode] = useState("login");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [user, setUser] = useState(null);
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const categories = [
    "General",
    "Food",
    "Transport",
    "Bills",
    "Shopping",
    "Health",
    "Education",
    "Other"
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      fetchMe();
    }
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/expenses");
      setExpenses(res.data);
    } catch (err) {
      setError("Unable to load expenses. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const fetchMe = async () => {
    try {
      const res = await axios.get("/api/auth/me");
      setUser(res.data);
      fetchExpenses();
    } catch (err) {
      logout();
    }
  };

  const submitAuth = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    try {
      const endpoint = authMode === "register" ? "/api/auth/register" : "/api/auth/login";
      const payload =
        authMode === "register"
          ? {
              name: authForm.name.trim(),
              email: authForm.email.trim(),
              password: authForm.password
            }
          : {
              email: authForm.email.trim(),
              password: authForm.password
            };
      const res = await axios.post(endpoint, payload);
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      setAuthForm({ name: "", email: "", password: "" });
      fetchExpenses();
    } catch (err) {
      setAuthError("Authentication failed. Check your details.");
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
    setUser(null);
    setExpenses([]);
  };

  const addExpense = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title.trim() || !form.amount) {
      setError("Title and amount are required.");
      return;
    }
    try {
      await axios.post("/api/expenses", {
        title: form.title.trim(),
        amount: Number(form.amount),
        category: form.category,
        date: form.date || undefined
      });
      setForm({ title: "", amount: "", category: "General", date: "" });
      fetchExpenses();
    } catch (err) {
      setError("Could not add expense. Please check the inputs.");
    }
  };

  const deleteExpense = async (id) => {
    setError("");
    try {
      await axios.delete(`/api/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      setError("Could not delete expense.");
    }
  };

  const total = useMemo(
    () => expenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0),
    [expenses]
  );

  const byCategory = useMemo(() => {
    const map = {};
    categories.forEach((c) => (map[c] = 0));
    expenses.forEach((exp) => {
      const key = categories.includes(exp.category) ? exp.category : "Other";
      map[key] = (map[key] || 0) + Number(exp.amount || 0);
    });
    return map;
  }, [expenses, categories]);

  const chartData = useMemo(() => {
    return {
      labels: categories,
      datasets: [
        {
          label: "Spent",
          data: categories.map((c) => byCategory[c] || 0),
          backgroundColor: "#2a6f97"
        }
      ]
    };
  }, [byCategory, categories]);

  const monthlyLabels = useMemo(() => {
    const labels = [];
    const now = new Date();
    for (let i = 5; i >= 0; i -= 1) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      labels.push(
        d.toLocaleDateString("en-IN", {
          month: "short",
          year: "2-digit"
        })
      );
    }
    return labels;
  }, []);

  const monthlyData = useMemo(() => {
    const map = {};
    monthlyLabels.forEach((label) => (map[label] = 0));
    expenses.forEach((exp) => {
      if (!exp.date) return;
      const d = new Date(exp.date);
      const label = d.toLocaleDateString("en-IN", {
        month: "short",
        year: "2-digit"
      });
      if (map[label] !== undefined) {
        map[label] += Number(exp.amount || 0);
      }
    });
    return {
      labels: monthlyLabels,
      datasets: [
        {
          label: "Monthly spend",
          data: monthlyLabels.map((label) => map[label]),
          borderColor: "#0f172a",
          backgroundColor: "rgba(15, 23, 42, 0.12)",
          tension: 0.35,
          fill: true
        }
      ]
    };
  }, [expenses, monthlyLabels]);

  const money = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(value || 0);

  const exportCsv = async () => {
    setError("");
    try {
      const res = await axios.get("/api/expenses/export", { responseType: "blob" });
      const blob = new Blob([res.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "expenses.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("CSV export failed.");
    }
  };

  if (!user) {
    return (
      <div className="page auth">
        <div className="panel auth-card">
          <p className="eyebrow">Consultant Access</p>
          <h1>{authMode === "register" ? "Create Account" : "Welcome Back"}</h1>
          <p className="sub">
            {authMode === "register"
              ? "Set up your account to track client spending."
              : "Login to continue managing expenses."}
          </p>

          <form onSubmit={submitAuth} className="form">
            {authMode === "register" && (
              <label>
                Name
                <input
                  value={authForm.name}
                  onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                  placeholder="Your name"
                />
              </label>
            )}
            <label>
              Email
              <input
                type="email"
                value={authForm.email}
                onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                placeholder="you@email.com"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={authForm.password}
                onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                placeholder="••••••••"
              />
            </label>
            {authError && <p className="error">{authError}</p>}
            <button className="primary" type="submit" disabled={authLoading}>
              {authLoading ? "Please wait..." : authMode === "register" ? "Create Account" : "Login"}
            </button>
          </form>
          <button
            className="ghost"
            onClick={() => setAuthMode(authMode === "register" ? "login" : "register")}
          >
            {authMode === "register" ? "Already have an account? Login" : "New here? Create an account"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Consultant-style dashboard</p>
          <h1>Expense Tracker</h1>
          <p className="sub">
            Track spending clearly, keep clients aligned, and make informed decisions.
          </p>
        </div>
        <div className="total-card">
          <span>Total Spend</span>
          <strong>{money(total)}</strong>
          <span className="muted" style={{ color: "rgba(255,255,255,0.8)" }}>
            {user?.name || "Account"}
          </span>
          <button className="ghost ghost-light" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <main className="grid">
        <section className="panel">
          <h2>Add Expense</h2>
          <form onSubmit={addExpense} className="form">
            <label>
              Title
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Client lunch, cab, hosting, ..."
              />
            </label>
            <label>
              Amount
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="500"
                min="0"
              />
            </label>
            <label>
              Category
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Date
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </label>

            {error && <p className="error">{error}</p>}

            <button type="submit" className="primary">
              Add Expense
            </button>
          </form>
        </section>

        <section className="panel">
          <h2>Category Summary</h2>
          <div className="chart-wrap">
            <Bar
              data={chartData}
              options={{ responsive: true, plugins: { legend: { display: false } } }}
            />
          </div>
        </section>

        <section className="panel">
          <h2>Monthly Trend</h2>
          <div className="chart-wrap">
            <Line
              data={monthlyData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
              }}
            />
          </div>
        </section>

        <section className="panel list">
          <div className="list-head">
            <h2>Recent Expenses</h2>
            {loading && <span className="muted">Loading...</span>}
          </div>
          <div className="list-actions">
            <button className="ghost" onClick={exportCsv}>
              Export CSV
            </button>
          </div>
          {!loading && expenses.length === 0 && (
            <p className="muted">No expenses yet. Add your first entry.</p>
          )}
          <ul>
            {expenses.map((exp) => (
              <li key={exp._id}>
                <div className="list-main">
                  <div>
                    <strong>{exp.title}</strong>
                    <span className="muted">
                      {exp.category || "General"} ·{" "}
                      {exp.date ? new Date(exp.date).toLocaleDateString("en-IN") : "—"}
                    </span>
                  </div>
                  <span className="amount">{money(exp.amount)}</span>
                </div>
                <button className="ghost" onClick={() => deleteExpense(exp._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
