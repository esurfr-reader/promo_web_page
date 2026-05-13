/**
 * Localised image registry. Every image lives once per language under
 *   public/assets/<lng>/<filename>.png
 * Filenames stay identical across languages - only the text in the image
 * changes - so swapping a translated version is a drop-in replacement.
 *
 * Usage:
 *   const images = useLocalizedImages();
 *   <Image source={{ uri: images.heroPhoneScreenshot }} />
 *
 * Adding a language: copy /public/assets/en/ to /public/assets/<code>/,
 * add `<code>` to SUPPORTED_LNGS in src/i18n/i18n.ts, and add the
 * corresponding block to IMAGES_BY_LNG below. Every path is enumerated
 * statically so the build-time inliner (`scripts/inline.mjs`) can find
 * each literal `/assets/<lng>/<file>` string in the JS bundle and inline
 * its bytes for the single-file `index.bundle.html` output.
 */
import { useTranslation } from "react-i18next";
import type { Lng } from "../i18n/i18n";
import { SUPPORTED_LNGS } from "../i18n/i18n";

type ImageSet = {
  brandLogo: string;
  heroPhoneScreenshot: string;
  breaks: {
    openBeach: string;
    rightPoint: string;
    leftPoint: string;
    beachReef: string;
    outerReef: string;
    rivermouth: string;
    beachPier: string;
    breakwall: string;
  };
  canvasIcons: {
    me: string;
    house: string;
    tree: string;
    rocks: string;
    lifesaverTower: string;
    lifesaverFlag: string;
    walkingTrack: string;
    carpark: string;
    building: string;
  };
};

export const breakOrder = [
  "openBeach",
  "leftPoint",
  "rightPoint",
  "beachReef",
  "outerReef",
  "rivermouth",
  "beachPier",
  "breakwall",
] as const;

const FALLBACK: Lng = "en";

/**
 * Every path enumerated as a literal string. Do not refactor to template
 * literals - the inliner relies on these being static for single-file
 * builds. To change the file name for a key, change it in every block.
 */
export const IMAGES_BY_LNG: Record<Lng, ImageSet> = {
  en: {
    brandLogo: "/assets/en/12c4b12e-036f-4a66-8a82-35e5f1a28608.png",
    heroPhoneScreenshot: "/assets/en/648e3d49-2e40-4b3e-aaa1-d96c76acce73.png",
    breaks: {
      openBeach: "/assets/en/25208bdb-4867-4c1c-9c8c-7a55ddd0db8c.png",
      rightPoint: "/assets/en/5ba87af0-b88c-478a-b9dd-77576f4c53cb.png",
      leftPoint: "/assets/en/310506d8-9c56-45a8-8308-1811a3d1c20c.png",
      beachReef: "/assets/en/f84420de-93a6-44f3-9ef0-af31f3367bd0.png",
      outerReef: "/assets/en/9e70c2ff-cdcd-434b-8c4e-e7f556c7c941.png",
      rivermouth: "/assets/en/5be5aede-b7c0-468e-9ed6-5f3819683c3b.png",
      beachPier: "/assets/en/812e2014-f159-4f8e-82cd-b61d7420b57f.png",
      breakwall: "/assets/en/8bfb1224-ec2b-4341-9f91-3d1626fbb6c4.png",
    },
    canvasIcons: {
      me: "/assets/en/ba1b6696-1f83-4937-870c-88a7b8075f3d.png",
      house: "/assets/en/eca496b6-9507-4ffa-afb5-6e8b9343da1a.png",
      tree: "/assets/en/b18e82f5-02c0-4bfa-8676-e5f624223169.png",
      rocks: "/assets/en/e0ab7e8d-e0f8-4fbd-947f-f470a06eb1f9.png",
      lifesaverTower: "/assets/en/a721feee-b809-4e98-9340-94a8d917220a.png",
      lifesaverFlag: "/assets/en/746b7544-dd35-461e-962d-1b7dbbb7098a.png",
      walkingTrack: "/assets/en/5860a053-e0a8-4803-8491-0919dec8be69.png",
      carpark: "/assets/en/c4e98389-9af0-4f96-b45f-11e9b0d736f2.png",
      building: "/assets/en/86004d86-b69e-4511-bd2f-53b312f6f7aa.png",
    },
  },
  es: {
    brandLogo: "/assets/es/12c4b12e-036f-4a66-8a82-35e5f1a28608.png",
    heroPhoneScreenshot: "/assets/es/648e3d49-2e40-4b3e-aaa1-d96c76acce73.png",
    breaks: {
      openBeach: "/assets/es/25208bdb-4867-4c1c-9c8c-7a55ddd0db8c.png",
      rightPoint: "/assets/es/5ba87af0-b88c-478a-b9dd-77576f4c53cb.png",
      leftPoint: "/assets/es/310506d8-9c56-45a8-8308-1811a3d1c20c.png",
      beachReef: "/assets/es/f84420de-93a6-44f3-9ef0-af31f3367bd0.png",
      outerReef: "/assets/es/9e70c2ff-cdcd-434b-8c4e-e7f556c7c941.png",
      rivermouth: "/assets/es/5be5aede-b7c0-468e-9ed6-5f3819683c3b.png",
      beachPier: "/assets/es/812e2014-f159-4f8e-82cd-b61d7420b57f.png",
      breakwall: "/assets/es/8bfb1224-ec2b-4341-9f91-3d1626fbb6c4.png",
    },
    canvasIcons: {
      me: "/assets/es/ba1b6696-1f83-4937-870c-88a7b8075f3d.png",
      house: "/assets/es/eca496b6-9507-4ffa-afb5-6e8b9343da1a.png",
      tree: "/assets/es/b18e82f5-02c0-4bfa-8676-e5f624223169.png",
      rocks: "/assets/es/e0ab7e8d-e0f8-4fbd-947f-f470a06eb1f9.png",
      lifesaverTower: "/assets/es/a721feee-b809-4e98-9340-94a8d917220a.png",
      lifesaverFlag: "/assets/es/746b7544-dd35-461e-962d-1b7dbbb7098a.png",
      walkingTrack: "/assets/es/5860a053-e0a8-4803-8491-0919dec8be69.png",
      carpark: "/assets/es/c4e98389-9af0-4f96-b45f-11e9b0d736f2.png",
      building: "/assets/es/86004d86-b69e-4511-bd2f-53b312f6f7aa.png",
    },
  },
  pt: {
    brandLogo: "/assets/pt/12c4b12e-036f-4a66-8a82-35e5f1a28608.png",
    heroPhoneScreenshot: "/assets/pt/648e3d49-2e40-4b3e-aaa1-d96c76acce73.png",
    breaks: {
      openBeach: "/assets/pt/25208bdb-4867-4c1c-9c8c-7a55ddd0db8c.png",
      rightPoint: "/assets/pt/5ba87af0-b88c-478a-b9dd-77576f4c53cb.png",
      leftPoint: "/assets/pt/310506d8-9c56-45a8-8308-1811a3d1c20c.png",
      beachReef: "/assets/pt/f84420de-93a6-44f3-9ef0-af31f3367bd0.png",
      outerReef: "/assets/pt/9e70c2ff-cdcd-434b-8c4e-e7f556c7c941.png",
      rivermouth: "/assets/pt/5be5aede-b7c0-468e-9ed6-5f3819683c3b.png",
      beachPier: "/assets/pt/812e2014-f159-4f8e-82cd-b61d7420b57f.png",
      breakwall: "/assets/pt/8bfb1224-ec2b-4341-9f91-3d1626fbb6c4.png",
    },
    canvasIcons: {
      me: "/assets/pt/ba1b6696-1f83-4937-870c-88a7b8075f3d.png",
      house: "/assets/pt/eca496b6-9507-4ffa-afb5-6e8b9343da1a.png",
      tree: "/assets/pt/b18e82f5-02c0-4bfa-8676-e5f624223169.png",
      rocks: "/assets/pt/e0ab7e8d-e0f8-4fbd-947f-f470a06eb1f9.png",
      lifesaverTower: "/assets/pt/a721feee-b809-4e98-9340-94a8d917220a.png",
      lifesaverFlag: "/assets/pt/746b7544-dd35-461e-962d-1b7dbbb7098a.png",
      walkingTrack: "/assets/pt/5860a053-e0a8-4803-8491-0919dec8be69.png",
      carpark: "/assets/pt/c4e98389-9af0-4f96-b45f-11e9b0d736f2.png",
      building: "/assets/pt/86004d86-b69e-4511-bd2f-53b312f6f7aa.png",
    },
  },
  ja: {
    brandLogo: "/assets/ja/12c4b12e-036f-4a66-8a82-35e5f1a28608.png",
    heroPhoneScreenshot: "/assets/ja/648e3d49-2e40-4b3e-aaa1-d96c76acce73.png",
    breaks: {
      openBeach: "/assets/ja/25208bdb-4867-4c1c-9c8c-7a55ddd0db8c.png",
      rightPoint: "/assets/ja/5ba87af0-b88c-478a-b9dd-77576f4c53cb.png",
      leftPoint: "/assets/ja/310506d8-9c56-45a8-8308-1811a3d1c20c.png",
      beachReef: "/assets/ja/f84420de-93a6-44f3-9ef0-af31f3367bd0.png",
      outerReef: "/assets/ja/9e70c2ff-cdcd-434b-8c4e-e7f556c7c941.png",
      rivermouth: "/assets/ja/5be5aede-b7c0-468e-9ed6-5f3819683c3b.png",
      beachPier: "/assets/ja/812e2014-f159-4f8e-82cd-b61d7420b57f.png",
      breakwall: "/assets/ja/8bfb1224-ec2b-4341-9f91-3d1626fbb6c4.png",
    },
    canvasIcons: {
      me: "/assets/ja/ba1b6696-1f83-4937-870c-88a7b8075f3d.png",
      house: "/assets/ja/eca496b6-9507-4ffa-afb5-6e8b9343da1a.png",
      tree: "/assets/ja/b18e82f5-02c0-4bfa-8676-e5f624223169.png",
      rocks: "/assets/ja/e0ab7e8d-e0f8-4fbd-947f-f470a06eb1f9.png",
      lifesaverTower: "/assets/ja/a721feee-b809-4e98-9340-94a8d917220a.png",
      lifesaverFlag: "/assets/ja/746b7544-dd35-461e-962d-1b7dbbb7098a.png",
      walkingTrack: "/assets/ja/5860a053-e0a8-4803-8491-0919dec8be69.png",
      carpark: "/assets/ja/c4e98389-9af0-4f96-b45f-11e9b0d736f2.png",
      building: "/assets/ja/86004d86-b69e-4511-bd2f-53b312f6f7aa.png",
    },
  },
  fr: {
    brandLogo: "/assets/fr/12c4b12e-036f-4a66-8a82-35e5f1a28608.png",
    heroPhoneScreenshot: "/assets/fr/648e3d49-2e40-4b3e-aaa1-d96c76acce73.png",
    breaks: {
      openBeach: "/assets/fr/25208bdb-4867-4c1c-9c8c-7a55ddd0db8c.png",
      rightPoint: "/assets/fr/5ba87af0-b88c-478a-b9dd-77576f4c53cb.png",
      leftPoint: "/assets/fr/310506d8-9c56-45a8-8308-1811a3d1c20c.png",
      beachReef: "/assets/fr/f84420de-93a6-44f3-9ef0-af31f3367bd0.png",
      outerReef: "/assets/fr/9e70c2ff-cdcd-434b-8c4e-e7f556c7c941.png",
      rivermouth: "/assets/fr/5be5aede-b7c0-468e-9ed6-5f3819683c3b.png",
      beachPier: "/assets/fr/812e2014-f159-4f8e-82cd-b61d7420b57f.png",
      breakwall: "/assets/fr/8bfb1224-ec2b-4341-9f91-3d1626fbb6c4.png",
    },
    canvasIcons: {
      me: "/assets/fr/ba1b6696-1f83-4937-870c-88a7b8075f3d.png",
      house: "/assets/fr/eca496b6-9507-4ffa-afb5-6e8b9343da1a.png",
      tree: "/assets/fr/b18e82f5-02c0-4bfa-8676-e5f624223169.png",
      rocks: "/assets/fr/e0ab7e8d-e0f8-4fbd-947f-f470a06eb1f9.png",
      lifesaverTower: "/assets/fr/a721feee-b809-4e98-9340-94a8d917220a.png",
      lifesaverFlag: "/assets/fr/746b7544-dd35-461e-962d-1b7dbbb7098a.png",
      walkingTrack: "/assets/fr/5860a053-e0a8-4803-8491-0919dec8be69.png",
      carpark: "/assets/fr/c4e98389-9af0-4f96-b45f-11e9b0d736f2.png",
      building: "/assets/fr/86004d86-b69e-4511-bd2f-53b312f6f7aa.png",
    },
  },
};

function isSupported(lng: string): lng is Lng {
  return (SUPPORTED_LNGS as readonly string[]).includes(lng);
}

/** Resolve images for a specific language. */
export function getImages(lng: Lng): ImageSet {
  return IMAGES_BY_LNG[lng];
}

/** Reactive image set - re-renders when the user changes language. */
export function useLocalizedImages(): ImageSet {
  const { i18n } = useTranslation();
  const raw = (i18n.resolvedLanguage ?? i18n.language ?? FALLBACK).split("-")[0];
  const lng: Lng = isSupported(raw) ? raw : FALLBACK;
  return IMAGES_BY_LNG[lng];
}

export type { ImageSet };
