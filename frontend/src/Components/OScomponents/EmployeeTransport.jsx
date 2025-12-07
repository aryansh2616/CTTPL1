import React from "react";
import { motion } from "framer-motion";
import image from "../../images/fleets.png";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const slideFromLeft = {
  hidden: { x: -80, opacity: 0, scale: 0.98 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 14 },
  },
};

const slideFromRight = {
  hidden: { x: 80, opacity: 0, scale: 0.98 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 14 },
  },
};

const EmployeeTransport = () => {
  return (
    <section className="w-full flex flex-col md:flex-row items-center md:items-stretch gap-10 px-6 md:px-16 py-16 bg-white">
      <motion.div
        className="w-full md:w-1/2 flex justify-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Image animated (slide from left) */}
        <motion.img
          src={image}
          alt="Employee Transport Bus"
          className="w-full max-w-[500px] max-h-[410px] object-contain rounded-4xl"
          variants={slideFromLeft}
        />
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 flex flex-col justify-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Text animated (slide from right) */}
        <motion.div variants={slideFromRight}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-red-600">Employee</span> Transport Services
          </h2>
          <div className="flex flex-col gap-4">
            <p className="text-gray-700 leading-relaxed">
              Our Motto -{" "}
              <span className="italic">
                "Your Workforce, Our Priority - On Time, Every Time."
              </span>{" "}
              CTTPL is committed to providing the best employee transportation
              services that prioritize time, comfort, safe, reliability, and
              convenience. Understanding the value of a smooth and stress-free
              commute, we offer tailored transportation solutions designed to
              meet the needs of your workforce.
            </p>
            <p className="text-gray-700 leading-relaxed">
              As one of India’s largest and most respected corporate employee
              transportation providers, we take pride in offering rides that are
              cost-effective, safe, secure, and comfortable. With over three and
              a half decades of experience, we have accomplished numerous
              milestones and consistently upheld nearly 100% client retention,
              thanks to the exceptional quality of our Employee Transportation
              Services.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EmployeeTransport;
