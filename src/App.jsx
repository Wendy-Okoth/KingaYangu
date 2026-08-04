import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Onboarding from "./pages/Onboarding";
import PinSetup from "./pages/PinSetup";
import Dashboard from "./pages/Dashboard";
import SelfTest from "./pages/SelfTest";
import FacilityFinder from "./pages/FacilityFinder";
import FacilityDetail from "./pages/FacilityDetail";
import Chat from "./pages/Chat";
import Reminders from "./pages/Reminders";
import PartnerNotify from "./pages/PartnerNotify";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>Loading Kinga Yangu...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/pin-setup" element={<PinSetup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/self-test" element={<SelfTest />} />
      <Route path="/facilities" element={<FacilityFinder />} />
      <Route path="/facilities/:id" element={<FacilityDetail />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/reminders" element={<Reminders />} />
      <Route path="/partner-notify" element={<PartnerNotify />} />
    </Routes>
  );
}

export default App;