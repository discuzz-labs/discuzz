import Spinner from "../Spinner"

export default function Loading() {
  return (
    <div className="w-full h-[100vh] flex flex-col fixed z-10 top-0 left-0 gap-10 items-center justify-center">
      <Spinner />
      <p className="text-foreground font-extrabold text-xl">Please wait...</p>
    </div>
  );
}
