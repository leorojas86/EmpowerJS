class ImageService {

  saveImage(id, imageData) {
    return ApiClient.instance.storageService.saveData(`image_${id}.jpg`, imageData, 'image/jpeg');
  }

  getImage(id) {
    return ApiClient.instance.storageService.getData(`image_${id}.jpg`);
  }

}
