class ImageServiceS3 {

  saveImage(id, imageData) {
    return S3.instance.saveData(`image_${id}.jpg`, imageData, 'image/jpeg');
  }

  getImage(id) {
    return S3.instance.getData(`image_${id}.jpg`);
  }

}
