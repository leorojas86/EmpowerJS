//https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-photo-album.html
//https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
class S3 {
    constructor(config) {
      AWS.config.update({
        region: config.bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({ IdentityPoolId:config.identityPoolId })
      });

      this.s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket:config.bucketName }
      });
    }

    saveItem(itemKey, data, contentType) {
      return new Promise((resolve, reject) => {
        this.s3.upload({
          Key:itemKey,
          Body:JSON.stringify(data),
          ACL:'public-read',
          ContentType:contentType
        }, (err, data) => {
          if (err) {
            reject(err);
          } else {
            Storage.set(itemKey, null);
            resolve();
          }
        });
      });
    }

    getItem(itemKey) {
      return new Promise((resolve, reject) => {
        const item = Storage.getObject(itemKey);
        if(item) {
          resolve(item);
        } else {
          this.s3.getObject({ Key:itemKey }, (err, data) => {
            if (err) {
              reject(err);
            } else {
              const itemJSON = data.Body.toString();
              resolve(JSON.parse(itemJSON));
              Storage.set(itemKey, itemJSON);
            }
           });
        }
      });
    }

    deleteItem(itemKey) {
      return new Promise((resolve, reject) => {
        this.s3.deleteObject({Key: itemKey}, (err, data) => {
          if (err) {
            reject(err);
          } else {
            Storage.set(itemKey, null);
            resolve();
          }
        });
      });
    }

    hasItem(itemKey) {
      return new Promise((resolve, reject) => {
        this.s3.headObject({Key: itemKey}, (err, metadata) => {
          if (err) {
            if(err.code === 'NotFound' || err.code === 'Forbidden') {
              resolve(false); //TODO: find the best way to handle this
            } else {
              reject(err);
            }
          } else {
            resolve(true);
          }
        });
      });
    }

}
