import { createContext, useContext, useEffect, useState } from "react";
import type { Device } from "../types/types";

interface DeviceContextValue {
  device: Device;
}

const DeviceContext = createContext<DeviceContextValue | undefined>(undefined);

function getDeviceType(): Device {
  if (window == null) {
    return "desktop";
  }

  const width = window.outerWidth;
  if (width > 768) {
    return "desktop";
  }

  if (width > 360) {
    return "tablet";
  }

  return "mobile";
}

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [device, setDevice] = useState<Device>(() => getDeviceType());

  useEffect(() => {
    const handleResize = () => setDevice(getDeviceType());

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <DeviceContext.Provider value={{ device }}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevice(): Device {
  const context = useContext(DeviceContext);

  if (!context) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }

  return context.device;
}
