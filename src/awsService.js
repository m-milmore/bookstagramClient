import AWS from "aws-sdk";
import {
  IDENTITY_POOL_ID,
  ALBUM_BUCKET_NAME,
  BUCKET_REGION,
  BUCKET_FOLDER,
} from "./constants";
import { EventEmitter } from "fbemitter";

export const progressEmitter = new EventEmitter();

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
    }).on("httpUploadProgress", (progress) => {
      progressEmitter.emit("progress", progress);
    });

    const promise = upload.promise();

    try {
      const data = await promise.then(
        (data) => {
          return data.Location;
        },
        (err) => {
          alert(
            "There was an error uploading your photo: ",
            err.message
          );
          return err
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteBook(url) {
    if (!url) {
      return alert("No url. Can't delete book.");
    }

    const filename = url.substring(url.lastIndexOf("/") + 1);

    const params = {
      Bucket: ALBUM_BUCKET_NAME,
      Key: albumName + "/" + filename,
    };

    try {
      await s3.deleteObject(params, (err, data) => {
        if (err) console.error(err, err.stack)
        else console.log("Response : ", data)
      });
      console.log("Book deleted on s3 successfully!");
    } catch (error) {
      console.error("delete s3 error : ", error);
      throw error;
    }
  }
}
