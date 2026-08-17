"use client";

import { AppCard } from "@/components/design-system/app-card";
import { Switch } from "@/components/ui/switch";
import { useUser } from "@/lib/stores/user";

const notificationItems = [
  ["promotions", "Promocje i gazetka"],
  ["loyalty", "Punkty i e-bony"],
  ["orders", "Status zamówienia"],
  ["flyer", "Nowa gazetka"],
] as const;

export function SettingsSection() {
  const notifications = useUser((s) => s.profile.notifications);
  const setNotification = useUser((s) => s.setNotification);

  return (
    <section>
      <h2 className="mb-2 text-base font-bold">Ustawienia</h2>
      <AppCard>
        <p className="text-sm font-semibold">Powiadomienia</p>
        <div className="mt-3 space-y-3">
          {notificationItems.map(([key, label]) => (
            <div key={key} className="flex items-center justify-between gap-3">
              <label htmlFor={key} className="text-sm">
                {label}
              </label>
              <Switch
                id={key}
                checked={notifications[key]}
                onCheckedChange={(value) => setNotification(key, value)}
              />
            </div>
          ))}
        </div>
      </AppCard>
      <AppCard className="mt-2">
        <p className="text-sm font-semibold">Wygląd</p>
        <p className="mt-1 text-sm text-text-secondary">
          Motyw jasny (zgodny z marką PSS). Ciemny motyw będzie później.
        </p>
      </AppCard>
      <AppCard className="mt-2">
        <p className="text-sm font-semibold">Język</p>
        <p className="mt-1 text-sm text-text-secondary">Polski</p>
      </AppCard>
    </section>
  );
}
