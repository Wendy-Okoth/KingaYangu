import { useState } from "react";
import { useNavigate } from "react-router-dom";
import facilities from "../data/facilities";

const filters = [
  { key: "all", label: "All" },
  { key: "kits", label: "Free HIV kits" },
  { key: "prep", label: "PrEP" },
  { key: "syphilis", label: "Syphilis testing" },
];

function FacilityFinder() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();

  const filtered = facilities.filter((f) => {
    const matchesFilter = activeFilter === "all" || f.tags.includes(activeFilter);
    const matchesSearch =
      search.trim() === "" ||
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.address.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ maxWidth: "420px", margin: "0 auto", padding: "16px" }}>
      <p className="heading" style={{ fontSize: "15px", margin: "0 0 10px" }}>Find a clinic</p>

      <input
        type="text"
        placeholder="Search area or facility"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          boxSizing: "border-box",
          border: "0.5px solid var(--color-border)",
          borderRadius: "10px",
          padding: "9px 12px",
          fontSize: "13px",
          marginBottom: "10px",
          background: "#fff",
          color: "var(--color-text)",
        }}
      />

      <div style={{ marginBottom: "14px" }}>
        {filters.map((f) => (
          <span
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            style={{
              display: "inline-block",
              padding: "6px 12px",
              borderRadius: "20px",
              border: "0.5px solid var(--color-border)",
              background: activeFilter === f.key ? "var(--color-primary)" : "#fff",
              color: activeFilter === f.key ? "var(--color-bg)" : "var(--color-text)",
              fontSize: "12px",
              cursor: "pointer",
              marginRight: "6px",
              marginBottom: "8px",
            }}
          >
            {f.label}
          </span>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ fontSize: "13px", color: "var(--color-text-muted)", textAlign: "center", marginTop: "24px" }}>
          No facilities match that search or filter.
        </p>
      )}

      {filtered.map((f) => (
        <div
          key={f.id}
          onClick={() => navigate(`/facilities/${f.id}`)}
          style={{
            background: "#fff",
            borderRadius: "14px",
            border: "0.5px solid var(--color-border)",
            padding: "12px 14px",
            marginBottom: "8px",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 500, margin: 0 }}>{f.name}</p>
              <p style={{ fontSize: "11px", color: "var(--color-text-muted)", margin: "4px 0 0" }}>
                {f.distance} · {f.address}
              </p>
            </div>
            <span
              style={{
                fontSize: "10px",
                background: f.status === "Open" ? "#E9F4EF" : "#F1EFE8",
                color: f.status === "Open" ? "#2E5943" : "#5F5E5A",
                padding: "3px 8px",
                borderRadius: "20px",
                flexShrink: 0,
              }}
            >
              {f.status}
            </span>
          </div>
          <div style={{ marginTop: "8px" }}>
            {f.services.slice(0, 2).map((s) => (
              <span
                key={s}
                style={{
                  fontSize: "10px",
                  background: "#FBEAE3",
                  color: "#8A3D22",
                  padding: "3px 8px",
                  borderRadius: "20px",
                  marginRight: "5px",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FacilityFinder;