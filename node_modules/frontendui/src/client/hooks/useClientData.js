import { useEffect, useState } from "react";

export default function useClientData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([]);
  }, []);

  return data;
}
