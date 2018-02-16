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

    saveItem(itemKey, item, contentType) {
      return this.saveData(itemKey, JSON.stringify(item), contentType);
    }

    getItem(itemKey) {
      return this.getData(itemKey)
        .then((data) => JSON.parse(data));
    }

    saveData(dataKey, data, contentType) {//TODO: do not cache images
      return new Promise((resolve, reject) => {
        this.s3.upload({
          Key:dataKey,
          Body:data,
          ACL:'public-read',
          ContentType:contentType
        }, (err, data) => {
          if (err) {
            reject(err);
          } else {
            Storage.remove(dataKey);
            resolve();
          }
        });
      });
    }

    getData(dataKey) {
      return new Promise((resolve, reject) => {//TODO: do not cache images
        const data = Storage.getData(dataKey);
        if(data) {
          resolve(data);
        } else {
          this.s3.getObject({ Key:dataKey }, (err, data) => {
            if (err) {
              reject(err);
            } else {
              const dataString = data.Body.toString();
              resolve(dataString);
              Storage.setData(dataKey, dataString);
            }
           });
        }
      });
    }

    deleteItem(itemKey) {
      return new Promise((resolve, reject) => {
        this.s3.deleteObject({ Key:itemKey }, (err, data) => {
          if (err) {
            reject(err);
          } else {
            Storage.remove(itemKey);
            resolve();
          }
        });
      });
    }

    hasItem(itemKey) {
      return new Promise((resolve, reject) => {
        this.s3.headObject({ Key:itemKey }, (err, metadata) => {
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
