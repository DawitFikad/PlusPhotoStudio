"use client";

import { useState } from "react";
import { STUDIO, mapsHref } from "@/lib/studio";
import { IconClock, IconNav, IconPin } from "./icons";

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10;
}

export function StudioLocationWidget() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ lat: number; lng: number; km: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function locate() {
    if (!navigator.geolocation) {
      setError("Location is not available on this device.");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setUser({
          lat,
          lng,
          km: haversine(lat, lng, STUDIO.coords.lat, STUDIO.coords.lng),
        });
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        setError(
          err.code === err.PERMISSION_DENIED
            ? "Location was declined. Use the map pin to navigate to Bole."
            : "Could not read your position. Open maps with our coordinates instead."
        );
      },
      { timeout: 12000, enableHighAccuracy: true }
    );
  }

  return (
    <div className="frame-card p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[rgba(239,230,214,0.1)]">
        <div>
          <p className="kicker mb-2">Location access</p>
          <h3 className="display text-3xl">Find the Bole studio</h3>
          <p className="mt-1 text-sm text-[#8a7f70]">
            {STUDIO.landmark} · {STUDIO.coordsLabel}
          </p>
        </div>
        <button type="button" onClick={locate} disabled={loading} className="btn btn-fill shrink-0">
          <IconNav size={14} />
          {loading ? "Reading GPS…" : "Measure my distance"}
        </button>
      </div>

      {user && (
        <div className="mt-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[rgba(196,163,90,0.3)] p-4">
          <p className="text-sm">
            You are about{" "}
            <span className="font-mono text-[#c4a35a]">{user.km} km</span> from the studio.
            {user.km <= 20
              ? ` Roughly ${Math.max(8, Math.round(user.km * 2.2))} minutes in typical Addis traffic.`
              : " We also travel for destination work across Ethiopia."}
          </p>
          <a
            href={mapsHref({ lat: user.lat, lng: user.lng })}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-line shrink-0"
          >
            Directions
          </a>
        </div>
      )}

      {error && <p className="mt-4 text-xs text-amber-200/90">{error}</p>}

      <div className="mt-6 grid sm:grid-cols-3 gap-3">
        <div className="border border-[rgba(239,230,214,0.1)] p-4 flex gap-3">
          <IconPin className="text-[#c4a35a] shrink-0" />
          <div>
            <p className="font-mono text-[0.6rem] tracking-widest uppercase text-[#c9bba6]">Coordinates</p>
            <p className="font-mono text-xs mt-1">{STUDIO.coordsLabel}</p>
          </div>
        </div>
        <div className="border border-[rgba(239,230,214,0.1)] p-4 flex gap-3">
          <IconClock className="text-[#c4a35a] shrink-0" />
          <div>
            <p className="font-mono text-[0.6rem] tracking-widest uppercase text-[#c9bba6]">Hours</p>
            <p className="text-xs mt-1">{STUDIO.hours}</p>
          </div>
        </div>
        <a
          href={mapsHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-[rgba(239,230,214,0.1)] p-4 flex gap-3 hover:border-[#c4a35a] transition-colors"
        >
          <IconNav className="text-[#c4a35a] shrink-0" />
          <div>
            <p className="font-mono text-[0.6rem] tracking-widest uppercase text-[#c9bba6]">Map</p>
            <p className="text-xs mt-1">Open in Google Maps</p>
          </div>
        </a>
      </div>
    </div>
  );
}
