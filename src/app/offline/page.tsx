import { WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="section-container flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <div className="glass mb-6 flex h-16 w-16 items-center justify-center rounded-full">
        <WifiOff className="h-7 w-7 text-muted-foreground" />
      </div>
      <h1 className="font-heading text-2xl font-semibold">You&apos;re offline</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        It looks like there&apos;s no internet connection. Once you&apos;re back online, this page will reconnect automatically.
      </p>
    </div>
  );
}
