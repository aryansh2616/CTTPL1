import React from "react";
import Embedded from "../Button/Embedded";

const ReportingStructure = () => {
  const topRow = [
    { id: "01", title: "Chauffeurs" },
    { id: "02", title: "Operation Supervisor" },
    { id: "03", title: "Operations Manager" },
  ];

  const bottomRow = [
    { id: "07", title: "Managing Director" },
    { id: "06", title: "CEO" },
    { id: "05", title: "Director-Operations" },
    { id: "04", title: "GM-Operations" },
  ];

  return (
    <div className="bg-[#F4FAF9] w-full py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-24">
          <Embedded text="KEY PERFORMANCE INDICATOR" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Our Reporting <span className="text-[#EC221F]">Structure</span>
          </h1>
        </div>

        {/* Diagram */}
        <div className="relative hidden md:block">
          {/* ===== TOP ROW ===== */}
          <div className="relative flex justify-between mb-40">
            {/* Horizontal line */}
            <div className="absolute top-6 left-[60px] right-[60px] h-[2px] bg-[#EC221F]" />

            {topRow.map(item => (
              <div
                key={item.id}
                className="z-10 flex flex-col items-center bg-[#F4FAF9] px-3"
              >
                <div className="w-12 h-12 rounded-full bg-[#EC221F] text-white flex items-center justify-center font-bold shadow-md">
                  {item.id}
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-800">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          {/* ===== VERTICAL LINE (03 → 07) ===== */}
          <div className="absolute top-[72px] right-0 left-0 flex justify-end">
            <div className="mr-[65px] w-[2px] h-[140px] bg-[#EC221F]" />
          </div>

          {/* ===== BOTTOM ROW ===== */}
          <div className="relative flex justify-between">
            {/* Horizontal line */}
            <div className="absolute top-6 left-[60px] right-[60px] h-[2px] bg-[#EC221F]" />

            {bottomRow.map(item => (
              <div
                key={item.id}
                className="z-10 flex flex-col items-center bg-[#F4FAF9] px-3"
              >
                <div className="w-12 h-12 rounded-full bg-[#EC221F] text-white flex items-center justify-center font-bold shadow-md">
                  {item.id}
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-800">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingStructure;
