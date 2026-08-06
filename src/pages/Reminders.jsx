import { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const reminderTypes = [
  { key: "prep", label: "PrEP, daily dose", defaultTime: "20:00" },
  { key: "refill", label: "Refill pickup", defaultTime: "09:00" },
  { key: "retest", label: "Retest reminder", defaultTime: "09:00" },
];

function Reminders() {
  const { user, loading: authLoading } = useAuth();
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    if (!user) return;

    const remindersRef = collection(db, "users", user.uid, "reminders");
    const q = query(remindersRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setReminders(items);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to load reminders:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  async function toggleReminder(reminderId, currentEnabled) {
    if (!user) return;
    const reminderDoc = doc(db, "users", user.uid, "reminders", reminderId);
    try {
      await updateDoc(reminderDoc, { enabled: !currentEnabled });
    } catch (err) {
      console.error("Failed to update reminder:", err);
    }
  }

  async function addReminder(type) {
    if (!user) return;
    const remindersRef = collection(db, "users", user.uid, "reminders");
    try {
      await addDoc(remindersRef, {
        type: type.key,
        label: type.label,
        time: type.defaultTime,
        enabled: true,
        createdAt: serverTimestamp(),
      });
      setShowAdd(false);
    } catch (err) {
      console.error("Failed to add reminder:", err);
    }
  }

  if (authLoading || loading) {
    return (
      <div style={{ maxWidth: "380px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
        <p style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>Loading reminders...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "380px", margin: "0 auto", padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <p className="heading" style={{ fontSize: "15px", margin: 0 }}>Reminders</p>
        <button
          onClick={() => setShowAdd(!showAdd)}
          style={{
            background: "var(--color-primary)",
            color: "var(--color-bg)",
            border: "none",
            borderRadius: "20px",
            padding: "7px 14px",
            fontSize: "12px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          + Add
        </button>
      </div>

      {showAdd && (
        <div style={{ background: "#fff", border: "0.5px solid var(--color-border)", borderRadius: "14px", padding: "12px", marginBottom: "14px" }}>
          <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: "0 0 8px" }}>Choose a reminder type</p>
          {reminderTypes.map((t) => (
            <div
              key={t.key}
              onClick={() => addReminder(t)}
              style={{
                fontSize: "13px",
                padding: "10px 12px",
                borderRadius: "10px",
                border: "0.5px solid var(--color-border)",
                marginBottom: "6px",
                cursor: "pointer",
              }}
            >
              {t.label}
            </div>
          ))}
        </div>
      )}

      {reminders.length === 0 && !showAdd && (
        <p style={{ fontSize: "13px", color: "var(--color-text-muted)", textAlign: "center", marginTop: "24px" }}>
          No reminders yet. Tap "+ Add" to set one up.
        </p>
      )}

      {reminders.map((r) => (
        <div
          key={r.id}
          style={{
            background: "#fff",
            borderRadius: "14px",
            border: "0.5px solid var(--color-border)",
            padding: "14px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p style={{ fontSize: "13px", fontWeight: 500, margin: 0 }}>{r.label}</p>
            <p style={{ fontSize: "11px", color: "var(--color-text-muted)", margin: "2px 0 0" }}>
              Every day at {r.time}
            </p>
          </div>
          <div
            onClick={() => toggleReminder(r.id, r.enabled)}
            style={{
              width: "34px",
              height: "20px",
              borderRadius: "10px",
              background: r.enabled ? "var(--color-secondary)" : "var(--color-border)",
              position: "relative",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "#fff",
                position: "absolute",
                top: "2px",
                left: r.enabled ? "16px" : "2px",
                transition: "left 0.15s",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Reminders;