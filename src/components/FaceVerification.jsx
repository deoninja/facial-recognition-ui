import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "./FaceVerification.css"; // Import CSS file

const videoConstraints = {
  width: 480,
  height: 480,
  facingMode: "user",
};

const FaceVerification = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [verificationResult, setVerificationResult] = useState("");

  // Capture image from webcam
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  // Send the image to Face Verification API
  const verifyFace = async () => {
    if (!capturedImage) return alert("Capture an image first!");

    // Convert Base64 to Blob
    const blob = await fetch(capturedImage).then((res) => res.blob());
    const formData = new FormData();
    formData.append("image", blob);

    try {
      const response = await axios.post("YOUR_FACE_VERIFICATION_API_ENDPOINT", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setVerificationResult(response.data.message || "Face Verified Successfully!");
    } catch (error) {
      setVerificationResult("Verification Failed");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h2>Face Verification</h2>
      <div className="webcam-container">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="webcam"
        />
        <div className="face-outline"></div>
      </div>

      <button onClick={capture} className="btn capture-btn">Capture Image</button>

      {capturedImage && <img src={capturedImage} alt="Captured" className="captured-image" />}

      <button onClick={verifyFace} className="btn verify-btn">Verify Face</button>

      {verificationResult && <p className="result">{verificationResult}</p>}
    </div>
  );
};

export default FaceVerification;
