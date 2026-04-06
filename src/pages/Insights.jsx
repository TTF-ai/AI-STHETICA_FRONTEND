import { useEffect, useState } from "react";
import { getScans } from "../services/api";

export default function Insights() {
  const [scans, setScans] = useState([]);
  const lastResult = JSON.parse(localStorage.getItem("lastResult") || "null");

  useEffect(() => {
    getScans()
      .then((res) => setScans(res.data))
      .catch(() => {});
  }, []);

  const totalScans = scans.length;
  const avgConfidence =
    totalScans > 0
      ? scans.reduce((sum, s) => sum + s.confidence, 0) / totalScans
      : 0;
  const diseaseDistribution = scans.reduce((acc, s) => {
    acc[s.predicted_disease] = (acc[s.predicted_disease] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <p style={styles.breadcrumb}>ANALYSIS / LATEST SCAN</p>
          <h1 style={styles.title}>Diagnostic Insights</h1>
        </div>
        <div style={styles.actions}>
           <button style={styles.btnOutline}>Refer Patient</button>
           <button style={styles.btnPrimary}>Save Results</button>
        </div>
      </header>

      <div style={styles.grid}>
        {/* Left Column: Heatmap / Latest Scan Details */}
        <div style={styles.leftColumn}>
          {lastResult ? (
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                 <h3 style={styles.cardTitle}>AI Visualization: Scan Result</h3>
                 <div style={styles.pills}>
                    <span style={styles.pillActive}>PROBABILITY MAPPING</span>
                 </div>
              </div>
              <div style={styles.visualizationArea}>
                 {/* Placeholder for the scanned image */}
                 <div style={styles.heatmapPlaceholder}>
                    {lastResult.image ? (
                       <img src={lastResult.image} alt="Scan Heatmap" style={styles.scanImg} />
                    ) : ( 
                       <div style={{color: 'rgba(255,255,255,0.7)'}}>Scan Image</div>
                    )}
                 </div>
                 
                 <div style={styles.resultBanner}>
                   <span style={styles.bannerText}>
                      Anomaly detected: {lastResult.predicted_disease || "Unknown"}
                   </span>
                   <span style={styles.bannerNotes}>
                      {lastResult.notes || "No notes provided."}
                   </span>
                 </div>
              </div>
            </div>
          ) : (
            <div style={styles.card}>
               <p style={styles.empty}>No recent scan results found locally.</p>
            </div>
          )}
          
          {/* All Scans Table */}
          {scans.length > 0 && (
             <div style={styles.card}>
                <h3 style={styles.cardTitle}>Global Scans Record</h3>
                <div style={styles.table}>
                  <div style={styles.tableHeader}>
                    <span style={styles.cell}>DISEASE</span>
                    <span style={styles.cellSmall}>CONFIDENCE</span>
                    <span style={styles.cell}>DATE</span>
                  </div>
                  {scans.slice(0,5).map((s) => (
                    <div key={s.id} style={styles.tableRow}>
                      <span style={styles.cell}>{s.predicted_disease}</span>
                       <span style={styles.cellSmall}>
                         {s.confidence.toFixed(1)}%
                       </span>
                      <span style={styles.cell}>
                        {new Date(s.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
             </div>
          )}
        </div>

        {/* Right Column: Risk Scores and Stats */}
        <div style={styles.rightColumn}>
           <div style={styles.card}>
               <h3 style={styles.cardTitleCenter}>AGGREGATE RISK SCORE</h3>
               <div style={styles.scoreContainer}>
                   {/* Fallback using avg confidence as risk proxy */}
                   <div style={styles.circle}>
                      <h2 style={styles.scoreNumber}>{avgConfidence.toFixed(0)}</h2>
                      <p style={styles.scoreText}>AVG CONFIDENCE</p>
                   </div>
               </div>
               <p style={styles.scoreDesc}>
                 Overall average AI confidence level across all processed patient scans.
               </p>
           </div>
           
           {Object.keys(diseaseDistribution).length > 0 && (
             <div style={styles.card}>
                <h3 style={styles.cardTitleCenter}>DISEASE DISTRIBUTION</h3>
                <div style={styles.distList}>
                  {Object.entries(diseaseDistribution)
                    .sort(([, a], [, b]) => b - a)
                    .map(([disease, count]) => (
                      <div key={disease} style={styles.distItem}>
                         <div style={styles.distHeader}>
                           <span style={styles.distName}>{disease}</span>
                           <span style={styles.distCount}>{count} cases</span>
                         </div>
                         <div style={styles.barBg}>
                             <div style={{...styles.barFill, width: `${(count / totalScans) * 100}%`}} />
                         </div>
                      </div>
                  ))}
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { paddingTop: "20px" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "32px",
  },
  breadcrumb: {
    fontSize: "12px",
    fontWeight: "600",
    color: "var(--text-muted)",
    letterSpacing: "1px",
    marginBottom: "8px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "var(--text-main)",
    letterSpacing: "-0.5px",
  },
  actions: { display: "flex", gap: "12px" },
  btnOutline: {
    color: "var(--primary)",
    border: "1px solid var(--primary-light)",
    borderRadius: "20px",
    padding: "8px 20px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    backgroundColor: "var(--bg-secondary)",
  },
  btnPrimary: {
    backgroundColor: "var(--primary)",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "8px 20px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
    gap: "24px",
    alignItems: "start",
  },
  leftColumn: { display: "flex", flexDirection: "column", gap: "24px" },
  rightColumn: { display: "flex", flexDirection: "column", gap: "24px" },
  card: {
    background: "var(--card-bg)",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "var(--shadow-sm)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "var(--text-main)",
  },
  cardTitleCenter: {
    fontSize: "12px",
    fontWeight: "700",
    color: "var(--text-muted)",
    letterSpacing: "1px",
    textAlign: "center",
    marginBottom: "24px",
  },
  pills: { display: "flex", gap: "8px" },
  pillActive: {
    backgroundColor: "var(--primary)",
    color: "#fff",
    fontSize: "10px",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "12px",
    letterSpacing: "0.5px",
  },
  visualizationArea: {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "var(--shadow-sm)",
  },
  heatmapPlaceholder: {
    width: "100%",
    aspectRatio: "16/10",
    backgroundColor: "#cbd5e1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  scanImg: { width: "100%", height: "100%", objectFit: "cover" },
  resultBanner: {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    right: "20px",
    backgroundColor: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(4px)",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bannerText: { color: "#fff", fontSize: "14px", fontWeight: "600" },
  bannerNotes: { color: "rgba(255,255,255,0.7)", fontSize: "12px" },
  scoreContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "24px",
  },
  circle: {
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    border: "12px solid var(--primary)",
    borderRightColor: "var(--primary-light)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreNumber: {
    fontSize: "48px",
    fontWeight: "700",
    color: "var(--text-main)",
    lineHeight: "1",
  },
  scoreText: {
    fontSize: "12px",
    fontWeight: "600",
    color: "var(--text-muted)",
    marginTop: "4px",
  },
  scoreDesc: {
    textAlign: "center",
    fontSize: "13px",
    color: "var(--text-muted)",
    lineHeight: "1.5",
    padding: "0 20px",
  },
  distList: { display: "flex", flexDirection: "column", gap: "16px" },
  distItem: { display: "flex", flexDirection: "column", gap: "8px" },
  distHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  distName: { fontSize: "14px", fontWeight: "600", color: "var(--text-main)" },
  distCount: { fontSize: "12px", fontWeight: "600", color: "var(--danger)" },
  barBg: { width: "100%", height: "6px", backgroundColor: "var(--border-color)", borderRadius: "3px" },
  barFill: { height: "100%", backgroundColor: "var(--danger)", borderRadius: "3px" },
  empty: { color: "var(--text-muted)", fontSize: "14px" },
  table: { display: "flex", flexDirection: "column" },
  tableHeader: {
    display: "flex", paddingBottom: "12px", borderBottom: "1px solid var(--border-color)",
    fontSize: "12px", fontWeight: "600", color: "var(--text-muted)",
  },
  tableRow: {
    display: "flex", padding: "12px 0", borderBottom: "1px solid var(--border-color)",
    fontSize: "14px", color: "var(--text-main)", fontWeight: "500",
  },
  cell: { flex: 1 },
  cellSmall: { flex: 0.5 },
};