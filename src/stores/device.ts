import create from "vue-zustand";

interface Device {
    mobile: boolean;
    setDevice: (mobile: boolean) => void
}

export const useDeviceSet = create<Device>((set) => ({
    mobile: window.navigator.userAgent.includes('Mobile') ? false : true,
    setDevice: (mobile: boolean) => set({ mobile })
}))