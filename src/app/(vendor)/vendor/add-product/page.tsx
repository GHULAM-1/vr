import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/user/product-card";
import User from "@/schemas/server/user-schema";
import { currentUser } from "@clerk/nextjs";
import { AddProductForm } from "@/components/vendor/add-product-form";
import connectDB from "@/lib/db-connect";
import {nanoid} from "nanoid"
export default async function AddProducts() {
  await connectDB();
  const user = await currentUser();
  const products = await User.findOne(
    { "userInfo.userEmail": user?.emailAddresses[0].emailAddress },
    { _id: 0, myProducts: 1 }
  );

  return (
    <>
      <div className=" p-6 w-full">
        <div >
          <div className=" text-5xl font-extrabold flex flex-col justify-center items-center my-2">
            <div>Add Product</div>
            <div>
              <Dialog>
                <DialogTrigger>
                  <Button >Add Products</Button>
                </DialogTrigger>
                <DialogContent>
                  <AddProductForm></AddProductForm>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="my-4">
          <div className="text-3xl font-extrabold text-primary">Registered Items</div>
        </div>

        <div className="flex gap-4 flex-wrap">
          {products.myProducts.map((product: any) => {
            return (
              <ProductCard
                key={nanoid()}
                desc={product.ProductDesc}
                name={product.productName}
                price={product.productPrice}
                url={product.productUrl}
                isVR={product.isVR}
              ></ProductCard>
            );
          })}
        </div>
      </div>
    </>
  );
}
