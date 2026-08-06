import { useState } from "react";
import { useNavigate } from "react-router-dom";

const messageTemplate =
  "Someone you've been with recently was tested and asked us to let you know it's a good time to get checked too. No names are shared. Find free testing near you at kingayangu.co.ke";

function PartnerNotify() {
  const [mode, setMode] = useState(null); // null | "sms" | "link"
  const [phone, setPhone] = useState("");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  function sendSms() {
    if (!phone.trim()) return;
    // Opens the phone's native SMS app with the number and message pre-filled.
    // The message is sent from the partner's own phone, not from any server,
    // so no phone number is ever stored or transmitted through the app itself.
    const smsUrl = `sms:${phone}?body=${encodeURIComponent(messageTemplate)}`;
    window.location.href = smsUrl;
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(messageTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }

  async function shareLink() {
    if (navigator.share) {
      try {
        await navigator.share({ text: messageTemplate });
      } catch (err) {
        // User cancelled the share sheet — not an error worth logging
      }
    } else {
      copyLink();
    }
  }

  return (
    <div style={{ maxWidth: "380px", margin: "0 auto", padding: "18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
        <span onClick={() => navigate(-1)} style={{ cursor: "pointer", fontSize: "18px" }}>←</span>
        <p className="heading" style={{ fontSize: "15px", margin: 0 }}>Let past partners know</p>
      </div>

      <p style={{ fontSize: "13px", lineHeight: 1.6, margin: "0 0 6px" }}>
        This is optional. If you'd like, we can help you send a message to recent partners so they can get tested too.
      </p>
      <p style={{ fontSize: "12px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: "0 0 16px" }}>
        Your name is never included, and they won't know who sent it.
      </p>

      <div style={{ background: "#fff", border: "0.5px solid var(--color-border)", borderRadius: "12px", padding: "14px", marginBottom: "16px" }}>
        <p style={{ fontSize: "11px", color: "var(--color-text-muted)", margin: "0 0 6px" }}>Message preview</p>
        <p style={{ fontSize: "12px", fontStyle: "italic", lineHeight: 1.6, margin: 0 }}>"{messageTemplate}"</p>
      </div>

      {mode !== "sms" && (
        <>
          <p style={{ fontSize: "12px", fontWeight: 500, margin: "0 0 8px" }}>How should we reach them?</p>

          <div
            onClick={() => setMode("sms")}
            style={pillStyle}
          >
            <span>📱 By SMS to a phone number</span>
            <span>›</span>
          </div>

          <div onClick={shareLink} style={pillStyle}>
            <span>🔗 Get a link to send yourself</span>
            <span>›</span>
          </div>
          {copied && (
            <p style={{ fontSize: "11px", color: "var(--color-secondary)", margin: "6px 0 0" }}>
              Copied to clipboard
            </p>
          )}
        </>
      )}

      {mode === "sms" && (
        <>
          <p style={{ fontSize: "12px", fontWeight: 500, margin: "0 0 8px" }}>Partner's phone number</p>
          <input
            type="tel"
            placeholder="07xx xxx xxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              border: "0.5px solid var(--color-border)",
              borderRadius: "10px",
              padding: "10px 12px",
              fontSize: "13px",
              marginBottom: "12px",
            }}
          />
          <p style={{ fontSize: "11px", color: "var(--color-text-muted)", margin: "0 0 14px" }}>
            This opens your messaging app with the text ready to send. The app does not store or transmit this number itself.
          </p>
          <button className="btn-primary" onClick={sendSms} style={{ marginBottom: "8px" }}>
            Open messages app
          </button>
        </>
      )}

      <button className="btn-ghost" onClick={() => navigate(-1)}>Not right now</button>
    </div>
  );
}

const pillStyle = {
  background: "#fff",
  border: "0.5px solid var(--color-border)",
  borderRadius: "10px",
  padding: "10px 14px",
  fontSize: "13px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  marginBottom: "8px",
};

export default PartnerNotify;