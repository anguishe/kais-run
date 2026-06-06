export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5399156622542127"
        crossOrigin="anonymous"
      />
      {children}
    </>
  );
}
