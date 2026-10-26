import WaitlistPage, { waitlistMetadata } from "@/components/registration/WaitlistPage";

export const metadata = waitlistMetadata("zh");

export default function WaitlistPageZh() {
  return <WaitlistPage locale="zh" />;
}
