import EYE_ICON from "./assets/eye-icon.png";
import EYE_ICON_HIDE from "./assets/eye-icon-hide.png";

export const IDENTITY_POOL_ID = process.env.REACT_APP_IDENTITY_POOL_ID;
export const ALBUM_BUCKET_NAME = "mmci-album-01";
export const BUCKET_REGION = "us-east-1";
export const BUCKET_FOLDER = "album1";

export const extractTitleFromUrl = (url) => {
  let title = decodeURIComponent(url);
  return title.slice(title.lastIndexOf("/") + 1, -4);
};

export const AVATARS = [
  "dark0.png",
  "dark1.png",
  "dark2.png",
  "dark3.png",
  "dark4.png",
  "dark5.png",
  "dark6.png",
  "dark7.png",
  "dark8.png",
  "dark9.png",
  "dark10.png",
  "dark11.png",
  "dark12.png",
  "dark13.png",
  "dark14.png",
  "dark15.png",
  "dark16.png",
  "dark17.png",
  "dark18.png",
  "dark19.png",
  "dark20.png",
  "dark21.png",
  "dark22.png",
  "dark23.png",
  "dark24.png",
  "dark25.png",
  "dark26.png",
  "dark27.png",
];

export const AVATAR_COUNT = 28;

export const EYE_ICONS = {
  SHOW: EYE_ICON,
  HIDE: EYE_ICON_HIDE,
};

export const PASSWORD_RULES = `
Password must be 8-20 characters, including at least one capital letter, at least one small letter,
one number and one special character -!@#$%^&*()_+
`;
