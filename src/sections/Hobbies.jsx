import Swiper from "@/components/Swiper"
import { Link } from "react-router-dom";


export const Hobbies = () => {
  return (
    <section id="hobbies" className="py-24 overflow-visible">
      {/* Background glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="text-sm uppercase tracking-wider text-secondary-foreground animate-fade-in">
            Off the Grid
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-secondary-foreground animate-fade-in animation-delay-100">
            Beyond code,{" "}
            <span className="font-serif italic font-normal text-white">
              life unfolds elsewhere
            </span>
          </h2>

        </div>

        {/* 🔥 bottom glow shadow */}
        <div className=" absolute left-40 bottom-40 w-[40%] h-10 bg-[#20b2a6] blur-2xl rounded-full" />

        <Swiper />
        <p className="text-muted-foreground text-center animate-fade-in animation-delay-200 my-16">
          These experiences shape adaptability, patience, and a mindset that extends beyond problem-solving.
        </p>
        <div className="flex justify-center my-24">
          <div className="tooltip-container">
            <Link
              to="/contact"
              className="tooltip-trigger "
            >
              Common interests ?
            </Link>

            <div className="tooltip">
              Let’s Plan One !
            </div>
          </div>
        </div>
      </div>
    </section>);
}