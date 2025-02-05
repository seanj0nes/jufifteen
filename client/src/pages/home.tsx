import { HeroSection } from "@/components/hero-section";
import { RsvpForm } from "@/components/rsvp-form";
import { LocationMap } from "@/components/location-map";
import { DressCode } from "@/components/dress-code";
import { GiftRegistry } from "@/components/gift-registry";
import { Countdown } from "@/components/countdown";
import { useEffect } from "react";
import { setupBackgroundAudio } from "@/lib/audio";

export default function Home() {
  useEffect(() => {
    const cleanup = setupBackgroundAudio();
    return () => cleanup();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <div className="container mx-auto px-4 py-8 space-y-16">
        <Countdown date="2024-07-15T18:00:00" />
        <RsvpForm />
        <LocationMap />
        <DressCode />
        <GiftRegistry />
      </div>
    </div>
  );
}
