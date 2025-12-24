import Link from "next/link";

export const Navigation = () => {
  return (
    <nav className="fixed w-full z-50 py-8 px-10 flex justify-between items-center mix-blend-difference">
      <Link
        href="/"
        className="magnetic-trigger font-display text-2xl tracking-widest text-white"
      >
        XXX{" "}
        <span className="text-xs font-sans tracking-tight opacity-50">
          STUDIOS
        </span>
      </Link>

      <div className="hidden md:flex gap-16 font-sans text-xs tracking-[0.2em] font-medium text-mercury/70">
        <Link
          href="#work"
          className="magnetic-trigger hover:text-white transition-colors"
        >
          SELECTED
        </Link>
        <Link
          href="#expertise"
          className="magnetic-trigger hover:text-white transition-colors"
        >
          EXPERTISE
        </Link>
        <Link
          href="#contact"
          className="magnetic-trigger hover:text-white transition-colors"
        >
          INQUIRE
        </Link>
      </div>

      <button className="md:hidden text-white">MENU</button>
    </nav>
  );
};
