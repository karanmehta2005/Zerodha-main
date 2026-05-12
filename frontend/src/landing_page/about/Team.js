import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center fw-bold mt-5 mb-5" style={{ color: "#023e8a" }}>Our Leadership Team</h1>
      </div>

      <div className="row p-3 text-center">
        {[
          { name: "Karan Mehta", role: "Founder", color: "#023e8a" },
          { name: "Diya Vohra", role: "Founder", color: "#06d6a0" },
          { name: "Jainam k Jain", role: "Founder", color: "#0077b6" },
          { name: "Yash Rajesh", role: "Founder", color: "#00b4d8" }
        ].map((member, index) => (
          <div key={index} className="col-md-3 p-5">
            <div 
              style={{ 
                width: "120px", 
                height: "120px", 
                borderRadius: "50%", 
                backgroundColor: member.color, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                margin: "0 auto",
                fontSize: "2rem",
                color: "#fff",
                fontWeight: "bold",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
              }}
            >
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h4 className="mt-4 fw-bold">{member.name}</h4>
            <h6 className="text-muted">{member.role}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
