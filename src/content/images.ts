/**
 * Centralised image registry. Every <img> on the page resolves through this
 * map so swapping an image is a one-line change. Drop your replacement file
 * into /public/assets/, then update the path here.
 */
export const images = {
  brandLogo: "/assets/12c4b12e-036f-4a66-8a82-35e5f1a28608.png",
  heroPhoneScreenshot: "/assets/648e3d49-2e40-4b3e-aaa1-d96c76acce73.png",
  breaks: {
    openBeach: "/assets/25208bdb-4867-4c1c-9c8c-7a55ddd0db8c.png",
    rightPoint: "/assets/5ba87af0-b88c-478a-b9dd-77576f4c53cb.png",
    leftPoint: "/assets/310506d8-9c56-45a8-8308-1811a3d1c20c.png",
    beachReef: "/assets/f84420de-93a6-44f3-9ef0-af31f3367bd0.png",
    outerReef: "/assets/9e70c2ff-cdcd-434b-8c4e-e7f556c7c941.png",
    rivermouth: "/assets/5be5aede-b7c0-468e-9ed6-5f3819683c3b.png",
    beachPier: "/assets/812e2014-f159-4f8e-82cd-b61d7420b57f.png",
    breakwall: "/assets/8bfb1224-ec2b-4341-9f91-3d1626fbb6c4.png",
  },
} as const;

export const breakOrder = [
  "openBeach",
  "rightPoint",
  "leftPoint",
  "beachReef",
  "outerReef",
  "rivermouth",
  "beachPier",
  "breakwall",
] as const;
