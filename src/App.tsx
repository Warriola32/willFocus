
import { useMemo, useState } from "react";
import CarViewer from "./CarViewer";

type ModelType = "sedan" | "hatchback";
type ViewMode = "exterior" | "interior";

type CarPart = {
  id: number;
  model: ModelType | "both";
  name: string;
  category: string;
  location: string;
  serialNumber: string;
  description: string;
  shopLink: string;
};

type Meetup = {
  id: number;
  title: string;
  date: string;
  place: string;
  description: string;
};

function App() {
  const [selectedModel, setSelectedModel] = useState<ModelType>("sedan");
  const [viewMode, setViewMode] = useState<ViewMode>("exterior");
  const [search, setSearch] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  const parts: CarPart[] = [
    {
      id: 1,
      model: "both",
      name: "Headlight Assembly",
      category: "Exterior",
      location: "Front bumper / front fascia",
      serialNumber: "BM51-13W029",
      description: "Main headlight unit of the Ford Focus Mk3.5.",
      shopLink: "https://example.com/headlight",
    },
    {
      id: 2,
      model: "both",
      name: "Tail Lamp",
      category: "Exterior",
      location: "Rear body section",
      serialNumber: "BM51-13404",
      description: "Rear tail lamp housing for the Mk3.5.",
      shopLink: "https://example.com/taillamp",
    },
    {
      id: 3,
      model: "both",
      name: "Air Filter Box",
      category: "Engine Bay",
      location: "Upper left side of engine bay",
      serialNumber: "AV61-9600",
      description: "Air intake box and filter housing.",
      shopLink: "https://example.com/airfilter",
    },
    {
      id: 4,
      model: "both",
      name: "Center Console Trim",
      category: "Interior",
      location: "Middle cabin / gear selector area",
      serialNumber: "F1EB-A045B",
      description: "Interior trim surrounding the center console.",
      shopLink: "https://example.com/consoletrim",
    },
    {
      id: 5,
      model: "sedan",
      name: "Trunk Lid Garnish",
      category: "Exterior",
      location: "Rear trunk lid",
      serialNumber: "SED-TRK-351",
      description: "Sedan-specific rear trunk trim piece.",
      shopLink: "https://example.com/sedan-trunk",
    },
    {
      id: 6,
      model: "hatchback",
      name: "Rear Hatch Strut",
      category: "Exterior",
      location: "Left and right hatch support",
      serialNumber: "HAT-STR-887",
      description: "Hatchback gas strut for rear hatch door support.",
      shopLink: "https://example.com/hatch-strut",
    },
  ];

  const meetups: Meetup[] = [
    {
      id: 1,
      title: "Sunday Focus Meet",
      date: "April 14, 2026",
      place: "Tagaytay",
      description:
        "Coffee, rolling shots, sunset photos, and Ford Focus lineup.",
    },
    {
      id: 2,
      title: "Batangas Night Cruise",
      date: "May 03, 2026",
      place: "Lipa City",
      description:
        "Sedan and hatchback owners meetup with mod showcase and convoy.",
    },
    {
      id: 3,
      title: "Interior Detail Session",
      date: "May 25, 2026",
      place: "Alabang",
      description:
        "Cabin detailing, accessories discussion, and photo session.",
    },
  ];

  const filteredParts = useMemo(() => {
    return parts.filter((part) => {
      const matchesModel =
        part.model === "both" || part.model === selectedModel;
      const q = search.toLowerCase();
      const matchesSearch =
        part.name.toLowerCase().includes(q) ||
        part.category.toLowerCase().includes(q) ||
        part.location.toLowerCase().includes(q) ||
        part.serialNumber.toLowerCase().includes(q);
      return matchesModel && matchesSearch;
    });
  }, [parts, selectedModel, search]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setUploadedPhotos((prev) => [...prev, ...previews]);
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: Inter, Arial, sans-serif;
          background: #05070b;
          color: #ffffff;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .app {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(0, 183, 255, 0.16), transparent 24%),
            radial-gradient(circle at bottom right, rgba(0, 119, 255, 0.14), transparent 26%),
            #05070b;
        }

        .container {
          width: min(1180px, 92%);
          margin: 0 auto;
        }

        .nav {
          position: sticky;
          top: 0;
          z-index: 20;
          backdrop-filter: blur(18px);
          background: rgba(5, 7, 11, 0.75);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .nav-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 0;
          gap: 18px;
        }

        .brand {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .brand small {
          color: #8fa8c6;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-size: 11px;
        }

        .brand strong {
          font-size: 18px;
        }

        .nav-links {
          display: flex;
          gap: 22px;
          color: #c5d0df;
          flex-wrap: wrap;
          font-size: 14px;
        }

        .hero {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 28px;
          align-items: center;
          padding: 72px 0 50px;
        }

        .pill {
          display: inline-block;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: #b8dfff;
          font-size: 13px;
          margin-bottom: 20px;
        }

        .hero h1 {
          font-size: clamp(40px, 7vw, 76px);
          line-height: 0.95;
          margin-bottom: 18px;
          letter-spacing: -0.04em;
        }

        .gradient-text {
          background: linear-gradient(90deg, #ffffff, #8dd5ff, #41b8ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero p {
          color: #b8c3d3;
          font-size: 18px;
          line-height: 1.8;
          max-width: 680px;
        }

        .hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 28px;
        }

        .btn {
          border: none;
          cursor: pointer;
          padding: 14px 24px;
          border-radius: 16px;
          font-size: 15px;
          font-weight: 700;
          transition: 0.25s ease;
        }

        .btn-primary {
          background: linear-gradient(90deg, #29c2ff, #0099ff);
          color: #041019;
          box-shadow: 0 12px 30px rgba(0, 153, 255, 0.25);
        }

        .btn-secondary {
          background: rgba(255,255,255,0.06);
          color: white;
          border: 1px solid rgba(255,255,255,0.12);
        }

        .btn:hover {
          transform: translateY(-2px);
        }

        .hero-card,
        .panel,
        .card,
        .part-card,
        .meet-card,
        .upload-box {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(14px);
          border-radius: 26px;
        }

        .hero-card {
          padding: 24px;
          min-height: 420px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 16px 50px rgba(0,0,0,0.28);
        }

        .model-toggle {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .toggle-btn {
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.06);
          color: white;
          cursor: pointer;
          font-weight: 600;
        }

        .toggle-btn.active {
          background: linear-gradient(90deg, #23c4ff, #007bff);
          color: #051119;
        }

        .car-preview {
          margin-top: 20px;
          border-radius: 24px;
          min-height: 250px;
          padding: 22px;
          display: flex;
          align-items: end;
          justify-content: space-between;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02)),
            radial-gradient(circle at top, rgba(0,153,255,0.20), transparent 40%),
            #09111c;
          overflow: hidden;
          position: relative;
        }

        .car-shape {
          width: 100%;
          max-width: 360px;
          height: 150px;
          border-radius: 80px 80px 34px 34px;
          background: linear-gradient(135deg, #0f1724, #263447 60%, #0d1320);
          position: relative;
          box-shadow: inset 0 6px 12px rgba(255,255,255,0.06);
        }

        .car-shape::before,
        .car-shape::after {
          content: "";
          position: absolute;
          bottom: -18px;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #0b0f16;
          border: 10px solid #2c3a4f;
        }

        .car-shape::before {
          left: 42px;
        }

        .car-shape::after {
          right: 42px;
        }

        .sedan .car-shape {
          clip-path: polygon(8% 70%, 16% 44%, 34% 28%, 56% 22%, 76% 30%, 89% 50%, 96% 68%, 100% 78%, 96% 88%, 6% 88%, 0% 80%);
        }

        .hatchback .car-shape {
          clip-path: polygon(8% 70%, 16% 42%, 36% 24%, 58% 20%, 76% 30%, 88% 42%, 96% 66%, 100% 78%, 95% 88%, 6% 88%, 0% 80%);
        }

        .spec-box {
          width: 170px;
          padding: 14px;
          border-radius: 18px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .spec-box h4 {
          margin-bottom: 8px;
          color: #87d2ff;
        }

        .spec-box p {
          font-size: 13px;
          line-height: 1.6;
          color: #d6e1ee;
        }

        .section {
          padding: 34px 0 22px;
        }

        .section-heading {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 20px;
          margin-bottom: 22px;
          flex-wrap: wrap;
        }

        .section-heading h2 {
          font-size: 34px;
          margin-bottom: 8px;
        }

        .section-heading p {
          color: #aab7c7;
          max-width: 760px;
          line-height: 1.8;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .card {
          padding: 22px;
        }

        .card h3 {
          margin-bottom: 10px;
          font-size: 21px;
        }

        .card p {
          color: #b7c4d5;
          line-height: 1.7;
        }

        .viewer-wrap {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 20px;
        }

        .panel {
          padding: 22px;
        }

        .viewer-box {
          min-height: 360px;
          border-radius: 22px;
          padding: 20px;
          background:
            radial-gradient(circle at center, rgba(0,153,255,0.18), transparent 35%),
            linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)),
            #08111a;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .viewer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
        .viewer-top h3 {
          font-size: 24px;
        }

        .view-toggles {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .view-btn {
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.06);
          color: white;
          cursor: pointer;
          font-weight: 600;
        }

        .view-btn.active {
          background: linear-gradient(90deg, #2ec7ff, #007bff);
          color: #04111b;
        }

        .viewer-stage {
          flex: 1;
          min-height: 220px;
          display: grid;
          place-items: center;
          text-align: center;
          padding: 20px;
        }

        .viewer-stage h4 {
          font-size: 34px;
          margin-bottom: 8px;
        }

        .viewer-stage p {
          color: #c1cddd;
          line-height: 1.8;
          max-width: 460px;
        }

        .mini-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 18px;
        }

        .mini-stat {
          padding: 14px;
          border-radius: 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .mini-stat strong {
          display: block;
          color: #83d3ff;
          margin-bottom: 6px;
        }

        .mini-stat span {
          color: #c5d0df;
          font-size: 14px;
          line-height: 1.6;
        }

        .parts-tools {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 18px;
        }

        .search-input {
          flex: 1;
          min-width: 260px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          padding: 14px 16px;
          border-radius: 14px;
          outline: none;
        }

        .part-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .part-card {
          padding: 22px;
        }

        .part-top {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: start;
          margin-bottom: 12px;
        }

        .badge {
          padding: 7px 12px;
          border-radius: 999px;
          background: rgba(0, 153, 255, 0.12);
          color: #8fd5ff;
          font-size: 12px;
          border: 1px solid rgba(0, 153, 255, 0.2);
          white-space: nowrap;
        }

        .part-card h3 {
          font-size: 21px;
          margin-bottom: 10px;
        }

        .meta {
          display: grid;
          gap: 8px;
          color: #becbdb;
          font-size: 14px;
          line-height: 1.7;
          margin-bottom: 14px;
        }

        .part-card p {
          color: #aebccd;
          line-height: 1.8;
          margin-bottom: 14px;
        }

        .shop-link {
          display: inline-block;
          padding: 10px 14px;
          border-radius: 12px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          color: #92d9ff;
          font-weight: 700;
        }

        .upload-box {
          padding: 22px;
        }

        .upload-label {
          display: inline-block;
          padding: 12px 18px;
          border-radius: 14px;
          background: linear-gradient(90deg, #2bc8ff, #007bff);
          color: #06111a;
          font-weight: 800;
          cursor: pointer;
          margin: 14px 0 18px;
        }

        .upload-input {
          display: none;
        }

        .photo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 10px;
        }

        .photo-card {
          border-radius: 20px;
          overflow: hidden;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          min-height: 190px;
        }

        .photo-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .empty-gallery {
          color: #a7b4c5;
          line-height: 1.8;
          padding: 8px 0 4px;
        }

        .meet-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .meet-card {
          padding: 22px;
        }

        .meet-card h3 {
          margin-bottom: 10px;
          font-size: 22px;
        }

        .meet-card .date {
          color: #83d3ff;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .meet-card .place {
          color: #cbd7e5;
          margin-bottom: 12px;
        }

        .meet-card p {
          color: #aebccd;
          line-height: 1.8;
        }

        .footer {
          padding: 40px 0 70px;
          color: #8ea0b8;
          text-align: center;
        }

        @media (max-width: 980px) {
          .hero,
          .viewer-wrap,
          .feature-grid,
          .part-grid,
          .meet-grid,
          .photo-grid {
            grid-template-columns: 1fr;
          }

          .hero-card {
            min-height: auto;
          }

          .car-preview {
            flex-direction: column;
            align-items: start;
            gap: 18px;
          }

          .spec-box {
            width: 100%;
          }
        }

        @media (max-width: 760px) {
          .nav-inner,
          .section-heading,
          .part-top,
          .viewer-top {
            align-items: start;
          }

          .nav-links {
            gap: 14px;
            font-size: 13px;
          }

          .hero {
            padding-top: 48px;
          }

          .section-heading h2 {
            font-size: 28px;
          }

          .viewer-stage h4 {
            font-size: 28px;
          }
        }

        
      `}</style>

      <div className="app">
        <nav className="nav">
          <div className="container nav-inner">
            <div className="brand">
              <small>Ford Focus Archive</small>
              <strong>Mk3.5 Sedan & Hatchback</strong>
            </div>

            <div className="nav-links">
              <a href="#home">Home</a>
              <a href="#garage">3D Garage</a>
              <a href="#parts">Parts</a>
              <a href="#gallery">Gallery</a>
              <a href="#meetups">Meetups</a>
            </div>
          </div>
        </nav>

        <main className="container">
          <section className="hero" id="home">
            <div>
              <div className="pill">Car showcase + parts explorer + memories</div>
              <h1>
                <span className="gradient-text">Ford Focus Mk3.5</span>
                <br />
                2016
              </h1>
              <p>
                A clean and premium website for your Ford Focus Mk3.5
                sedan and hatchback. Explore car views, check parts and serial
                numbers, upload your own photos, save shop links, and keep meetup
                memories in one place.
              </p>

              <div className="hero-actions">
                <a className="btn btn-primary" href="#garage">
                  Explore Garage
                </a>
                <a className="btn btn-secondary" href="#parts">
                  Open Parts Explorer
                </a>
              </div>
            </div>

            <div className={`hero-card ${selectedModel}`}>
              <div>
                <div className="model-toggle">
                  <button
                    className={`toggle-btn ${selectedModel === "sedan" ? "active" : ""}`}
                    onClick={() => setSelectedModel("sedan")}
                  >
                    Sedan
                  </button>
                  <button
                    className={`toggle-btn ${selectedModel === "hatchback" ? "active" : ""}`}
                    onClick={() => setSelectedModel("hatchback")}
                  >
                    Hatchback
                  </button>
                </div>

                <div className="car-preview">
                  <div className="car-shape" />
                  <div className="spec-box">
                    <h4>{selectedModel === "sedan" ? "Sedan Build" : "Hatchback Build"}</h4>
                    <p>
                      {selectedModel === "sedan"
                        ? "Elegant rear trunk line, premium  feel, and clean executive styling."
                        : "Sportier rear profile, practical hatch access, and a more aggressive street look."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mini-stats">
                <div className="mini-stat">
                  <strong>Interior</strong>
                  <span>Cabin section ready for dashboard, console, and seat details.</span>
                </div>
                <div className="mini-stat">
                  <strong>Parts Access</strong>
                  <span>Quick lookup for location, serial number, and buying links.</span>
                </div>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="feature-grid">
              <div className="card">
                <h3>3D Garage Ready</h3>
                <p>
                  The design is prepared for future 3D integration. For now, the
                  page already works as an interactive showcase for exterior and
                  interior views.
                </p>
              </div>

              <div className="card">
                <h3>Parts Explorer</h3>
                <p>
                  Search parts by name, category, location, or serial number and
                  keep direct links to trusted shops.
                </p>
              </div>

              <div className="card">
                <h3>Meetups & Memories</h3>
                <p>
                  Save your community events, convoy nights, road trips, and car
                  stories in a premium memory wall.
                </p>
              </div>
            </div>
          </section>

          <section className="section" id="garage">
            <div className="section-heading">
              <div>
                <h2>Garage Viewer</h2>
                <p>
                  This section acts as your interactive vehicle area. A real 3D
                  model can be added later, but the structure is already complete
                  for exterior and interior presentation.
                </p>
              </div>
            </div>

            <div className="viewer-wrap">
              <div className="panel">
                <div className="viewer-box">
                  <div className="viewer-top">
  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
    <h3>
      {selectedModel === "sedan" ? "Sedan View" : "Hatchback View"}
    </h3>

    <div className="view-toggles">
      <button
        className={`view-btn ${selectedModel === "sedan" ? "active" : ""}`}
        onClick={() => setSelectedModel("sedan")}
      >
        Sedan
      </button>
      <button
        className={`view-btn ${selectedModel === "hatchback" ? "active" : ""}`}
        onClick={() => setSelectedModel("hatchback")}
      >
        Hatchback
      </button>
    </div>
  </div>

  <div className="view-toggles">
    <button
      className={`view-btn ${viewMode === "exterior" ? "active" : ""}`}
      onClick={() => setViewMode("exterior")}
    >
      Exterior
    </button>
    <button
      className={`view-btn ${viewMode === "interior" ? "active" : ""}`}
      onClick={() => setViewMode("interior")}
    >
      Interior
    </button>
  </div>
</div>

                  <div className="viewer-stage" style={{ display: "block", padding: 0 }}>
  <CarViewer modelName={selectedModel} />
  <div style={{ padding: "18px 6px 4px", textAlign: "center" }}>
    <h4 style={{ fontSize: "30px", marginBottom: "8px" }}>
      {viewMode === "exterior" ? "Exterior Walkaround" : "Interior Cabin Tour"}
    </h4>
    <p
      style={{
        color: "#c1cddd",
        lineHeight: 1.8,
        maxWidth: "540px",
        margin: "0 auto",
      }}
    >
      {viewMode === "exterior"
        ? "Rotate the car model to inspect the body shape, front profile, side line, and rear section."
        : "This starter version still uses the same 3D object, but your next upgrade can switch to a true interior model or cabin scene."}
    </p>
  </div>
</div>
                </div>
              </div>

              <div className="panel">
                <div className="mini-stats">
                  <div className="mini-stat">
                    <strong>Current Model</strong>
                    <span>{selectedModel === "sedan" ? "Ford Focus Sedan" : "Ford Focus Hatchback"}</span>
                  </div>
                  <div className="mini-stat">
                    <strong>Current View</strong>
                    <span>{viewMode === "exterior" ? "Exterior area" : "Interior area"}</span>
                  </div>
                  <div className="mini-stat">
                    <strong>Best Use</strong>
                    <span>Showcase trims, customizations, and owner reference details.</span>
                  </div>
                  <div className="mini-stat">
                    <strong>Future Upgrade</strong>
                    <span>Add Three.js or React Three Fiber for a real rotatable 3D model.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="parts">
            <div className="section-heading">
              <div>
                <h2>Parts Explorer</h2>
                <p>
                  Search and view Ford Focus parts with category, location,
                  serial number, description, and shop links.
                </p>
              </div>
            </div>

            <div className="parts-tools">
              <input
                className="search-input"
                type="text"
                placeholder="Search part name, location, serial number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="part-grid">
              {filteredParts.map((part) => (
                <div className="part-card" key={part.id}>
                  <div className="part-top">
                    <div>
                      <h3>{part.name}</h3>
                    </div>
                    <div className="badge">{part.category}</div>
                  </div>

                  <div className="meta">
                    <div><strong>Location:</strong> {part.location}</div>
                    <div><strong>Serial Number:</strong> {part.serialNumber}</div>
                    <div><strong>Model:</strong> {part.model === "both" ? "Sedan & Hatchback" : part.model}</div>
                  </div>

                  <p>{part.description}</p>

                  <a
                    className="shop-link"
                    href={part.shopLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Shop Link
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section className="section" id="gallery">
            <div className="section-heading">
              <div>
                <h2>Your Car Gallery</h2>
                <p>
                  Upload real photos of your own Ford Focus. Great for front
                  shots, rear profile, wheels, interior setup, mods, engine bay,
                  and meetup moments.
                </p>
              </div>
            </div>

            <div className="upload-box">
              <label className="upload-label" htmlFor="photo-upload">
                Upload Photos
              </label>
              <input
                id="photo-upload"
                className="upload-input"
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
              />

              {uploadedPhotos.length === 0 ? (
                <div className="empty-gallery">
                  No uploaded images yet. Add your real sedan or hatchback photos here.
                </div>
              ) : (
                <div className="photo-grid">
                  {uploadedPhotos.map((photo, index) => (
                    <div className="photo-card" key={index}>
                      <img src={photo} alt={`Uploaded car ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="section" id="meetups">
            <div className="section-heading">
              <div>
                <h2>Meetups & Memories</h2>
                <p>
                  Save special memories from cruises, owner meets, detailing
                  sessions, and Ford Focus events.
                </p>
              </div>
            </div>

            <div className="meet-grid">
              {meetups.map((meet) => (
                <div className="meet-card" key={meet.id}>
                  <h3>{meet.title}</h3>
                  <div className="date">{meet.date}</div>
                  <div className="place">{meet.place}</div>
                  <p>{meet.description}</p>
                </div>
              ))}
            </div>
          </section>

          <footer className="footer">
            Ford Focus Mk3.5 2016 — Sedan & Hatchback Showcase
          </footer>
        </main>
      </div>
    </>
  );
}

export default App;