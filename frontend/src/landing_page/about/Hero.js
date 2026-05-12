import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5 text-center">
        <h1 className="fs-1 fw-bold mb-4" style={{ color: "#023e8a" }}>About Us</h1>
        <p className="fs-5 text-muted mx-auto" style={{ maxWidth: "800px", lineHeight: "1.8" }}>
          We are focused on building intuitive and reliable financial technology solutions that simplify how users interact with the stock market. Our platform is designed to transform complex trading concepts into a smooth and easy-to-understand experience.
        </p>
        <p className="fs-5 text-muted mx-auto mt-3" style={{ maxWidth: "800px", lineHeight: "1.8" }}>
          By combining modern technology with thoughtful design, we aim to create an environment where users can explore market trends, understand trading behavior, and engage with financial systems more confidently.
        </p>
      </div>

      <div className="row p-5 mt-5 border-top">
        <div className="col-md-6 p-5">
          <h2 className="fw-bold mb-4" style={{ color: "#06d6a0" }}>🎯 Our Mission</h2>
          <p className="text-muted fs-5" style={{ lineHeight: "1.8" }}>
            Our mission is to simplify financial complexity by creating smart and user-friendly digital solutions. We strive to make stock market concepts easier to understand, enabling users to learn, explore, and make informed decisions with confidence.
          </p>
        </div>
        <div className="col-md-6 p-5">
          <h2 className="fw-bold mb-4" style={{ color: "#0077b6" }}>🔮 Our Vision</h2>
          <p className="text-muted fs-5" style={{ lineHeight: "1.8" }}>
            Our vision is to build a future where financial systems are more accessible, transparent, and easy to understand. We aim to empower individuals with the knowledge and tools needed to confidently navigate the world of finance.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
