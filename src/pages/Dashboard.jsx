import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const quickActions = [
  { icon: "🛡️", title: "Self-test guide", subtitle: "Step by step, private", path: "/self-test" },
  { icon: "📍", title: "Find a clinic", subtitle: "Youth-friendly, nearby", path: "/facilities" },
  { icon: "💬", title: "Ask, no judgment", subtitle: "Anonymous chat", path: "/chat" },
  { icon: "🔔", title: "Reminders", subtitle: "PrEP and refills", path: "/reminders" },
];

// Placeholder data — will be replaced with real Firestore queries next
const nearbyFacilities = [
  { id: "1", name: "LVCT Youth Center", distance: "1.2 km", tag: "Free self-test kits", status: "Open" },
  { id: "2", name: "Thika Level 5 Hospital", distance: "2.8 km", tag: "PrEP and syphilis testing", status: "Open" },
];

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: "420px", margin: "0 auto", paddingBottom: "70px" }}>
      <div style={{ background: "var(--color-primary)", padding: "20px 20px 24px" }}>
        <p className="heading" style={{ fontSize: "13px", color: "var(--color-bg)", opacity: 0.85, margin: "0 0 2px" }}>
          Kinga Yangu
        </p>
        <p className="heading" style={{ fontSize: "19px", color: "var(--color-bg)", margin: 0 }}>
          Habari
        </p>
        <p style={{ fontSize: "13px", color: "#FCE3DB", margin: "4px 0 0" }}>
          Afya yako, siri yako
        </p>
      </div>

      <div style={{ padding: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {quickActions.map((action) => (
          <div
            key={action.title}
            onClick={() => navigate(action.path)}
            style={{ background: "#fff", borderRadius: "14px", padding: "14px", border: "0.5px solid var(--color-border)", cursor: "pointer" }}
          >
            <div style={{ fontSize: "20px" }}>{action.icon}</div>
            <p className="heading" style={{ fontSize: "13px", margin: "8px 0 2px" }}>{action.title}</p>
            <p style={{ fontSize: "11px", color: "var(--color-text-muted)", margin: 0 }}>{action.subtitle}</p>
          </div>
        ))}
      </div>

      <div style={{ padding: "14px 16px 0" }}>
        <p className="heading" style={{ fontSize: "13px", margin: "0 0 8px" }}>Nearby, welcoming to you</p>
        {nearbyFacilities.map((f) => (
          <div
            key={f.id}
            onClick={() => navigate(`/facilities/${f.id}`)}
            style={{ background: "#fff", borderRadius: "14px", border: "0.5px solid var(--color-border)", padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", cursor: "pointer" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "13px", fontWeight: 500, margin: 0 }}>{f.name}</p>
              <p style={{ fontSize: "11px", color: "var(--color-text-muted)", margin: "2px 0 0" }}>{f.distance} · {f.tag}</p>
            </div>
            <span style={{ fontSize: "10px", background: "#E9F4EF", color: "#2E5943", padding: "3px 8px", borderRadius: "20px", flexShrink: 0 }}>
              {f.status}
            </span>
          </div>
        ))}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "space-around", padding: "10px 0", borderTop: "0.5px solid var(--color-border)", background: "#fff" }}>
        <span onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>🏠</span>
        <span onClick={() => navigate("/facilities")} style={{ cursor: "pointer" }}>📍</span>
        <span onClick={() => navigate("/chat")} style={{ cursor: "pointer" }}>💬</span>
      </div>
    </div>
  );
}

export default Dashboard;