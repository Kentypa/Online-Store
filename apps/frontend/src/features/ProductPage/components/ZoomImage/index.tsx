import {
  useState,
  useRef,
  FC,
  MouseEvent,
  useEffect,
  useCallback,
} from "react";
import { ZoomStyle } from "@features/ProductPage/types/zoom-style";
import Refraction from "@icons/specials/refraction.svg?react";
import styles from "./style.module.css";

type ZoomImageProps = {
  src: string;
  zoomSize?: number;
  zoomScale?: number;
};

export const ZoomImage: FC<ZoomImageProps> = ({
  src,
  zoomSize = 150,
  zoomScale = 8,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [zoomStyle, setZoomStyle] = useState<ZoomStyle | null>(null);
  const [imageReady, setImageReady] = useState(false);
  const [imageInfo, setImageInfo] = useState<{
    displayWidth: number;
    displayHeight: number;
    offsetX: number;
    offsetY: number;
    naturalWidth: number;
    naturalHeight: number;
  } | null>(null);

  const calculateImageInfo = useCallback(() => {
    const container = containerRef.current;
    const image = imageRef.current;

    if (
      !container ||
      !image ||
      !image.complete ||
      !image.naturalWidth ||
      !image.naturalHeight
    ) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;

    const containerRatio = containerWidth / containerHeight;
    const imageRatio = naturalWidth / naturalHeight;

    let displayWidth, displayHeight, offsetX, offsetY;

    if (imageRatio > containerRatio) {
      displayHeight = containerHeight;
      displayWidth = containerHeight * imageRatio;
      offsetX = (containerWidth - displayWidth) / 2;
      offsetY = 0;
    } else {
      displayWidth = containerWidth;
      displayHeight = containerWidth / imageRatio;
      offsetX = 0;
      offsetY = (containerHeight - displayHeight) / 2;
    }

    const newImageInfo = {
      displayWidth,
      displayHeight,
      offsetX,
      offsetY,
      naturalWidth,
      naturalHeight,
    };

    setImageInfo(newImageInfo);
    setImageReady(true);
  }, []);

  const handleImageLoad = useCallback(() => {
    setTimeout(() => {
      calculateImageInfo();
    }, 10);
  }, [calculateImageInfo]);

  useEffect(() => {
    const handleResize = () => {
      if (imageReady) {
        calculateImageInfo();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imageReady, calculateImageInfo]);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    setImageReady(false);
    setImageInfo(null);

    if (image.complete && image.naturalWidth) {
      handleImageLoad();
    } else {
      image.addEventListener("load", handleImageLoad);
      image.addEventListener("error", () => {
        console.error("Ошибка загрузки изображения:", src);
        setImageReady(false);
      });
    }

    return () => {
      image.removeEventListener("load", handleImageLoad);
      image.removeEventListener("error", () => {});
    };
  }, [src, handleImageLoad]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !imageReady) return;

    const resizeObserver = new ResizeObserver(() => {
      calculateImageInfo();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [imageReady, calculateImageInfo]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container || !imageInfo || !imageReady) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

    const lensLeft = x - zoomSize / 2;
    const lensTop = y - zoomSize / 2;

    const imageX = x - imageInfo.offsetX;
    const imageY = y - imageInfo.offsetY;

    if (
      imageX < 0 ||
      imageY < 0 ||
      imageX > imageInfo.displayWidth ||
      imageY > imageInfo.displayHeight
    ) {
      return;
    }

    const scaleX = imageInfo.naturalWidth / imageInfo.displayWidth;
    const scaleY = imageInfo.naturalHeight / imageInfo.displayHeight;

    const naturalX = imageX * scaleX;
    const naturalY = imageY * scaleY;

    const backgroundWidth = imageInfo.naturalWidth * zoomScale;
    const backgroundHeight = imageInfo.naturalHeight * zoomScale;

    const backgroundX = -(naturalX * zoomScale - zoomSize / 2);
    const backgroundY = -(naturalY * zoomScale - zoomSize / 2);

    setZoomStyle({
      left: lensLeft,
      top: lensTop,
      backgroundImage: `url(${src})`,
      backgroundSize: `${backgroundWidth}px ${backgroundHeight}px`,
      backgroundPosition: `${backgroundX}px ${backgroundY}px`,
    });
  };

  const handleMouseEnter = () => {
    if (imageReady && imageInfo) {
      setZoomVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setZoomVisible(false);
    setZoomStyle(null);
  };

  return (
    <>
      <Refraction />
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden cursor-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={imageRef}
          src={src}
          className="w-full h-full object-cover"
          alt="main"
        />
        {zoomVisible && zoomStyle && imageInfo && imageReady && (
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
                backgroundRepeat: "no-repeat",
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
