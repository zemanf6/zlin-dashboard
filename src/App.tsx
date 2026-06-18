import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppHeader } from "./components/AppHeader";
import { AppointmentPage } from "./pages/AppointmentPage";
import { DashboardPage } from "./pages/DashboardPage";
import { WasteFeePage } from "./pages/WasteFeePage";

export default function App() {
  return (
    <HashRouter>
      <AppHeader />

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/rezervace-terminu" element={<AppointmentPage />} />
        <Route path="/poplatek-za-odpad" element={<WasteFeePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}