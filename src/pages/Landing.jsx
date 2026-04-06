import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>🛡️</div>
          <div>
            <h2 style={styles.logoTitle}>GenVeda</h2>
            <p style={styles.logoSubtitle}>CLINICAL SANCTUARY</p>
          </div>
        </div>
        <div style={styles.navActions}>
          <button style={styles.loginBtn} onClick={() => navigate("/login")}>Sign In</button>
          <button style={styles.registerBtn} onClick={() => navigate("/register")}>Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroPill}>✨ Next-Generation AI Dermatology</div>
          <h1 style={styles.heroTitle}>Precision Diagnostics at the Speed of Thought.</h1>
          <p style={styles.heroSubtitle}>
            GenVeda empowers clinical radiologists and dermatologists with advanced neural networks, offering instant, high-confidence insights into complex skin conditions.
          </p>
          <div style={styles.heroButtons}>
            <button style={styles.primaryBtn} onClick={() => navigate("/register")}>
               Start Analyzing Now
            </button>
            <button style={styles.secondaryBtn} onClick={() => navigate("/login")}>
               Access Dashboard &rarr;
            </button>
          </div>
        </div>

        {/* Hero Graphic / Abstract UI element */}
        <div style={styles.heroVisual}>
          <div style={styles.abstractCard}>
             <div style={styles.scanLine}></div>
             <div style={styles.abstractHeader}>
                 <span style={styles.dot}></span>
                 LIVE AI SCAN
             </div>
             <div style={styles.mockStats}>
                 <div style={styles.mockStatItem}>
                    <div>Accuracy</div>
                    <div style={{color: 'var(--primary)', fontWeight: '700'}}>98.4%</div>
                 </div>
                 <div style={styles.mockStatItem}>
                    <div>Processing</div>
                    <div style={{color: 'var(--success)', fontWeight: '700'}}>0.4s</div>
                 </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
         <h2 style={styles.sectionTitle}>Why Choose GenVeda?</h2>
         <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
               <div style={styles.featureIcon}>⚡</div>
               <h3 style={styles.featureTitle}>Real-Time Insights</h3>
               <p style={styles.featureDesc}>Get diagnostic probabilities mapping in under a second using our advanced model.</p>
            </div>
            <div style={styles.featureCard}>
               <div style={styles.featureIcon}>🔒</div>
               <h3 style={styles.featureTitle}>Enterprise Security</h3>
               <p style={styles.featureDesc}>End-to-end encrypted patient records and role-based access for your entire clinic.</p>
            </div>
            <div style={styles.featureCard}>
               <div style={styles.featureIcon}>📊</div>
               <h3 style={styles.featureTitle}>Deep Analytics</h3>
               <p style={styles.featureDesc}>Track scanning history and watch patient disease progression over time.</p>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
         <p>© 2026 GenVeda AI Clinic. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "var(--bg-color)",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Inter', sans-serif",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 60px",
    backgroundColor: "var(--card-bg)",
    backdropFilter: "blur(12px)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    borderBottom: "1px solid var(--card-bg)",
  },
  logoContainer: { display: "flex", alignItems: "center", gap: "10px" },
  logoIcon: { fontSize: "20px", color: "var(--primary)", background: "var(--primary-light)", padding: "6px", borderRadius: "10px" },
  logoTitle: { color: "var(--primary)", fontSize: "16px", fontWeight: "700", margin: 0, letterSpacing: "-0.5px" },
  logoSubtitle: { color: "var(--text-muted)", fontSize: "9px", fontWeight: "600", letterSpacing: "0.5px", margin: "2px 0 0 0" },
  navActions: { display: "flex", gap: "12px", alignItems: "center" },
  loginBtn: { background: "transparent", color: "var(--text-main)", border: "none", fontSize: "14px", fontWeight: "600", cursor: "pointer", padding: "8px 16px" },
  registerBtn: { background: "var(--primary)", color: "#fff", border: "none", borderRadius: "20px", padding: "8px 24px", fontSize: "14px", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 12px rgba(27, 107, 108, 0.2)" },
  
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "80px 60px",
    flex: 1,
    gap: "60px",
    background: "radial-gradient(circle at 100% 0%, var(--primary-light) 0%, var(--bg-color) 40%)",
  },
  heroContent: { flex: 1, maxWidth: "600px" },
  heroPill: { display: "inline-block", background: "var(--card-bg)", color: "var(--primary)", padding: "6px 16px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.5px", border: "1px solid var(--primary-light)", marginBottom: "24px" },
  heroTitle: { fontSize: "56px", fontWeight: "800", color: "var(--text-main)", lineHeight: "1.1", letterSpacing: "-1.5px", margin: "0 0 24px 0" },
  heroSubtitle: { fontSize: "18px", color: "var(--text-muted)", lineHeight: "1.6", margin: "0 0 40px 0" },
  heroButtons: { display: "flex", gap: "16px" },
  primaryBtn: { background: "var(--primary)", color: "#fff", border: "none", padding: "16px 32px", borderRadius: "12px", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "transform 0.2s", boxShadow: "0 8px 24px rgba(45, 212, 191, 0.25)" },
  secondaryBtn: { background: "var(--card-bg)", color: "var(--text-main)", border: "1px solid var(--primary-light)", padding: "16px 32px", borderRadius: "12px", fontSize: "16px", fontWeight: "600", cursor: "pointer" },

  heroVisual: { flex: 1, display: "flex", justifyContent: "center", position: "relative" },
  abstractCard: {
     width: "100%", maxWidth: "400px", aspectRatio: "4/5", background: "linear-gradient(145deg, #1e293b, #0f172a)",
     borderRadius: "24px", position: "relative", overflow: "hidden", padding: "24px",
     boxShadow: "0 24px 48px rgba(0,0,0,0.15)", border: "1px solid #334155",
     display: "flex", flexDirection: "column", justifyContent: "space-between"
  },
  scanLine: {
     position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "var(--primary)",
     boxShadow: "0 0 20px 4px var(--primary)", animation: "scan 3s ease-in-out infinite", opacity: 0.8
  },
  abstractHeader: { display: "flex", alignItems: "center", gap: "8px", color: "#fff", fontSize: "12px", fontWeight: "600", letterSpacing: "1px" },
  dot: { width: "8px", height: "8px", backgroundColor: "var(--danger)", borderRadius: "50%", boxShadow: "0 0 8px var(--danger)" },
  mockStats: { display: "flex", gap: "16px", background: "rgba(255,255,255,0.05)", padding: "16px", borderRadius: "16px", backdropFilter: "blur(10px)" },
  mockStatItem: { flex: 1, color: "rgba(255,255,255,0.7)", fontSize: "12px", display: "flex", flexDirection: "column", gap: "4px" },

  features: { padding: "80px 60px", background: "var(--card-bg)" },
  sectionTitle: { textAlign: "center", fontSize: "32px", fontWeight: "700", color: "var(--text-main)", marginBottom: "48px" },
  featuresGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px", maxWidth: "1200px", margin: "0 auto" },
  featureCard: { background: "var(--bg-color)", padding: "32px", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "flex-start" },
  featureIcon: { width: "48px", height: "48px", background: "var(--card-bg)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", marginBottom: "20px", boxShadow: "var(--shadow-sm)" },
  featureTitle: { fontSize: "18px", fontWeight: "700", color: "var(--text-main)", marginBottom: "12px" },
  featureDesc: { fontSize: "14px", color: "var(--text-muted)", lineHeight: "1.5" },

  footer: { padding: "32px", textAlign: "center", borderTop: "1px solid var(--primary-light)", backgroundColor: "var(--card-bg)", color: "var(--text-muted)", fontSize: "13px" }
};
