import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] pt-28 flex items-center">
      <div className="shell text-center max-w-xl mx-auto py-16">
        <p className="kicker justify-center mb-4">404</p>
        <h1 className="display text-5xl sm:text-7xl">This frame is empty</h1>
        <p className="mt-4 text-sm text-[#8a7f70]">The page moved, or it was never exposed.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-fill">
            Home
          </Link>
          <Link href="/portfolio" className="btn btn-line">
            Work
          </Link>
        </div>
      </div>
    </div>
  );
}
