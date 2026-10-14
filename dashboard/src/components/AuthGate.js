import React, { useEffect, useState } from "react";
import api from "../api";

const AuthGate = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("tradesmart_token"));
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("tradesmart_user") || "null"); } catch (_) { return null; }
  });
  const [checking, setChecking] = useState(Boolean(token));
  const [isRegistering, setIsRegistering] = useState(() => new URLSearchParams(window.location.search).get("register") === "1");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) { setChecking(false); return; }
    api.get("/auth/me")
      .then(({ data }) => { setUser(data); localStorage.setItem("tradesmart_user", JSON.stringify(data)); })
      .catch(() => { localStorage.removeItem("tradesmart_token"); localStorage.removeItem("tradesmart_user"); setToken(null); setUser(null); })
      .finally(() => setChecking(false));
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const endpoint = isRegistering ? "/auth/register" : "/auth/login";
      const { data } = await api.post(endpoint, form);
      localStorage.setItem("tradesmart_token", data.token);
      localStorage.setItem("tradesmart_user", JSON.stringify(data.user));
      setUser(data.user);
      setToken(data.token);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to connect to the authentication service.");
    } finally {
      setSubmitting(false);
    }
  };

  if (checking) return <div className="auth-screen">Checking your session…</div>;
  if (token && user) return children;

  return (
    <main className="auth-screen">
      <form className="auth-card" onSubmit={handleSubmit}>
        <img src="/logo.png" alt="TradeSmart" />
        <h1>{isRegistering ? "Create your account" : "Sign in to TradeSmart"}</h1>
        <label>Username<input autoComplete="username" required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /></label>
        {isRegistering && <label>Email<input type="email" autoComplete="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>}
        <label>Password<input type="password" autoComplete={isRegistering ? "new-password" : "current-password"} minLength={isRegistering ? 8 : undefined} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        {error && <p className="auth-error" role="alert">{error}</p>}
        <button type="submit" disabled={submitting}>{submitting ? "Please wait…" : isRegistering ? "Create account" : "Sign in"}</button>
        <p>{isRegistering ? "Already have an account?" : "New to TradeSmart?"} <button type="button" className="auth-switch" onClick={() => { setError(""); setIsRegistering(!isRegistering); }}> {isRegistering ? "Sign in" : "Create an account"}</button></p>
      </form>
    </main>
  );
};

export default AuthGate;
