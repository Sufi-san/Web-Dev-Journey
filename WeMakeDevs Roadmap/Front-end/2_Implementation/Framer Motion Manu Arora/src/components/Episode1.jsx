import { motion } from "motion/react";

function Episode1() {
  return (
    <div
      style={{
        backgroundImage: "radial-gradient(circle at 0.5px 0.5px, rgba(6,102,212,0.2) 0.5px, transparent 0)",
        backgroundSize: "8px 8px",
        backgroundRepeat: "repeat"
      }}
      className="flex-col gap-4 h-screen w-full bg-neutral-900 flex items-center justify-center"
    >
      <motion.button
        className="[perspective:1000px] [transform-style:preserve-3d] relative group text-neutral-500 px-12 py-4 rounded-lg bg-black  shadow-[0px_1px_2px_0px_rgba(255,255,255,0.1)_inset,0px_-1px_2px_0px_rgba(255,255,255,0.1)_inset]"
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        whileHover={{
          rotateX: 25, // rotate along X-axis
          rotateY: 10, // rotate along Y-axis
          boxShadow: "0px 18px 25px rgba(8,112,184,0.6)",
          y: -5
        }}
        whileTap={{
          y: 0
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
        style={{
          translateZ: 180 // prevents button from merging with and disappearing into page 
        }}
      > {/* 'group' class can be used to group elements together, children of the element with group class can refer to it via 'group-<event-name>:<tailwind-property>'. (prevents use of useState to detect events like hover)*/}
      {/*
        [persepective:<some-value>] defines how far z-plane is from the screen/user like moving a camera closer to or further away from an object
        Creates a 3D space
      */}
      {/*
        [transform-style:preserve-3D] or 'transform-3d'
        Allows child elements to maintain their 3D positions within the 3D space created by the parent's perspective
        By default browser's 2D behavior is 'transform-style:flat' 
      */}
        <span className="group-hover:text-cyan-500 transition-colors duration-300">Subscribe</span>
        <span className="absolute inset-x-0 bottom-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent h-px w-3/4 mx-auto">
        </span>
        <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 inset-x-0 -bottom-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent h-[4px] w-3/4 mx-auto blur-sm"></span>
      </motion.button>
      
    </div>
  )
}

export default Episode1;