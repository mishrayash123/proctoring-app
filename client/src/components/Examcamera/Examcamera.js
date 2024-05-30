import { Camera } from "@mediapipe/camera_utils";
import { FaceDetection, Results } from "@mediapipe/face_detection";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import {
  b64toBlob,
  detectCheating,
  extractFaceCoordinates,
  getCheatingStatus,
  printLandmarks,
} from "./face-detection-helper";
import "./exam-camera.module.css";


const ExamCamera= () => {
  const [img_, setImg_] = useState();
  const webRef = useRef();
  const faceDetectionRef = useRef(null);
  const realtimeDetection = true;

  const frameRefresh = 30;
  let currentFrame = useRef(0);

  const [chetingStatus, setChetingStatus] = useState("");

  useEffect(() => {
    const faceDetection= new FaceDetection({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
      },
    });

    faceDetection.setOptions({
      minDetectionConfidence: 0.5,
      model: "short",
    });

    function onResult(result) {
      // TODO: Fix multiple toasts
      if (result.detections.length < 1) {
        // toast(
        //   "Face not detected, make sure your face is visible on the screen!"
        // );
        return;
      } else if (result.detections.length > 1) {
        // toast(
        //   "Detected more than one person in frame, can be flagged as cheating!"
        // );
        return;
      }

      const faceCoordinates = extractFaceCoordinates(result);

      // printLandmarks(result);

      const [lookingLeft, lookingRight] = detectCheating(
        faceCoordinates,
        false
      );

      const cheatingStatus = getCheatingStatus(lookingLeft, lookingRight);
      setChetingStatus(cheatingStatus);
      if(lookingRight || lookingLeft){
        localStorage.setItem("cheating",true);
      }
      else{
        localStorage.setItem("cheating",false);
      }
    }

    faceDetection.onResults(onResult);
    faceDetectionRef.current = faceDetection;
    

    if (webRef.current && webRef.current.video) {
      const camera = new Camera(webRef.current.video, {
        onFrame: async () => {
          // Proceed frames only if real time detection is on
          if (!realtimeDetection) {
            return;
          }

          currentFrame.current += 1;

          if (currentFrame.current >= frameRefresh) {
            currentFrame.current = 0;
            await faceDetection.send({ image: webRef.current.video });
          }
        },
        width: 1280,
        height: 720,
      });

      camera.start();
    }
    return () => {
      faceDetection.close();
    };
  }, [webRef, realtimeDetection]);

  const onResultClick = async () => {
    

    await faceDetectionRef?.current?.send({ image: webRef.current.video });
  };

  return (
    <div className="cameraContainer">
      <p className="cheatingStatus">Cheating status: {chetingStatus}</p>

        <Webcam
          style={{  height: '60vh', width: '60vw' }}
          className="camera"
          ref={webRef}
          screenshotFormat="image/jpeg"
        />

      <br />

      {/* <Button onClick={onResultClick}>Get Result</Button> */}

      {img_ && <img src={img_} alt="Profile" />}
    </div>
  );
};

export default ExamCamera; 