import MobileNav from "./MobileNav";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-background z-40 py-8 px-2">
      <div className="flex justify-between items-center container">
        <h1 className="text-2xl xs:text-4xl font-semibold">
          Portfolio <span className="text-neon drop-shadow-neon">.</span>
        </h1>

        <div className="hidden xl:flex items-center gap-8">
          <Nav />
        </div>

        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
