import { AdSenseLoader } from "@/components/ui/AdSenseLoader";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AdSenseLoader />
    </>
  );
}
