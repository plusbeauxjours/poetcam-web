"use client";
import { useEffect } from "react";
import { analyticsPromise } from "@/firebase";

export default function FirebaseAnalyticsProvider() {
  useEffect(() => {
    analyticsPromise;
  }, []);
  return null;
}
