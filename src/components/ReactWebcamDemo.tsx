"use client";

import { useState } from "react";
import Webcam from "react-webcam";

export default function ReactWebcamDemo() {
  const [hasPermission, setHasPermission] = useState(false);

  return (
    <Webcam
      audio={false}
      onUserMedia={() => setHasPermission(true)}
      onUserMediaError={(e) => console.error("Camera access denied", e)}
    />
  );
}
