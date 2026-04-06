import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createScan, getPatients } from "../../services/api";

export default function NurseScan() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [patientId, setPatientId] = useState("");
  const [patients, setPatients] = useState([]);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    getPatients()
      .then((res) => setPatients(res.data))
      .catch(() => {});
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError("");
    if (!image || !patientId) {
      setError("Please select a patient and upload an image.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("patient", patientId);
      formData.append("predicted_disease", "Pending Analysis");
      formData.append("confidence", "0.0");
      if (notes) formData.append("notes", notes);

      await createScan(formData);
      navigate("/nurse/triage");
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.container}>
      <header style={s.header}>
        <h1 style={s.title}>Dermascope Scan</h1>
        <p style={s.subtitle}>Capture a high-resolution dermascope image and initialize AI analysis.</p>
      </header>

      {error && <div style={s.error}>{error}</div>}

      <div style={s.grid}>
        <div style={s.leftColumn}>
          <div style={s.previewContainer}>
            {preview ? (
              <img src={preview} alt="Preview" style={s.previewImage} />
            ) : (
              <div style={s.placeholderBox}>
                <p style={{ color: "rgba(255,255,255,0.7)" }}>Position Dermascope Area</p>
              </div>
            )}
            <div style={s.liveIndicator}>
              <span style={s.dot}></span> DERMASCOPE LIVE
            </div>
          </div>

          <div style={s.uploadActions}>
            <label style={s.uploadBtn}>
              📷 Capture Scan
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
            </label>
            <label style={s.uploadBtnOutline}>
              ↑ Upload File
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
            </label>
          </div>
        </div>

        <div style={s.rightColumn}>
          <div style={s.card}>
            <h3 style={s.cardTitle}>Patient Details</h3>
            <div style={s.inputGroup}>
              <label style={s.label}>Select Patient</label>
              <select style={s.input} value={patientId} onChange={(e) => setPatientId(e.target.value)}>
                <option value="">-- Choose a patient --</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} (Age: {p.age})</option>
                ))}
              </select>
            </div>
          </div>

          <div style={s.card}>
            <h3 style={s.cardTitle}>Clinical Observations</h3>
            <textarea
              style={s.textarea}
              placeholder="Patient symptoms, dermascope settings, observations..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <button onClick={handleUpload} style={s.submitBtn} disabled={loading || !image || !patientId}>
              {loading ? "Analyzing..." : "Initialize AI Analysis"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  container: { paddingTop: "20px" },
  header: { marginBottom: "32px" },
  title: { fontSize: "28px", fontWeight: "700", color: "var(--text-main)", marginBottom: "8px", letterSpacing: "-0.5px" },
  subtitle: { fontSize: "15px", color: "var(--text-muted)", maxWidth: "600px", lineHeight: "1.5" },
  error: { background: "var(--danger-light)", color: "var(--danger)", padding: "12px", borderRadius: "8px", fontSize: "14px", marginBottom: "24px" },
  grid: { display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "32px", alignItems: "start" },
  leftColumn: { display: "flex", flexDirection: "column", gap: "24px" },
  previewContainer: { width: "100%", aspectRatio: "16/10", backgroundColor: "#1e293b", borderRadius: "16px", position: "relative", overflow: "hidden", boxShadow: "var(--shadow)" },
  previewImage: { width: "100%", height: "100%", objectFit: "cover" },
  placeholderBox: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" },
  liveIndicator: { position: "absolute", top: "16px", left: "16px", backgroundColor: "rgba(255,255,255,0.8)", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", color: "#334155", display: "flex", alignItems: "center", gap: "6px" },
  dot: { width: "8px", height: "8px", backgroundColor: "var(--danger)", borderRadius: "50%" },
  uploadActions: { display: "flex", gap: "16px" },
  uploadBtn: { flex: 1, backgroundColor: "var(--primary)", color: "#fff", textAlign: "center", padding: "14px", borderRadius: "12px", fontSize: "15px", fontWeight: "600", cursor: "pointer", boxShadow: "var(--shadow-sm)" },
  uploadBtnOutline: { flex: 1, backgroundColor: "var(--card-bg)", color: "var(--text-main)", textAlign: "center", padding: "14px", borderRadius: "12px", fontSize: "15px", fontWeight: "600", cursor: "pointer", border: "1px solid var(--border-color)" },
  rightColumn: { display: "flex", flexDirection: "column", gap: "24px" },
  card: { background: "var(--card-bg)", borderRadius: "16px", padding: "24px", boxShadow: "var(--shadow-sm)" },
  cardTitle: { fontSize: "16px", fontWeight: "600", color: "var(--text-main)", marginBottom: "16px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "13px", fontWeight: "500", color: "var(--text-muted)" },
  input: { padding: "12px 16px", borderRadius: "10px", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-secondary)", color: "var(--text-main)", fontSize: "14px", outline: "none" },
  textarea: { width: "100%", minHeight: "120px", padding: "16px", borderRadius: "10px", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-secondary)", color: "var(--text-main)", fontSize: "14px", outline: "none", resize: "vertical", marginBottom: "16px" },
  submitBtn: { width: "100%", padding: "14px 0", borderRadius: "12px", border: "none", background: "var(--primary)", color: "#fff", fontSize: "15px", fontWeight: "600", cursor: "pointer" },
};
