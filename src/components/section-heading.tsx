export default function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <h2 className={`text-[30px] font-medium  w-full ${className}`}>
          {children}
        </h2>
        <hr className="border-black" />
      </div>
    </>
  );
}
