import { DisplayCoinProperties } from "@features/HomePage/types/display-coin-properties";
import { FC, useMemo } from "react";
import { createPortal } from "react-dom";

export const DisplayCoin: FC<DisplayCoinProperties> = ({
  count,
  coordinates: { x, y },
  duration,
}) => {
  const styleProps = useMemo(() => {
    const translateX = (Math.random() - 0.5) * 50;
    const translateY = (Math.random() - 0.5) * 50;
    const rotate = (Math.random() - 0.5) * 50;
    const scale = 1 + Math.random() * 0.5;
    return { translateX, translateY, rotate, scale };
  }, []);

  return createPortal(
    <div
      className="absolute pointer-events-none z-50 text-display-medium animate-coin-shows"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        animationDuration: `${duration}ms`,
        scale: `${styleProps.scale}`,
        translate: `${styleProps.translateX}px ${styleProps.translateY}px`,
        rotate: `${styleProps.rotate}deg`,
      }}
    >
      +{count}
    </div>,
    document.body
  );
};
