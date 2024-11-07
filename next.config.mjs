/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "avatar.iran.liara.run",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "avatars.githubusercontent.com",
          pathname: "/**",
        },
      ],
      unoptimized: true,
    },
  };
  
  export default nextConfig;
  