import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      {children}
      <div className="auth-asset">
        <Image
          src="/icons/auth-image.webp"
          alt="Auth image"
          width={500}
          height={500} 
          className="w-[100px] h-auto sm:w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px]"
        />
      </div>
    </main>
  );
}
