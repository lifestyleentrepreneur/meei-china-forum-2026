import WaitlistPage, { waitlistMetadata } from "@/components/registration/WaitlistPage";

export const metadata = waitlistMetadata("en");

export default function WaitlistPageEn() {
  return <WaitlistPage locale="en" />;
}
