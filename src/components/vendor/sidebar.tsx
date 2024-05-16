import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusCircle, UserRound } from "lucide-react";
import { Home } from "lucide-react";
import { Pencil } from "lucide-react";
import { currentUser } from "@clerk/nextjs";
import User from "@/schemas/server/user-schema";
import connectDB from "@/lib/db-connect";
import { BusinessNameForm } from "./business-name-form";
import checkAndMake from "@/lib/check-and-make";
export default async function Sidebar() {
  await connectDB();

  const user = await currentUser();
  await checkAndMake(user?.emailAddresses[0].emailAddress);
  const res = await User.findOne(
    {
      "userInfo.userEmail": user?.emailAddresses[0].emailAddress,
    },
    { _id: 0, businessInfo: 1 }
  );
  // console.log(
  //   "printing business name in sidebar",
  console.log(res);
  return (
    <>
      <div className="w-[18vw] h-screen  bg-primary px-4 flex flex-col justify-between text-white">
        <div className="w-full gap-4 flex justify-center items-center text-left py-10 border-b border-white font-extrabold text-4xl">
          <span>{res.businessInfo.businessName}</span>
          <Dialog>
            <DialogTrigger>
              <Pencil className="  "></Pencil>
            </DialogTrigger>
            <DialogContent>
              <BusinessNameForm></BusinessNameForm>
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-3 py-8  h-full text-white">
          <Link href="/vendor" className="flex w-full justify-start items-start ">
            <Button className="text-2xl flex justify-start w-full gap-4 hover:bg-white hover:text-primary">
              <Home className="h-18 w-18"></Home>
              Home
            </Button>
          </Link>
          <Link
            href="/vendor/add-product"
            className="w-full flex justify-start items-start gap-8"
          >
            <Button className="text-2xl w-96 flex justify-start gap-4 hover:bg-white hover:text-primary">
              <PlusCircle className="h-18 w-18"></PlusCircle>
              Add Product
            </Button>
          </Link>

          <Link
            href="/vendor/see-buyers"
            className="flex justify-start w-full items-start gap-8"
          >
            <Button className="text-2xl w-full flex justify-start gap-4 hover:bg-white hover:text-primary">
              <UserRound className="h-18 w-18"></UserRound>
              See Buyers
            </Button>
          </Link>
        </div>

        <div className="flex  justify-start items-center gap-4 pb-5">
          <UserButton></UserButton>
          <Link href="/user">
            <Button className="bg-black hover:bg-black text-white">
              switch to buying
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
