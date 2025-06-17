"use client";
import { useEffect } from "react";
import { analyticsPromise } from "@/lib/firebase";

export default function FirebaseAnalyticsProvider() {
  useEffect(() => {
    analyticsPromise.then(() => {});
  }, []);
  return null;
}
