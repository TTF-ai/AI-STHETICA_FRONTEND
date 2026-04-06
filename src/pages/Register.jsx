import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, verifyUser } from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState("register"); // "register" or "verify"
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "doctor" });
  const [verifyForm, setVerifyForm] = useState({ username: "", verification_code: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await registerUser(form);

      if (res.data.error) {
        setError(typeof res.data.error === "string" ? res.data.error : JSON.stringify(res.data.error));
        return;
      }

      setSuccess(res.data.message || "Registration successful! Check your email for the verification code.");
      setVerifyForm({ ...verifyForm, username: form.username });
      setStep("verify");
    } catch (err) {
      const errData = err.response?.data?.error;
      if (typeof errData === "object") {
        const messages = Object.entries(errData)
          .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(", ") : msgs}`)
          .join(" | ");
        setError(messages);
      } else {
        setError(errData || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await verifyUser(verifyForm);

      if (res.data.error) {
        setError(res.data.error);
        return;
      }

      setSuccess("Account verified! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {step === "register" ? (
        <form onSubmit={handleRegister} style={styles.card}>
          <div style={styles.logoContainer}>
              <div style={styles.logoIcon}>🛡️</div>
              <div>
                <h2 style={styles.logoTitle}>GenVeda</h2>
                <p style={styles.logoSubtitle}>CLINICAL SANCTUARY</p>
              </div>
          </div>
          
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join GenVeda today</p>

          {error && <div style={styles.error}>{error}</div>}
          {success && <div style={styles.success}>{success}</div>}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              id="register-username"
              style={styles.input}
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              id="register-email"
              style={styles.input}
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              id="register-password"
              style={styles.input}
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Role</label>
            <select
              id="register-role"
              style={styles.input}
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              required
            >
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
              <option value="patient">Patient</option>
            </select>
          </div>

          <button id="register-submit" type="submit" style={styles.button} disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>

          <p style={styles.link}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--primary)", fontWeight: "600" }}>
              Sign In
            </Link>
          </p>
        </form>
      ) : (
        <form onSubmit={handleVerify} style={styles.card}>
          <div style={styles.logoContainer}>
              <div style={styles.logoIcon}>🛡️</div>
              <div>
                <h2 style={styles.logoTitle}>GenVeda</h2>
                <p style={styles.logoSubtitle}>CLINICAL SANCTUARY</p>
              </div>
          </div>
          
          <h2 style={styles.title}>Verify Account</h2>
          <p style={styles.subtitle}>Enter the code sent to your email</p>

          {error && <div style={styles.error}>{error}</div>}
          {success && <div style={styles.success}>{success}</div>}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Verification Code</label>
            <input
              id="verify-code"
              style={styles.input}
              placeholder="6-digit code"
              value={verifyForm.verification_code}
              onChange={(e) =>
                setVerifyForm({ ...verifyForm, verification_code: e.target.value })
              }
              maxLength={6}
              required
            />
          </div>

          <button id="verify-submit" type="submit" style={styles.button} disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </button>

          <p
            style={{ ...styles.link, cursor: "pointer", color: "var(--primary)", fontWeight: "600" }}
            onClick={() => setStep("register")}
          >
            ← Back to Register
          </p>
        </form>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--bg-color)",
  },
  card: {
    background: "var(--card-bg)",
    borderRadius: "20px",
    padding: "40px",
    width: "400px",
    boxShadow: "var(--shadow)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "8px",
    justifyContent: "center",
  },
  logoIcon: {
    fontSize: "24px",
    color: "var(--primary)",
    background: "var(--primary-light)",
    padding: "8px",
    borderRadius: "12px",
  },
  logoTitle: {
    color: "var(--primary)",
    fontSize: "20px",
    fontWeight: "700",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  logoSubtitle: {
    color: "var(--text-muted)",
    fontSize: "10px",
    fontWeight: "600",
    letterSpacing: "0.5px",
    margin: "2px 0 0 0",
  },
  title: {
    color: "var(--text-main)",
    fontSize: "24px",
    fontWeight: "700",
    textAlign: "center",
    margin: 0,
  },
  subtitle: {
    color: "var(--text-muted)",
    textAlign: "center",
    margin: 0,
    fontSize: "14px",
  },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "13px", fontWeight: "600", color: "var(--text-main)" },
  input: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid var(--border-color)",
    backgroundColor: "var(--bg-secondary)",
    color: "var(--text-main)",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    padding: "14px 0",
    borderRadius: "10px",
    border: "none",
    background: "var(--primary)",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "8px",
  },
  error: {
    background: "var(--danger-light)",
    color: "var(--danger)",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "13px",
  },
  success: {
    background: "var(--success-light)",
    color: "var(--success)",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "13px",
  },
  link: {
    color: "var(--text-muted)",
    textAlign: "center",
    fontSize: "14px",
    marginTop: "8px",
  },
};
