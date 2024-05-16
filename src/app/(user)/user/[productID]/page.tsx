export default function productAR({
  params,
}: {
  params: { productID: string };
}) {
  return (
    <>
      <div>productID</div>
      <div>{params.productID}</div>
    </>
  );
}
