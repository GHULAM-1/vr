import { Footer } from "@/components/footer";
import Nav from "@/components/nav";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <section className=" flex justify-center items-center ">
        {children}
      </section>
      <Footer />
    </>
  );
}
