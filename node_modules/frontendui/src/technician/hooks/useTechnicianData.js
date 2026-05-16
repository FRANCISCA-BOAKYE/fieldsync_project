import { useState } from "react";

const mockTechnicianProfile = {
  name: "Kwame Asante",
  role: "Field Technician",
  email: "kwame.asante@swiftfix.com",
  phone: "+233 24 456 7890",
  status: "Active",
  stats: {
    completedThisMonth: 18,
    avgJobDuration: "2.8h",
    activeJobs: 2,
  },
};

export default function useTechnicianData() {
  const [data] = useState(mockTechnicianProfile);
  return data;
}
