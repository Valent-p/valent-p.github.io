import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-8 bg-[#020617]">
      <div className="glass p-12 max-w-lg w-full">
        <h1 className="text-9xl font-black text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
        <p className="text-slate-400 mb-10 text-lg">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary px-8">
          Return Home
        </Link>
      </div>
    </div>
  );
}
