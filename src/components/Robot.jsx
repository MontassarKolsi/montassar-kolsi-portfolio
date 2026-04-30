import { memo, Suspense, lazy } from 'react';

// Lazy load Spline only when the component is rendered
const Spline = lazy(() => import('@splinetool/react-spline'));

const SplineFallback = () => (
  <div className="w-full h-full min-h-[400px] flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" role="status">
      <span className="sr-only">Loading 3D model...</span>
    </div>
  </div>
);

export const Robot = memo(() => {
  return (
    <Suspense fallback={<SplineFallback />}>
      <Spline 
        scene="https://prod.spline.design/zGLoZznEgfGCbyxU/scene.splinecode"
        className="gpu-accelerated"
      />
    </Suspense>
  );
});

Robot.displayName = 'Robot';