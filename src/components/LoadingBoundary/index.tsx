import Spinner from "../Spinner";

export default function LoadingBoundary() {
  return (
    <div className="w-full h-full flex py-10 items-center justify-center">
      <div className="flex gap-5 items-center">
        <Spinner />
        <p className="text-foreground font-thin">Please wait...</p>
      </div>
    </div>
  );
}
