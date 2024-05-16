import ThreeARHitTest from "@/components/3d-loader";
export default function productAR({
  params,
}: {
  params: { productID: string };
}) {
  return (
    <>
      {/* <div>productID</div>
      <div>{params.productID}</div> */}
      {/* <ThreeARHitTest modelUrl="https://res.cloudinary.com/demo/image/upload/DamagedHelmet3D.glb" /> */}
      <ThreeARHitTest modelUrl="https://res.cloudinary.com/gamma1199/image/upload/v1715852588/Desk_a6sgmz.glb"></ThreeARHitTest>
    </>
  );
}
