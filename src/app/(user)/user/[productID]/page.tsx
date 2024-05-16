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
      <ThreeARHitTest
        modelUrl="https://res.cloudinary.com/dlxtcvj93/raw/upload/v1715854199/rgcgzotbkv6xop3et9xm.glb
"
      ></ThreeARHitTest>
    </>
  );
}
