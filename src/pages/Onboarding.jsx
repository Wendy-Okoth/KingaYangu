import { useState } from "react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    icon: "🛡️",
    title: "Welcome to Kinga Yangu",
    text: "Test, find care, and get support around HIV and STIs. Built for you, in a way that keeps your business your own.",
  },
  {
    icon: "🔒",
    title: "Afya yako, siri yako",
    text: "You never need to give your name, ID, or phone number to use this app.",
    bullets: [
      "No account tied to your identity",
      "Nothing shared without your say",
      "Delete everything, anytime, in settings",
    ],
  },
];

function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const isLast = step === steps.length - 1;
  const current = steps[step];

  function handleContinue() {
    if (isLast) {
      navigate("/pin-setup");
    } else {
      setStep(step + 1);
    }
  }

  return (
    <div style={{ maxWidth: "380px", margin: "0 auto", padding: "24px" }}>
      <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "24px" }}>
        {steps.map((_, i) => (
          <span
            key={i}
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: i === step ? "var(--color-primary)" : "var(--color-border)",
            }}
          />
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "32px", marginBottom: "12px" }}>{current.icon}</div>
        <p className="heading" style={{ fontSize: "18px", margin: "0 0 8px" }}>{current.title}</p>
        <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: "0 0 20px" }}>
          {current.text}
        </p>

        {current.bullets && (
          <div style={{ textAlign: "left", background: "#fff", border: "0.5px solid var(--color-border)", borderRadius: "12px", padding: "14px", marginBottom: "24px" }}>
            {current.bullets.map((b, i) => (
              <p key={i} style={{ fontSize: "12px", margin: "0 0 8px" }}>✓ {b}</p>
            ))}
          </div>
        )}

        <button className="btn-primary" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default Onboarding;