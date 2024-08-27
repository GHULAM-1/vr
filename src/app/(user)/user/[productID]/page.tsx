import ThreeARHitTest from "@/components/3d-loader";
// import giveAProduct from "@/utils/give-a-product";
export default async function productAR({
  params,
}: {
  params: { productID: string };
}) {
  // if (!params.productID) {
  // return <div>${JSON.stringify(params)}</div>;
  // }

  // const res = await giveAProduct(params.productID);

  // if (!res) {
  // return <div>${JSON.string ify(res)}</div>;
  // }

  return (
    <>
      {/* <div>productID</div>
      <div>{params.productID}</div> */}
      {/* <ThreeARHitTest modelUrl="https://res.cloudinary.com/demo/image/upload/DamagedHelmet3D.glb" /> */}
      <ThreeARHitTest
        modelUrl="https://res.cloudinary.com/dlxtcvj93/raw/upload/v1715854199/rgcgzotbkv6xop3et9xm.glb
"
      ></ThreeARHitTest>
      {/* <ThreeARHitTest modelUrl={res.DModel}></ThreeARHitTest> */}
      {/* <div>ghulam</div> */}
      {/* <div>${JSON.stringify(res)}</div>; */}
    </>
  );
}
