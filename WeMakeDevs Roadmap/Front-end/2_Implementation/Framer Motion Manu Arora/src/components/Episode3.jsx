import { motion, stagger } from "motion/react";
import { useState } from "react";
import { House, ChartBar, User, Settings, ChevronLeft, ChevronRight } from "lucide-react";

/*
    'Variants' are pieces of objects and states which can reused.
*/

function Episode3() {

    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    const links = [
        {
            name: "Home",
            href: "/",
            icon: <House />
        },
        {
            name: "Analytics",
            href: "/analytics",
            icon: <ChartBar />
        },
        {
            name: "Users",
            href: "/users",
            icon: <User />
        },
        {
            name: "Settings",
            href: "/settings",
            icon: <Settings />
        },
    ];

    const sidebarVariant = { // will be passed as variant
        open: {
            width: "16rem"
        },
        closed: {
            width: "4.5rem"
        }
    };

    {/*
        staggerChildren: This property, set on the parent motion component, is the time delay between the start of each individual child's animation. A smaller value means the animations start more closely together, and a larger value creates a longer, more noticeable pause between each child.

        delayChildren: This property, also set on the parent, is a delay before the very first child animation begins. It adds a pause after the parent component's animation is complete, but before the staggered sequence of children begins.

        The total duration of the staggered sequence is the combination of delayChildren and the sum of all staggerChildren delays.
    */}
    const parentVariants = {
        open: {
            transition: {
                staggerChildren: 0.07,
                delayChildren: 0.2
            }
        },
        closed: {
            transition: {
                staggerChildren: 0.05,
                // delayChildren: -1
                // /*
                //     A negative value is particularly interesting. It causes the animation to begin immediately, but to start "partway through" the animation cycle
                // */
                staggerDirection: -1
                /*
                    Makes the stagger animation execute in reverse order
                */
            }
        }
    }
    

    const childVariants = {
        open: {
            opacity: 1,
            y: 0
        },
        closed: {
            opacity: 0,
            y: -10
        }
    }

    return (
        <div className="h-screen ">
            <motion.div
                className="border-r border-neutral-100 h-full"
                initial={false} // don't animate on page load
                animate={isOpen ? "open" : "closed"}
                transition={{
                    duration: 0.3
                }}
            >
                {/* similar to how React DOM parent-children relation works in a top-down fashion, motion animations work in the same way.*/}
                <motion.nav
                    className="bg-white shadow-md h-full border-r-2 border-red-400"
                    variants={sidebarVariant} // connecting variant for the 'open' & 'closed' values in parent's 'animate'
                >
                    <div
                        className="p-4 flex justify-between items-center"
                    >
                        <h2 className={`text-xl font-semibold ${!isOpen && "sr-only"}`}>
                            {/*
                            The sr-only utility class in Tailwind CSS is designed to improve web accessibility by visually hiding content while keeping it accessible to screen readers. 
                        */}
                            Dashboard
                        </h2>
                        <button
                            onClick={toggleSidebar}
                            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
                            aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
                        >
                            {isOpen ? <ChevronLeft /> : <ChevronRight />}
                        </button>
                    </div>
                    <div
                        className="relative"
                    >
                        <nav className="p-4">
                            <motion.ul className="space-y-2"
                            variants={parentVariants}
                            >
                                {/* We will use 'staggering' animation here, components displayed one after another */}
                                {links.map(({ name, href, icon }) =>
                                    <motion.li
                                        key={name}
                                        variants={childVariants}
                                        // connecting variant for the 'open' & 'closed' values in ancestor's 'animate'
                                    >
                                        <a
                                            href={href}
                                            className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200 gap-4"
                                            title={!isOpen ? name : ""}
                                        >
                                            {icon}
                                            {isOpen && name}
                                        </a>
                                    </motion.li>
                                )}
                            </motion.ul>
                        </nav>
                    </div>
                </motion.nav>
            </motion.div>
        </div>
    )
}

export default Episode3