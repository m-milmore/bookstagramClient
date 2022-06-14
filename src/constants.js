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

export const AVATAR_COUNT = 28;

export const EYE_ICONS = {
  SHOW: EYE_ICON,
  HIDE: EYE_ICON_HIDE,
};

export const PASSWORD_RULES = `
Password must be 8-20 characters, including at least one capital letter, at least one small letter,
one number and one special character -!@#$%^&*()_+
`;
