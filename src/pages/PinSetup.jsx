import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PinSetup() {
  const [pin, setPin] = useState("");
  const [confirmMode, setConfirmMode] = useState(false);
  const [firstPin, setFirstPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function press(digit) {
    if (pin.length >= 4) return;
    const newPin = pin + digit;
    setPin(newPin);
    setError("");

    if (newPin.length === 4) {
      if (!confirmMode) {
        // First entry done, ask them to confirm
        setFirstPin(newPin);
        setTimeout(() => {
          setPin("");
          setConfirmMode(true);
        }, 250);
      } else {
        // Confirming: check it matches
        if (newPin === firstPin) {
          localStorage.setItem("kingaYanguPin", newPin);
          navigate("/dashboard");
        } else {
          setError("PINs didn't match. Try again.");
          setTimeout(() => {
            setPin("");
            setConfirmMode(false);
            setFirstPin("");
          }, 700);
        }
      }
    }
  }

  function skip() {
    localStorage.removeItem("kingaYanguPin");
    navigate("/dashboard");
  }

  return (
    <div style={{ maxWidth: "380px", margin: "0 auto", padding: "24px", textAlign: "center" }}>
      <p className="heading" style={{ fontSize: "18px", margin: "0 0 8px" }}>
        {confirmMode ? "Confirm your PIN" : "Set an app PIN"}
      </p>
      <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: "0 0 20px" }}>
        {confirmMode
          ? "Enter the same 4 digits again"
          : "Optional. Keeps the app private if someone else picks up your phone."}
      </p>

      <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "8px" }}>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              border: "1.5px solid var(--color-border)",
              background: i < pin.length ? "var(--color-primary)" : "transparent",
              borderColor: i < pin.length ? "var(--color-primary)" : "var(--color-border)",
              display: "inline-block",
            }}
          />
        ))}
      </div>

      <p style={{ fontSize: "12px", color: "#8A3D22", height: "16px", margin: "0 0 12px" }}>{error}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          marginBottom: "18px",
          maxWidth: "220px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button
            key={n}
            onClick={() => press(String(n))}
            style={{
              background: "#fff",
              border: "0.5px solid var(--color-border)",
              borderRadius: "10px",
              padding: "12px 0",
              fontSize: "15px",
              color: "var(--color-text)",
              cursor: "pointer",
            }}
          >
            {n}
          </button>
        ))}
      </div>

      <button className="btn-ghost" onClick={skip}>Skip for now</button>
    </div>
  );
}

export default PinSetup;