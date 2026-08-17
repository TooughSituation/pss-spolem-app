"use client";

import { useEffect } from "react";
import Link from "next/link";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { storeTypeLabel, USER_LOCATION } from "@/lib/data/stores";
import type { Store } from "@/lib/types";
import "leaflet/dist/leaflet.css";

function pinIcon(color: string) {
  return L.divIcon({
    className: "spolem-pin",
    html: `<span style="display:block;width:22px;height:22px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${color};border:2px solid #fff;box-shadow:0 2px 6px rgba(0,53,102,0.35)"></span>`,
    iconSize: [22, 22],
    iconAnchor: [11, 22],
    popupAnchor: [0, -22],
  });
}

const storeIcon = pinIcon("#0055A4");
const barIcon = pinIcon("#DC3545");
const userIcon = pinIcon("#28A745");

function FitBounds({ stores }: { stores: Store[] }) {
  const map = useMap();

  useEffect(() => {
    if (!stores.length) {
      map.setView([USER_LOCATION.lat, USER_LOCATION.lng], 13);
      return;
    }
    const bounds = L.latLngBounds(
      stores.map((store) => [store.lat, store.lng] as [number, number]),
    );
    bounds.extend([USER_LOCATION.lat, USER_LOCATION.lng]);
    map.fitBounds(bounds, { padding: [28, 28], maxZoom: 14 });
  }, [map, stores]);

  return null;
}

function FocusStore({ store }: { store?: Store }) {
  const map = useMap();

  useEffect(() => {
    if (!store) return;
    map.flyTo([store.lat, store.lng], 15, { duration: 0.45 });
  }, [map, store]);

  return null;
}

export function StoresMap({
  stores,
  selectedId,
  onSelect,
}: {
  stores: Store[];
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  const selected = stores.find((store) => store.id === selectedId);

  return (
    <div className="relative z-0 mx-4 h-56 overflow-hidden rounded-xl border border-border">
      <MapContainer
        center={[USER_LOCATION.lat, USER_LOCATION.lng]}
        zoom={13}
        className="h-full w-full"
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds stores={stores} />
        <FocusStore store={selected} />
        <Marker position={[USER_LOCATION.lat, USER_LOCATION.lng]} icon={userIcon}>
          <Popup>Twoja lokalizacja (demo)</Popup>
        </Marker>
        {stores.map((store) => (
          <Marker
            key={store.id}
            position={[store.lat, store.lng]}
            icon={store.type === "bar" ? barIcon : storeIcon}
            eventHandlers={{
              click: () => onSelect(store.id),
            }}
          >
            <Popup>
              <div className="min-w-[140px] text-sm">
                <p className="font-semibold">{store.name}</p>
                <p className="text-xs text-text-secondary">
                  {storeTypeLabel[store.type]} · {store.address}
                </p>
                <Link
                  href={`/sklepy/${store.id}`}
                  className="mt-1 inline-block font-semibold text-primary"
                >
                  Szczegóły
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
