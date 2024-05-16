export default function OurAimsCard({
  children,
  title,
  desc,
}: {
  children: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <>
      <div className="flex gap-4 justify-start items-start flex-col w-full py-16 px-12 bg-[#E1E8FF]">
        {children}
        <div>
          <div className="text-[20px] font-medium">{title}</div>
          <div className="text-[14px]">{desc}</div>
        </div>
      </div>
    </>
  );
}
