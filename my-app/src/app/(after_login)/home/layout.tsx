
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      홈레이아웃
      {children}
    </div>
  );
}
