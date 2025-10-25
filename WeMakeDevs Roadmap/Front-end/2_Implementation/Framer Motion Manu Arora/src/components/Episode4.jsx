import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Rocket } from "lucide-react";
import { useRef } from "react";

// Trying to create the 'parallax effect'
/*
  The parallax effect is a visual technique that creates an illusion of depth on a flat, 2D surface by moving background images and foreground elements at different speeds
*/

function Episode4() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 py-40">
      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        {features.map((feature, idx) => (
          <Card key={feature.title} feature={feature} />
        ))}
      </div>
    </div>
  );
}

const Card = ({ feature }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // track the progress from when the top of the Card enters the bottom of the viewport (1%) till the bottom of the Card disappears towards the top of the viewport (100%)
  });
  // The useScroll hook can be used to track the progress of scroll

  const translateContent = useSpring(
    useTransform(scrollYProgress, [0, 1], [200, -300]),
    {
      stiffness: 100,
      damping: 30,
      mass: 1,
    },
  );
  // We use the transformation of one value (scrollYProgress in above case) and change another value with respect to that change
  // Eg: In above case,
  //      ScrollProgress: 0, 0.1, 0.2, 0.3, ..., 0.6, ..., 0.9, 1
  //      'y' position of card: -200, -160, -120, -80, ..., 40, ..., 160, 200
  // This can be done with any value, not just 'y' coordinate (opacity, color intensity, x coord, ...)

  // useSpring is a tool for creating animations based on spring physics.
  // It allows developers to define how an element should animate by describing its behavior using concepts like tension, friction, and mass, rather than fixed durations and easing curves.

  const opacityContent = useTransform(
    scrollYProgress,
    [0.2, 0.5, 0.8],
    [0, 1, 0],
  );
  const blur = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.6, 1],
    [10, 0, 0, 10],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.8]);

  useMotionValue(scrollYProgress, "change", (latest) => {
    console.log(latest);
  });

  return (
    <div
      ref={ref}
      key={feature.title}
      className="grid grid-cols-2 items-center gap-20 py-40"
    >
      <motion.div
        style={{
          filter: useMotionTemplate`blur(${blur}px)`,
          // motion values cannot be used as is with simple string interpolation...
          // `blur(${blur}px)` won't work
          // useMotionTemplate`blur(${blur}px)` will work
          scale: scale,
        }}
        className="flex flex-col gap-5"
      >
        {feature.icon}
        <h2 className="text-4xl font-bold text-white">{feature.title}</h2>
        <p className="text-lg text-neutral-400">{feature.description}</p>
      </motion.div>
      <motion.div
        style={{
          y: translateContent, // connecting the relative value result obtained from useTransform to 'y' coord position
          opacity: opacityContent,
        }}
      >
        {feature.content}
      </motion.div>
    </div>
  );
};

const features = [
  {
    icon: <Rocket className="h-8 w-8 text-neutral-200" />,
    title: "Generate ultra realistic images in seconds",
    description:
      "With our state of the art AI, you can generate utlra realistic images in no time at all.",
    content: (
      <div>
        <img
          src="https://assets.aceternity.com/pro/car-1.jpg"
          alt="car"
          height="500"
          width="500"
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    icon: <Rocket className="h-8 w-8 text-neutral-200" />,
    title: "Replicate great Art",
    description:
      "Generate the painting of renowned artists, like Van Gogh or Monet or Majnu bhai.",
    content: (
      <img
        src="https://assets.aceternity.com/pro/art.jpeg"
        alt="car"
        height="500"
        width="500"
        className="rounded-lg"
      />
    ),
  },
  {
    icon: <Rocket className="h-8 w-8 text-neutral-200" />,
    title: "Batch generate images with a single click",
    description:
      "With our state of the art AI, you can generate a batch of images within 10 seconds with absolutely no compute power.",
    content: (
      <div className="relative">
        <div className="absolute top-0 -rotate-[10deg]">
          <img
            src="https://assets.aceternity.com/pro/car-3.jpg"
            alt="car"
            height="500"
            width="500"
            className="rounded-lg"
          />
        </div>
        <div className="rotate-[10deg]">
          <img
            src="https://assets.aceternity.com/pro/car-2.jpg"
            alt="car"
            height="500"
            width="500"
            className="rounded-lg"
          />
        </div>
      </div>
    ),
  },
];

export default Episode4;
