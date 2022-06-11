export const IDENTITY_POOL_ID = process.env.REACT_APP_IDENTITY_POOL_ID;
export const ALBUM_BUCKET_NAME = "mmci-album-01";
export const BUCKET_REGION = "us-east-1";

export const extractTitleFromUrl = (url) => {
	  let title = decodeURIComponent(url);
    return title.slice(title.lastIndexOf("/") + 1, -4);
}