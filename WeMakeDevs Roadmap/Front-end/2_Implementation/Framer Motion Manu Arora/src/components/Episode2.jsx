import { motion, AnimatePresence } from "motion/react";
import { X, MessageSquareText, Clock12, RefreshCw, Box } from "lucide-react";
import { useState } from "react";

function Episode2() {
    const [isCardVisible, setIsCardVisible] = useState(true);

    return (
        <AnimatePresence>   {/* 
        - makes sure animation runs when component unmounts (exit animations) 
        - it works only if AnimatePresence is the direct parent of the boolean state that we are using to conditionally display any component.
        Eg: 
            <AnimatePresence>
                <div>
                    {conditionalRendering}
                </div>
            </AnimatePresence>

            ... won't work !!
        */}
            {
                isCardVisible &&
                <motion.div
                    className="flex-col gap-4 h-screen w-full bg-gray-100 flex items-center justify-center"
                    exit={{
                        opacity: 0,
                        scale: 0.98,
                        filter: "blur(10px)"
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeInOut"
                    }}
                >
                    <motion.div
                        className="bg-white w-72 h-[28 rem] min-h-[26rem] rounded-xl shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] p-4 flex flex-col"
                        initial={{
                            opacity: 0,
                            filter: "blur(20px)",
                        }}
                        animate={{
                            opacity: 1,
                            filter: "blur(0px)"
                        }}
                        transition={{
                            duration: 0.5
                        }}
                    >
                        <h2 className="text-[10px] font-bold">
                            Aceternity UI Components
                        </h2>
                        <p className="text-neutral-600 mt-2 text-[10px]">
                            A collection of UI components for your projects to get on with it.
                        </p>
                        <div className="flex justify-center items-center">
                            <button
                                className="flex items-center justify-center gap-1 mt-4 text-[10px] shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]  rounded-md px-2 py-1"
                                onClick={() => setIsCardVisible(false)}
                            >
                                <img className="w-4 h-4" src="https://ui.aceternity.com/logo.png" alt="aceternity-logo" />
                                {" "}
                                <h3>Aceternity</h3>
                                <X className="text-neutral-400 w-3 h-3" />
                            </button>
                        </div>
                        <div className="flex-1 bg-gray-100 rounded-lg w-full mt-4 border border-dashed border-neutral-200 relative"> {/** Here, flex-1 lets the div take up the remaining space in the flexbox*/}
                            <motion.div
                                className="absolute inset-0 h-full w-full rounded-lg bg-white divide-y divide-neutral-200 border border-neutral-200"
                                initial={{
                                    opacity: 0,
                                    scale: 0.98,
                                    filter: "blur(10px)"
                                }}
                                whileHover={{
                                    opacity: 1,
                                    scale: 1.05,
                                    filter: "blur(0px)"
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut"
                                }}
                            >
                                {/* 'divide' utility lets you express element separation without using partials borders on every element */}
                                <div
                                    className="p-4 text-[10px] flex items-start"
                                >

                                    <div className="flex gap-2 px-4 py-1">
                                        <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br shadow-xl bg-white rounded-md flex items-center justify-center">
                                            <MessageSquareText className="h-4 w-4 text-neutral-600 " />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-[8px] font-bold text-neutral-600"> Aceternity UI Components
                                            </p>
                                            <p className="text-neutral-400 text-[8px] mt-1">
                                                A collection of UI components
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="p-4 text-[10px] flex items-start"
                                >

                                    <div className="flex gap-2 px-4 py-1">
                                        <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br shadow-xl bg-white rounded-md flex items-center justify-center">
                                            <Clock12 className="h-4 w-4 text-neutral-600 " />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-[8px] font-bold text-neutral-600"> 24 hours turnaround
                                            </p>
                                            <p className="text-neutral-400 text-[8px] mt-1">
                                                Super fast delivery at warp speed.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="p-4 text-[10px] flex items-start"
                                >

                                    <div className="flex gap-2 px-4 py-1">
                                        <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br shadow-xl bg-white rounded-md flex items-center justify-center">
                                            <RefreshCw className="h-4 w-4 text-neutral-600 " />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-[8px] font-bold text-neutral-600"> 360 Days all around
                                            </p>
                                            <p className="text-neutral-400 text-[8px] mt-1">
                                                We're here to help you 24/7.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="p-4 text-[10px] flex items-start"
                                >

                                    <div className="flex gap-2 px-4 py-1">
                                        <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br shadow-xl bg-white rounded-md flex items-center justify-center">
                                            <Box className="h-4 w-4 text-neutral-600 " />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-[8px] font-bold text-neutral-600"> Some more components
                                            </p>
                                            <p className="text-neutral-400 text-[8px] mt-1">
                                                Here goes another subtitle.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </motion.div>
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default Episode2;