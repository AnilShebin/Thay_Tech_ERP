// AuthForm.tsx (Server-side component)
import Image from "next/image";
import Link from "next/link";
import AuthFormClient from "@/components/shared/AuthFormClient";

const AuthForm = () => {
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Jothilingam logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Jothilingam
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            Sign In
            <p className="text-16 font-normal text-gray-600">
              Please enter your details
            </p>
          </h1>
        </div>
      </header>

      <AuthFormClient />
    </section>
  );
};

export default AuthForm;
