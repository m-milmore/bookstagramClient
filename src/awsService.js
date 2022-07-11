import AWS from "aws-sdk";
import {
  IDENTITY_POOL_ID,
  ALBUM_BUCKET_NAME,
  BUCKET_REGION,
  BUCKET_FOLDER,
} from "./constants";

AWS.config.update({
  region: BUCKET_REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID,
  }),
});

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: ALBUM_BUCKET_NAME },
});

const albumName = BUCKET_FOLDER;
export class AWSService {
  async viewAlbum(albumName) {
    return new Promise(async (success, failure) => {
      const href = "https://" + ALBUM_BUCKET_NAME + ".s3.amazonaws.com/";
      const albumPhotosKey = encodeURIComponent(albumName) + "/";
      try {
        await s3.listObjectsV2({ Prefix: albumPhotosKey }, (err, data) => {
          if (err) {
            failure({ error: "There was an error viewing your album" });
          }
          let photoUrls = data.Contents.map((photo) => ({
            photoUrl: href + encodeURIComponent(photo.Key),
            lastModified: photo.LastModified,
            eTag: photo.ETag,
          }));
          photoUrls = photoUrls.filter(
            (photo) => photo.photoUrl.charAt(photo.photoUrl.length - 4) === "."
          );
          success({ photoUrls });
        });
      } catch (error) {
        failure(error);
      }
    });
  }

  async addPhoto(files) {
    if (!files.length) {
      return alert("Please choose a file to upload first.");
    }
    const file = files[0];
    const fileName = file.name;
    const albumPhotosKey = encodeURIComponent(albumName) + "/";

    const photoKey = albumPhotosKey + fileName;

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: ALBUM_BUCKET_NAME,
        Key: photoKey,
        Body: file,
      },
    });

    const promise = upload.promise();

    try {
      await promise.then(
        (data) => {
          alert("Successfully uploaded photo.");
          console.log("data location in addPhoto in awsService", data.Location);
          return data.Location;
        },
        (err) => {
          return alert(
            "There was an error uploading your photo: ",
            err.message
          );
        }
      );
    } catch (error) {
      throw error;
    }
  }
}
