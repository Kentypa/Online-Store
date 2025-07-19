import { useState, useRef, FC, MouseEvent } from "react";
import styles from "./style.module.css";

interface ZoomImageProps {
  src: string;
  zoomSize?: number;
  zoomScale?: number;
}
interface ZoomStyle {
  left: number;
  top: number;
  backgroundImage: string;
  backgroundSize: string;
  backgroundPosition: string;
}

export const ZoomImage: FC<ZoomImageProps> = ({
  src,
  zoomSize = 150,
  zoomScale = 2,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [zoomStyle, setZoomStyle] = useState<ZoomStyle | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setZoomStyle({
      left: x - zoomSize / 2,
      top: y - zoomSize / 2,
      backgroundImage: `url(${src})`,
      backgroundSize: `${containerWidth * zoomScale}px ${containerHeight * zoomScale}px`,
      backgroundPosition: `-${x * zoomScale - zoomSize / 2}px -${y * zoomScale - zoomSize / 2}px`,
    });
  };

  return (
    <>
      <svg style={{ display: "none" }}>
        <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.008"
            numOctaves="2"
            seed="92"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setZoomVisible(true)}
        onMouseLeave={() => {
          setZoomVisible(false);
          setZoomStyle(null);
        }}
      >
        <img src={src} className="w-full h-full object-cover" alt="main" />

        {zoomVisible && zoomStyle && (
          <div
            className={`${styles["glass-zoom"]} rounded-full`}
            style={{
              width: zoomSize,
              height: zoomSize,
              left: zoomStyle.left,
              top: zoomStyle.top,
              position: "absolute",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: zoomSize - 24,
                height: zoomSize - 24,
                margin: 12,
                borderRadius: "50%",
                backgroundImage: zoomStyle.backgroundImage,
                backgroundSize: zoomStyle.backgroundSize,
                backgroundPosition: zoomStyle.backgroundPosition,
                boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                position: "relative",
                zIndex: 3,
              }}
            />

            <div className={styles["glass-filter"]} />
            <div className={styles["glass-overlay"]} />
            <div className={styles["glass-specular"]} />
          </div>
        )}
      </div>
    </>
  );
};
