import "./globals.css";

export const metadata = {
  title: "Link Shorter | KBK",
  description: "リンクをlink.kobakoo.comにします",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
