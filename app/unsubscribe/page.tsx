export default function UnsubscribePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8fafc",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          padding: 32,
          backgroundColor: "#fff",
          borderRadius: 8,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: 16 }}>
          ✅ Disiscrizione completata
        </h1>

        <p style={{ color: "#555", marginBottom: 24 }}>
          Sei stato rimosso con successo dalla nostra newsletter.
        </p>

        <p style={{ fontSize: 14, color: "#777" }}>
          Ci dispiace vederti andare.<br />
          Potrai sempre iscriverti di nuovo dal nostro sito.
        </p>

        <a
          href="/"
          style={{
            display: "inline-block",
            marginTop: 24,
            color: "#2563eb",
            textDecoration: "underline",
          }}
        >
          Torna al sito
        </a>
      </div>
    </div>
  );
}
