import * as faceapi from 'face-api.js';
export const loadModels = () => {
    const MODEL_URL = "/models";
  
    return Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
    ]);
  };
export const detectFaces = async (image) => {
    if (!image) {
      return;
    }
  
    const imgSize = image.getBoundingClientRect();
    const displaySize = { width: imgSize.width, height: imgSize.height };
    if (displaySize.height === 0) {
      return;
    }
  
    const faces = await faceapi
      .detectAllFaces(image, new faceapi.TinyFaceDetectorOptions({ inputSize: 320 }))
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();
  
    return faceapi.resizeResults(faces, displaySize);
};