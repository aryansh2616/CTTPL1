// src/components/Team.jsx
import React from "react";
import { FaLinkedin } from "react-icons/fa";

import img1 from "../../images/team/anju.jpg";
import img2 from "../../images/team/Chandradeep.jpg";
import img4 from "../../images/team/sandeep.jpg";
import img5 from "../../images/team/ashok.jpg";
import img7 from "../../images/team/ps.jpg";
import img6 from "../../images/team/preeti.png";

const teamMembers = [
  {
    name: "Mr. P.S. Choudhary",
    title: "Founder and Chairman",
    imageUrl: img7,
    linkedin: "https://www.linkedin.com/in/pschoudhary",
  },
  {
    name: "Mr. Sandeep Choudhary",
    title: "Managing Director",
    imageUrl: img4,
    linkedin: "https://www.linkedin.com/in/sandeep-choudhary-054396369/",
  },
  {
    name: "Mr. Chandradeep Tamta",
    title: "Chief Operating Officer",
    imageUrl: img2,
    linkedin: "https://www.linkedin.com/in/chandradeeptamta",
  },
  {
    name: "Anju Choudhary",
    title: "Chief Financial Officer",
    imageUrl: img1,
    linkedin: "https://www.linkedin.com/in/anju-choudhary-a416abb/",
  },
  {
    name: "Col. Ashok Prabhakar",
    title: "Chief Training Officer",
    imageUrl: img5,
    linkedin:
      "https://www.linkedin.com/in/col-ashok-p-9644247?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    name: "Preeti Tiwari",
    title: "HR Lead",
    imageUrl: img6,
    linkedin:
      "https://www.linkedin.com/in/preeti-tiwari-20070512?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
];

const Team = () => {
  return (
    <section className="bg-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-gray-900">
            Our Valuable <span className="text-red-600">Team</span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-gray-600">
            At CTTPL, we believe our people drive our success. We've built more
            than just a trusted transport network—we've built a family of
            passionate professionals committed to safety, innovation, and
            excellence. From frontline drivers to our corporate teams, every
            individual plays a vital role in keeping India moving.
          </p>
        </div>

        {/* PERFECT 3x2 GRID FOR ALL MEMBERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Profile Image */}
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-90 transition"
              >
                <div className="w-40 h-40 bg-gray-200 rounded-lg mb-4 shadow-md">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </a>

              {/* Name + LinkedIn */}
              <div className="flex items-center gap-2">
                <FaLinkedin className="text-gray-700" />
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-gray-900 hover:text-red-600 transition"
                >
                  {member.name}
                </a>
              </div>

              <p className="text-sm text-gray-600">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
