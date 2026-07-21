import { useLayoutEffect } from "react";
import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppHeader } from "./components/AppHeader";
import { AppointmentPage } from "./pages/AppointmentPage";
import { DashboardPage } from "./pages/DashboardPage";
import { WasteFeePage } from "./pages/WasteFeePage";
import { SubmissionsPage } from "./pages/SubmissionsPage";
import { DogFeePage } from "./pages/DogFeePage";
import { ProfilePage } from "./pages/ProfilePage";
import { CityReportPage } from "./pages/CityReportPage";
import { LifeSituationsPage } from "./pages/LifeSituationsPage";
import { MovingSituationPage } from "./pages/MovingSituationPage";
import { DogRegistrationPage } from "./pages/DogRegistrationPage";
import { BoardPage } from "./pages/BoardPage";
import { NotificationsProvider } from "./context/NotificationsContext";

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <HashRouter>
      <NotificationsProvider>
        <ScrollToTop />
        <AppHeader />

        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/rezervace-terminu" element={<AppointmentPage />} />
          <Route path="/poplatek-za-odpad" element={<WasteFeePage />} />
          <Route path="/poplatek-za-psa" element={<DogFeePage />} />
          <Route path="/moje-podani" element={<SubmissionsPage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/nastenka" element={<BoardPage />} />
          <Route path="/nahlasit-problem" element={<CityReportPage />} />
          <Route path="/zivotni-situace" element={<LifeSituationsPage />} />
          <Route path="/zivotni-situace/stehuji-se" element={<MovingSituationPage />} />
          <Route path="/zivotni-situace/poridil-jsem-si-psa" element={<DogRegistrationPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </NotificationsProvider>
    </HashRouter>
  );
}
