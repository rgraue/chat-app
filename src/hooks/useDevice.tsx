import { useState, useEffect } from "react";

const MODILE_WIDTH = 700;

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const getDeviceType = (): "BROWSER" | "MOBILE" => {
  const { width } = getWindowDimensions();

  if (width < MODILE_WIDTH) {
    return "MOBILE";
  }

  return "BROWSER";
};

export const useDevice = () => {
  const [device, setDevice] = useState(getDeviceType());

  useEffect(() => {
    const handleResize = () => {
      setDevice(getDeviceType());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return device;
};
