// "use client";

// import { motion } from "framer-motion";

// export default function BackgroundBlobs() {
//   return (
//     <div className="fixed inset-0 -z-10 overflow-hidden">
//       {/* Blob 1 */}
//       <motion.div
//         className="absolute w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
//         animate={{
//           x: [0, 100, -50, 0],
//           y: [0, -50, 100, 0],
//           scale: [1, 1.2, 0.9, 1],
//         }}
//         transition={{
//           duration: 15,
//           repeat: Infinity,
//           repeatType: "mirror",
//           ease: "easeInOut",
//         }}
//         style={{ top: "-100px", left: "-100px" }}
//       />

//       {/* Blob 2 */}
//       <motion.div
//         className="absolute w-[28rem] h-[28rem] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
//         animate={{
//           x: [0, -120, 80, 0],
//           y: [0, 80, -100, 0],
//           scale: [1, 1.1, 0.95, 1],
//         }}
//         transition={{
//           duration: 18,
//           repeat: Infinity,
//           repeatType: "mirror",
//           ease: "easeInOut",
//         }}
//         style={{ bottom: "-120px", right: "-120px" }}
//       />

//       {/* Blob 3 */}
//       <motion.div
//         className="absolute w-[22rem] h-[22rem] bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
//         animate={{
//           x: [0, 60, -80, 0],
//           y: [0, -80, 60, 0],
//           scale: [1, 1.15, 0.9, 1],
//         }}
//         transition={{
//           duration: 20,
//           repeat: Infinity,
//           repeatType: "mirror",
//           ease: "easeInOut",
//         }}
//         style={{ top: "40%", left: "20%" }}
//       />
//     </div>
//   );
// }
"use client";

import { motion } from "framer-motion";

export default function BackgroundCurve() {
  return (
    <div className="fixed inset-0 -z-10">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 800"
        className="w-full h-full"
        preserveAspectRatio="none"
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <defs>
          <linearGradient id="softGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dde4fdff" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#c8e0fdff" stopOpacity="0.5" /> 
            <stop offset="100%" stopColor="#ffe2f2ff" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        <path
          fill="url(#softGradient)"
          d="M0,400 
             C480,150 960,650 1440,400 
             L1440,800 L0,800 Z"
        />
      </motion.svg>
    </div>
  );
}
