import { useState } from "react";
import axios from "axios";

export default function Shortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/shorten", {
        longUrl: url,
      });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      console.error("ERROR", err);
    }
  };

  return (
    <div>
      <input
        placeholder="Enter URL"
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleSubmit}>Shorten</button>
      {shortUrl && <p>Short URL: {shortUrl}</p>}
    </div>
  );
}