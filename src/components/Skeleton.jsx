const Skeleton = ({
  height = "h-4",
  width = "w-full",
  pulse = false,
  circular
}) => {
  return (
    <div
      className={`${height} ${width} mt-2 bg-gray-200 ${
        circular ? "rounded-full" : "rounded-md"
      } ${pulse ? "animate-pulse" : ""}`}
    />
  );
};

export default Skeleton;
