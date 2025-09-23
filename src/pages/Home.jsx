import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/disaster-background.png"; // Make sure this path is correct

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h1 className="text-4xl font-bold mb-4">Disaster Management System</h1>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          A platform to report incidents, track relief efforts, allocate resources,
          and coordinate volunteers effectively during emergencies.
        </p>
        <Link
          to="/report"
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-white font-semibold"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="container py-12">
        <h2 className="text-2xl font-bold text-center mb-10">
          What You Can Do With DMS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card p-6 text-center shadow hover:shadow-lg transition">
            <span className="text-4xl">📍</span>
            <h3 className="font-bold mt-3">Report Incident</h3>
            <p className="text-sm mt-2">
              Citizens can report disaster events with location & details.
            </p>
          </div>
          <div className="card p-6 text-center shadow hover:shadow-lg transition">
            <span className="text-4xl">📊</span>
            <h3 className="font-bold mt-3">Track Relief</h3>
            <p className="text-sm mt-2">
              Authorities update progress on relief efforts and supplies.
            </p>
          </div>
          <div className="card p-6 text-center shadow hover:shadow-lg transition">
            <span className="text-4xl">🚑</span>
            <h3 className="font-bold mt-3">Resource Allocation</h3>
            <p className="text-sm mt-2">
              Distribute medical kits, food, and volunteers effectively.
            </p>
          </div>
          <div className="card p-6 text-center shadow hover:shadow-lg transition">
            <span className="text-4xl">🤝</span>
            <h3 className="font-bold mt-3">Volunteer</h3>
            <p className="text-sm mt-2">
              Register and join ongoing relief operations.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-100 py-12 px-6">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">About the System</h2>
          <p className="text-gray-700 leading-relaxed">
            The Disaster Management System (DMS) is designed to bring together
            citizens, authorities, and volunteers on one platform. It ensures
            efficient reporting of incidents, tracking relief activities in real-time,
            allocating resources where needed most, and coordinating volunteers for
            maximum impact.
          </p>
        </div>
      </section>
    </div>
  );
}
