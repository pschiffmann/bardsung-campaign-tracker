import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CampaignList } from "./pages/campaign-list.js";
import { Campaign } from "./pages/campaign/index.js";
import { Index } from "./pages/disclaimer.js";

export const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/campaign" element={<CampaignList />} />
      <Route path="/campaign/:name" element={<Campaign />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
