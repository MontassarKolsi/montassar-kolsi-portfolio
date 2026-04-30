import { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCube, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

const hobbies = [
  { src: "/hobbies/travel.webp", label: "I Travel" },
  { src: "/hobbies/hike.webp", label: "I Hike" },
  { src: "/hobbies/fish.webp", label: "I Fish" },
  { src: "/hobbies/cycle.webp", label: "I Cycle" },
];

const SwiperComponent = memo(() => {
  return (
    <div className="animate-float bg-transparent mx-auto relative gpu-accelerated">
      <Swiper
        effect={"cube"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        speed={1200}
        touchRatio={1.5}
        resistanceRatio={0.7}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 95,
          shadowScale: 0.95,
        }}
        pagination={true}
        modules={[EffectCube, Pagination, Autoplay]}
        className="w-[50dvw] 2xl:w-1/3 aspect-square"
        aria-label="Hobbies carousel"
      >
        {hobbies.map((hobby, index) => (
          <SwiperSlide key={index}>
            <img 
              className="aspect-square brightness-65 rounded-md contrast-120 w-[50dvw] object-cover" 
              src={hobby.src}
              alt={hobby.label}
              loading="lazy"
              width="800"
              height="800"
            />
            <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
                <span className="text-sm font-medium">
                  {hobby.label}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

SwiperComponent.displayName = 'SwiperComponent';

export default SwiperComponent;