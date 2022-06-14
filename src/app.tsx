import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CampaignList } from "./pages/campaign-list.js";
import { Campaign } from "./pages/campaign/index.js";
import { Disclaimer } from "./pages/disclaimer.js";
import { Glossary } from "./pages/glossary.js";

export const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Disclaimer />} />
      <Route path="/campaign" element={<CampaignList />} />
      <Route path="/campaign/:name" element={<Campaign />} />
      <Route path="/glossary" element={<Glossary />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
