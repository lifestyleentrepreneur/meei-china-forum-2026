import WaitlistPage, { waitlistMetadata } from "@/components/registration/WaitlistPage";

export const metadata = waitlistMetadata("fr");

export default function WaitlistPageFr() {
  return <WaitlistPage locale="fr" />;
}
