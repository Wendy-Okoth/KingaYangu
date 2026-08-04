import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SelfTest() {
  const [step, setStep] = useState(0); // 0: choose test, 1: instructions, 2: result select
  const [timerStarted, setTimerStarted] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const resultContent = {
    negative: {
      color: "#2E5943",
      title: "One line: negative",
      text: "This is a good result. If your last possible exposure was within the last 3 months, consider testing again after the window period for full accuracy.",
      primaryLabel: "Learn about retesting",
    },
    positive: {
      color: "#8A3D22",
      title: "Two lines: reactive",
      text: "A self-test result is preliminary. It needs to be confirmed at a clinic, and treatment is very effective when started early. You are not alone in this.",
      primaryLabel: "Find a clinic nearby",
      secondaryLabel: "Talk to someone now",
    },
    unclear: {
      color: "#8A5A12",
      title: "Unclear result",
      text: "This sometimes happens. The most reliable next step is to retest with a new kit, or visit a clinic for a supported test.",
      primaryLabel: "Find a clinic nearby",
    },
  };

  return (
    <div style={{ maxWidth: "380px", margin: "0 auto", padding: "20px" }}>
      {step === 0 && (
        <>
          <p className="heading" style={{ fontSize: "15px", margin: "0 0 12px" }}>Choose your test</p>
          <div className="rbtn" onClick={() => setStep(1)} style={cardStyle}>🩸 HIV self-test kit</div>
          <div className="rbtn" onClick={() => setStep(1)} style={cardStyle}>🧪 Syphilis test guidance</div>
        </>
      )}

      {step === 1 && (
        <>
          <p className="heading" style={{ fontSize: "15px", margin: "0 0 12px" }}>Follow the steps</p>
          <div style={{ background: "#fff", border: "0.5px solid var(--color-border)", borderRadius: "12px", padding: "14px", marginBottom: "12px" }}>
            <p style={{ fontSize: "13px", margin: "0 0 8px" }}>1. Wash and dry your hands</p>
            <p style={{ fontSize: "13px", margin: "0 0 8px" }}>2. Collect the fluid sample as shown in the kit</p>
            <p style={{ fontSize: "13px", margin: "0 0 8px" }}>3. Place the sample in the test device</p>
            <p style={{ fontSize: "13px", margin: 0 }}>4. Wait 15 minutes before reading</p>
          </div>
          <div style={{ textAlign: "center", marginBottom: "14px" }}>
            <button className="btn-primary" onClick={() => setTimerStarted(true)}>
              {timerStarted ? "Timer running" : "Start 15 minute timer"}
            </button>
            {timerStarted && (
              <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: "8px 0 0" }}>
                We will let you know when 15 minutes are up.
              </p>
            )}
          </div>
          <button className="btn-primary" onClick={() => setStep(2)}>Continue</button>
        </>
      )}

      {step === 2 && !result && (
        <>
          <p className="heading" style={{ fontSize: "15px", margin: "0 0 4px" }}>What does your result show?</p>
          <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: "0 0 12px" }}>
            Choose what you see on the test window
          </p>
          <div style={cardStyle} onClick={() => setResult("negative")}>One line</div>
          <div style={cardStyle} onClick={() => setResult("positive")}>Two lines</div>
          <div style={cardStyle} onClick={() => setResult("unclear")}>No line, or faint and unclear</div>
        </>
      )}

      {result && (
        <>
          <p className="heading" style={{ fontSize: "15px", color: resultContent[result].color, margin: "0 0 8px" }}>
            {resultContent[result].title}
          </p>
          <p style={{ fontSize: "13px", lineHeight: 1.6, margin: "0 0 14px" }}>
            {resultContent[result].text}
          </p>
          <button className="btn-primary" style={{ marginBottom: "8px" }} onClick={() => navigate("/facilities")}>
            {resultContent[result].primaryLabel}
          </button>
          {resultContent[result].secondaryLabel && (
            <button
              className="btn-primary"
              style={{ background: "var(--color-secondary)", marginBottom: "8px" }}
              onClick={() => navigate("/chat")}
            >
              {resultContent[result].secondaryLabel}
            </button>
          )}
          {result === "positive" && (
            <button
              className="btn-primary"
              style={{ background: "var(--color-accent)", color: "var(--color-text)", marginBottom: "8px" }}
              onClick={() => navigate("/partner-notify")}
            >
              Let past partners know
            </button>
          )}
          <button className="btn-ghost" onClick={() => navigate("/dashboard")}>Back to home</button>
        </>
      )}
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  border: "0.5px solid var(--color-border)",
  borderRadius: "12px",
  padding: "12px 14px",
  marginBottom: "8px",
  cursor: "pointer",
  fontSize: "13px",
};

export default SelfTest;