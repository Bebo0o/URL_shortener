import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/stats")
      .then((res) => setLinks(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Analytics</h2>
      {links.map((link) => (
        <div key={link.id}>
          <p>Code: {link.short_code}</p>
          <p>Clicks: {link.clicks}</p>
        </div>
      ))}
    </div>
  );
}