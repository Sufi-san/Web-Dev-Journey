import { useState } from "react";
import { motion, useScroll } from "motion/react";
import LogoSvg from "./assets/react.svg";


function App() {

  const {scrollYProgress} = useScroll();

  return (
    <div
      className="text-center font-mono"
      style={{ padding: "5rem" }}
    >
      {/* <motion.div
        className=" h-40 w-40 bg-[crimson] border-2 border-white"
        initial={{
          x: 100,
          y: 100,
        }}
        // animate={{ 
        //   // think of each index as one keyframe
        //   // the value at each index describes position of the object at that instance
        //   x: [0,800,800,0],
        //   y: [0,300,0,0],
        //   rotate: [0,360,0,-360]
        // }}
        // transition={{
        //   duration: 6,
        //   delay: 3,
        //   repeat: Infinity,
        //   ease: "anticipate" // timing function
        // }}
        // whileTap={{
        //   backgroundColor: "green"
        // }}
        // whileHover={{
        //   scale: 2
        // }}
        // drag // applies drag animation
        // whileDrag={{
        //   scale: 0.8
        // }}
        // dragConstraints={{ // decide boundary limits for dragging
        //   left: 0,
        //   top: 0,
        //   right: 1000,
        //   bottom: 800
        // }}
        // dragDirectionLock // prevents dragging on both axes simultaneously
        
      >
        <div className="bg-blue-400 h-full w-1/2">

        </div>
      </motion.div> */}

      <motion.div 
      className={`bg-red-400 h-3 w-full origin-left rounded-full fixed top-0 left-0`}
      style={{
        scaleX: scrollYProgress
      }}
      >

      </motion.div>

      <h2
        className="text-6xl font-bold"
        style={{ marginBottom: "40px" }}
      >
        Sufiyan's Animation Attempt
      </h2>

      <p className="text-4xl text-wrap ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia velit et provident deleniti, nostrum quibusdam praesentium ipsum possimus iure nesciunt eum, reprehenderit ex? Totam cupiditate mollitia, expedita id perferendis fuga quisquam praesentium temporibus sapiente quasi exercitationem eius maiores repellat, adipisci magni accusamus nisi porro deserunt! Vero, quibusdam doloremque praesentium ratione magni possimus vitae beatae neque delectus. Repellat corporis ullam, officiis id quaerat consequuntur maiores beatae quo, consequatur dolores veritatis ipsa qui molestias maxime optio aut amet blanditiis recusandae nobis esse minima ex. Odio, accusantium dolore rem alias voluptatem inventore, quo neque labore consequatur, asperiores laborum! Veniam dolore recusandae, mollitia aut ut debitis unde ex excepturi eum, quo consequatur, voluptatum perspiciatis omnis porro laudantium ipsum. Illo rem iure eligendi ipsam eos pariatur vero, unde iste! Eveniet est minima, mollitia reprehenderit, doloremque adipisci distinctio quisquam at quas unde modi. Laudantium debitis molestias velit maxime! Repellendus, quos. Pariatur facere veniam, iure vel libero aliquam, sunt debitis possimus aperiam voluptatum ullam numquam modi, repellat quia sequi ex voluptate. Delectus aspernatur, distinctio quam, dolor omnis facilis iste iusto ea eius reiciendis perferendis atque placeat sunt voluptas, odio ullam consectetur natus? Ex, magnam tempore. Perferendis et maiores sint quod quaerat vero vel voluptas fugiat temporibus tempora?
        <br /><br />
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil beatae error asperiores sit? Qui officia et doloremque dolore facere. Iure molestias itaque assumenda voluptate nemo eaque, voluptatum quo odio, officiis quasi quod, numquam sint ratione corrupti ab eius dolores consequatur. Eum error, assumenda sit sunt velit illo deleniti facere, porro ab, quo consequatur! Nobis magni aspernatur fuga corporis molestiae deleniti nisi facere aliquam sit. Blanditiis molestias ab cupiditate, incidunt eius aliquam iure hic modi doloribus laboriosam mollitia similique laudantium perferendis, porro neque! Ex eveniet quam ab quia voluptate nisi minima dolorum, consectetur reprehenderit ad, atque voluptatum vitae doloremque laboriosam cum aut. Distinctio, quis reprehenderit vero repellat labore voluptate est necessitatibus maiores excepturi perspiciatis voluptatum, dignissimos eveniet temporibus quisquam non id eligendi ducimus vitae at laborum nesciunt. Eos deserunt reiciendis accusamus, omnis obcaecati eaque, soluta nulla architecto quae dolore tenetur atque rem sapiente! Magni fuga odit, eos harum rem, officiis assumenda unde eaque dicta quia, excepturi minima cum hic ullam in voluptate dolores et vero laudantium? Quo aspernatur dolorum saepe, neque, exercitationem qui, perspiciatis quibusdam repellat corrupti ipsam inventore at vel. Velit possimus, perspiciatis perferendis natus aperiam error veniam corporis iste sapiente tenetur suscipit vitae porro, esse, itaque harum numquam expedita!
        <br /><br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id molestiae et voluptate autem veritatis incidunt est! Fugit cumque illo inventore id. Minima sit velit odit totam voluptatum ex fugit nam libero dolor ipsum beatae, vitae dolorem possimus minus perferendis at quia eaque voluptatibus cupiditate pariatur. Earum numquam ducimus laborum commodi.
      </p>
    </div>
  )
}

export default App
