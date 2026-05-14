import { useEffect, useState } from "react";

export default function useTechnicianData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([]);
  }, []);

  return data;
}
