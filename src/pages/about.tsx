export default function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About MiddLaundryLive</h1>

      <section className="about-section">
        <h2 className="about-subtitle">Meet the Developers</h2>

        <div className="dev-grid">
          <div className="dev-card">
            <img
              src="/images/1730324663445.jpeg"
              alt="Sebastian C."
              className="dev-photo"
            />
            <p className="dev-name">Sebastian C.</p>
          </div>

          <div className="dev-card">
            <img
              src="/images/1738097311696.jpeg"
              alt="Arai H."
              className="dev-photo"
            />
            <p className="dev-name">Arai H.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
