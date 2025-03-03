import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import SignatureCanvas from "react-signature-canvas";
import "./FaceVerification.css";

const FaceVerification = () => {
  const [showFaceModal, setShowFaceModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);
  const signatureRef = useRef(null);
  const [signatureImage, setSignatureImage] = useState(null);

  // Open and close modals
  const toggleFaceModal = () => setShowFaceModal(!showFaceModal);
  const toggleSignatureModal = () => setShowSignatureModal(!showSignatureModal);

  // Capture image from webcam
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    toggleFaceModal();
  };

  // Save signature as an image and close modal
  const saveSignature = () => {
    if (signatureRef.current.isEmpty()) {
      alert("Please sign before saving.");
      return;
    }
    setSignatureImage(signatureRef.current.toDataURL("image/png"));
    toggleSignatureModal(); // Close the modal after saving
  };

  // Clear the signature pad
  const clearSignature = () => {
    signatureRef.current.clear();
  };

  return (
    <div className="container">
      <h2>Face Verification & E-Signature</h2>

      {/* Buttons to Open Modals */}
      <button className="open-modal-btn" onClick={toggleFaceModal}>
        Open Face Verification
      </button>
      <button className="open-modal-btn" onClick={toggleSignatureModal}>
        Open E-Signature
      </button>

      {/* Face Verification Modal */}
      {showFaceModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-btn" onClick={toggleFaceModal}>&times;</span>
            <h3>Face Verification</h3>

            {/* Webcam Container */}
            <div className="webcam-container">
              <div className="webcam-wrapper">
                <Webcam 
                  ref={webcamRef} 
                  screenshotFormat="image/png" 
                  className="webcam"
                  videoConstraints={{
                    width: 1280,
                    height: 720,
                    facingMode: "user",
                  }}
                />
              </div>
            </div>
            <button className="capture-btn" onClick={captureImage}>
              Capture Face
            </button>
          </div>
        </div>
      )}

      {/* E-Signature Modal */}
      {showSignatureModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-btn" onClick={toggleSignatureModal}>&times;</span>
            <h3>Signature</h3>

            <div className="signature-container">
              <SignatureCanvas 
                ref={signatureRef}
                canvasProps={{ className: "signature-pad" }}
              />
              <div className="signature-buttons">
                <button className="clear-btn" onClick={clearSignature}>Clear</button>
                <button className="save-btn" onClick={saveSignature}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Display Captured Face & Signature */}
      {capturedImage && (
        <div>
          <h4>Captured Face:</h4>
          <img src={capturedImage} alt="Captured Face" className="captured-image" />
        </div>
      )}

      {signatureImage && (
        <div>
          <h4>Saved Signature:</h4>
          <img src={signatureImage} alt="Signature" className="signature-image" />
        </div>
      )}
    </div>
  );
};

export default FaceVerification;
