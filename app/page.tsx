import Link from "next/link";

export default function Home() {
  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-start px-16 md:px-32 py-8 md:py-16"
    >
      <h1 className="text-5xl font-bold italic">
        Video Sample
      </h1>

      <div className="h-full w-full flex-1 flex flex-col gap-8 items-center justify-center">
        <Link
          href={"/customPlayer"}
          className="text-3xl bg-red-500 hover:bg-red-600 transition-all rounded-lg px-4 py-2"
        >
          zoom
        </Link>

        <Link
          href={"/crop"}
          className="text-3xl bg-green-500 hover:bg-green-600 transition-all rounded-lg px-4 py-2"
        >
          crop
        </Link>

        <Link
          href={"/style"}
          className="text-center text-3xl bg-blue-500 hover:bg-blue-600 transition-all rounded-lg px-4 py-2"
        >
          style
        </Link>

        <Link
          href={"/quality"}
          className="text-3xl bg-yellow-500 hover:bg-yellow-600 transition-all rounded-lg px-4 py-2"
        >
          quality
        </Link>
      </div>
    </div>
  );
}
