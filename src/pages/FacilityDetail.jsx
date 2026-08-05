import { useParams, useNavigate } from "react-router-dom";
import facilities from "../data/facilities";

function FacilityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const facility = facilities.find((f) => f.id === id);

  if (!facility) {
    return (
      <div style={{ maxWidth: "380px", margin: "0 auto", padding: "20px" }}>
        <p style={{ fontSize: "13px" }}>Facility not found.</p>
        <button className="btn-ghost" onClick={() => navigate("/facilities")}>Back to list</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "380px", margin: "0 auto", padding: "18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
        <span onClick={() => navigate("/facilities")} style={{ cursor: "pointer", fontSize: "18px" }}>←</span>
        <p className="heading" style={{ fontSize: "15px", margin: 0 }}>{facility.name}</p>
      </div>

      <div style={{ background: "#fff", borderRadius: "14px", border: "0.5px solid var(--color-border)", padding: "14px", marginBottom: "10px" }}>
        <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: "0 0 4px" }}>
          📍 {facility.distance} · {facility.address}
        </p>
        <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: "0 0 4px" }}>
          🕐 {facility.hours}
        </p>
        <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: 0 }}>
          📞 {facility.phone}
        </p>
      </div>

      <p style={{ fontSize: "12px", fontWeight: 500, margin: "0 0 6px" }}>Services available</p>
      <div style={{ marginBottom: "16px" }}>
        {facility.services.map((s) => (
          <span
            key={s}
            style={{
              display: "inline-block",
              fontSize: "10px",
              background: "#FBEAE3",
              color: "#8A3D22",
              padding: "3px 8px",
              borderRadius: "20px",
              marginRight: "5px",
              marginBottom: "6px",
            }}
          >
            {s}
          </span>
        ))}
      </div>

      <button
        className="btn-primary"
        onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(facility.name + " " + facility.address)}`, "_blank")}
      >
        Get directions
      </button>
    </div>
  );
}

export default FacilityDetail;