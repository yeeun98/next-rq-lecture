
export default function AfterLoginLayout({
    children, 
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div>
        로그인 후 레이아웃
          {children}
      </div>
    );
  }