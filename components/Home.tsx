import { FiDownload } from "react-icons/fi";
import Photo from "./Photo";
import Social from "./Social";
import { Button } from "./ui/button";

const Home = () => {
  return (
    <section
      className="flex flex-col xl:flex-row items-center xl:justify-between max-xs:mt-22 mt-32 xl:mt-60"
      id="home"
    >
      <h1 className="hidden">Enzo Sousa Portfolio</h1>
      <div className="text-center xl:text-left order-2 xl:order-1 mt-4 xl:mt-0">
        <span className="text-xl">Web developer</span>
        <h1 className="h1 mb-2">
          Hello I&apos;m <br />
          <span className="text-neon drop-shadow-neon">Enzo Sousa</span>
        </h1>
        <p className="max-w-[500px] mb-4 break-words">
          I am 20 years old, a full-stack developer in training at Epitech and
          in apprenticeship at Creach Agency, coding for two years.
        </p>
        <div className="flex flex-col items-center gap-4 xl:flex-row">
          <a href="/CV-Sousa-Enzo.pdf" download>
            <Button
              variant="neon"
              size="lg"
              className="uppercase flex items-center gap-2"
            >
              <span>Download CV</span>
              <FiDownload className="text-xl" />
            </Button>
          </a>
          <div>
            <Social
              containerStyles="flex gap-4"
              iconStyles="w-9 h-9 border drop-shadow-neon border-neon rounded-full flex justify-center items-center text-base text-neon"
            />
          </div>
        </div>
      </div>
      <div className="order-1 xl:order-2">
        <Photo />
      </div>
    </section>
  );
};

export default Home;
