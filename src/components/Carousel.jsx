import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { useState, memo } from "react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const certificates = [
  "certif_web",
  "tcpc_certif",
  "tcpc_certif_g",
  "elmore_certif",
  "ai_certif",
  "cpu_hackathon_certif"
];

const Modal = memo(({ selected, onClose }) => {
  if (!selected) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <img
        src={`/certif/${selected}.webp`}
        alt="Certificate preview"
        className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl"
      />
    </div>
  );
});

Modal.displayName = "Modal";

export const Carousel = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="w-full py-20">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        speed={1200}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 35,
          stretch: 20,
          depth: 180,
          modifier: 1.5,
          slideShadows: true,
          scale: 0.8,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="w-[60vw] max-w-2xl"
      >
        {certificates.map((cert, i) => (
          <SwiperSlide
            key={i}
            className="w-[260px] md:w-[320px] cursor-pointer"
            onClick={() => setSelected(cert)}
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={`/certif/${cert}.webp`}
                
                alt={`Certificate ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Modal selected={selected} onClose={() => setSelected(null)} />
    </div>
  );
};