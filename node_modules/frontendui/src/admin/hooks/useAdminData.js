import { useEffect, useState } from "react";

export default function useAdminData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([]);
  }, []);

  return data;
}
