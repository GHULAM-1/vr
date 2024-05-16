import connectdb from "@/lib/db-connect";
import { currentUser } from "@clerk/nextjs";
import User from "@/schemas/server/user-schema";
export default async function giveAProduct(productID: string) {
  try {
    await connectdb();
    console.log("giving a product ");
    const user = await currentUser();
    console.log("testing user Email : ", user?.emailAddresses[0].emailAddress);
    const res = await User.findOne(
      {
        userEmail: user?.emailAddresses[0].emailAddress,
        "myProducts._id": productID,
      },
      {
        "myProducts.$": 1,
      }
    );
    if (!res) {
      console.log("cant retrieve a user product");
      return;
    }
    return res.builds;
  } catch (error) {
    console.log("ERROR WHILE RETRIEVING A PRODUCT : ", error);
  }
}
