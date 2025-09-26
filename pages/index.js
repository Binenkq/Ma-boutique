import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(null);

  async function checkout(productId) {
    setLoading(productId);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId })
    });
    const data = await res.json();
    setLoading(null);
    if (data.url) window.location.href = data.url;
    else alert("Erreur: " + data.error);
  }

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Ma Boutique</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        
        <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
          <img src="/gopro.jpg" alt="GoPro Hero 12 Black" style={{ maxWidth: "100%" }} />
          <h3>GoPro Hero 12 Black</h3>
          <p><b>280 €</b></p>
          <button onClick={() => checkout("gopro")}>
            {loading === "gopro" ? "Redirection..." : "Acheter"}
          </button>
        </div>

        <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
          <img src="/garmin.jpg" alt="Garmin Fenix 8" style={{ maxWidth: "100%" }} />
          <h3>Garmin Fenix 8</h3>
          <p><b>400 €</b></p>
          <button onClick={() => checkout("garmin")}>
            {loading === "garmin" ? "Redirection..." : "Acheter"}
          </button>
        </div>

      </div>
    </main>
  );
}
