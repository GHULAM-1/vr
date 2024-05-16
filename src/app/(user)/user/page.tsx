// Import necessary modules
import connectDB from "@/lib/db-connect";
import { currentUser } from "@clerk/nextjs";
import User from "@/schemas/server/user-schema";
import { ProductCard } from "@/components/user/product-card";
import { UserButton } from "@clerk/nextjs";
import { nanoid } from "nanoid";
import SectionHeading from "@/components/section-heading";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import CategoriesCard from "@/components/categories-card";
import BestSeller from "@/components/best-sellers-card";
import OurAimsCard from "@/components/our-aims-card";
import { Box } from "lucide-react";
import { Banknote } from "lucide-react";
import { Phone } from "lucide-react";
import { Lock } from "lucide-react";
import { Footer } from "@/components/footer";
import Hero from "@/components/marketing/hero";
export default async function UserPage() {
  await connectDB();

  const user = await currentUser();

  const productsWithUser = await User.aggregate([
    // Unwind the myProducts array to deconstruct the array elements
    { $unwind: "$myProducts" },
    // Project to include the userEmail for each product
    {
      $project: {
        _id: "$myProducts._id",
        businessName: "$businessInfo.businessName",
        productName: "$myProducts.productName",
        productDesc: "$myProducts.productDesc",
        productPrice: "$myProducts.productPrice",
        productUrl: "$myProducts.productUrl",
        isVR: "$myProducts.isVR",
      },
    },
  ]);

  console.log(productsWithUser);

  return (
    <>
      <div className="flex justify-start w-full max-w-[1440px] flex-col px-[72px]">
        <Hero />
        <SectionHeading>Hot Categories</SectionHeading>
        <div className="flex gap-4 mt-16 mb-16">
          <CategoriesCard imageUrl="https://s3-alpha-sig.figma.com/img/facd/d1b8/6ce2cbfd8d408dc0d223b351d871de2e?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TEC13v~Y7oWf7c7xyWWH24PvDWfFXQxY5WwwB98ygKjOrW9s~Y~JGrsgJZsopa~v6f92rIsJwLFdCXvhLSRXmETXJhx5S7HWHa58YoJFhrZkWyFAxJyi9dDKDc2afDiawjowCXrqg4tQ-VUglAzncvwx46OdQA0DFBKIyac4dk5vSF88OG8EXKvwxvkmkJcHByjB3gsEb3vWaD9iX2ddjRgTFIkiJrQGy3R8~D3FvjBGuxeYFl6u88bl1oqffEcFEhWo5Fix3zRet5LSI022VKJ56zq8YQP-lkE-~7ueNzrluMD2rF3walfCektc-d2DNFlNSOVvsMgwU~3vEhGHmQ__">
            Groceries
          </CategoriesCard>
          <CategoriesCard imageUrl="https://s3-alpha-sig.figma.com/img/2673/4251/942f7d5c599c5446727ba6357a28c08d?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EFqKh49VHZjx880jJwPpcMM7HHOLbSpuAQ1dlv3CI7L-Tjq9jIpMEypAHWf1sWUQhHQsQXaVd2-41A7hAs8sXC1RxLuFqAsqrhR2YZFCf5N1gxGtWjXAbqywHjEYDymfeLeo1ZYP-aS~Ufgs~sCKwDNgyNJh1FKXstzuCUwVHoKFKyWnBBy8kfcR3Rd1KojIedDQgQnE~LjylyTAT7asMCb0xCu2qw9eSBbBGP9ZJhWH-mcF08DK4rvgMX-04Y4i3n1w9SZKgQ8Xj3XL6poE2I9aEdNJ1WQ2Q4W9VNhGy5IZcShpi2VI0dXsKhzTwhVlHxXYyuYNRC4tAfy0wAEZ3Q__">
            Household Appliances
          </CategoriesCard>
          <CategoriesCard imageUrl="https://s3-alpha-sig.figma.com/img/f723/4949/ee2e56b4959f29d454b70e1e2e765e18?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TlkOh-rWnztw5PlTM3nEoem8Ol7by1uzkRo5X5RQAcPmRLO0DV~pO-laPJ41eNNo31lfUEJFRn4-Jh9P-tZFTFnA2VZKOW24~g9SGibkuI4qIAsE7xIgbsenNU6T858luZiUMrM~TN~riI~Hg5rnbcQ2mVMF9jsJ4DASZAMOf1ay-PqrGUy7n3vUb7r19HlNuUUJpropNqBhlFQOFJqhP9TZb6L43uat-PaorVrywbvjI4jh84k6cJ5HEaoutDCIVsviEnx4XY~AqrLGYBAjsoqHV1MJMLxvUXpDrNvV9TQdf0X-xP183n8EY-LrPoYbfk97gJZoTNa-2xn6HDfagw__">
            photography
          </CategoriesCard>
          <CategoriesCard imageUrl="https://s3-alpha-sig.figma.com/img/9d59/77ea/fc8aa60534c0e7775f95c6916c1c41b2?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cEUUzG8pbr439PCl8Lvbpj3AjUu9ntQuCLrotOjEt-bKvRGKTS7IR8hbJQPcEaAjW1xgko0wR8dXzsORw0YiLWNe7NIHzszxm5Qct0xPJjzDm~xVyfuKT~7N4CjZdMToHDVUZgW68ZpJ36DyBD4W6WlRPzLrsYdDwaO2XWrLM~vA9iQy9NZoKk~tZqnRd6yvlXCYRgChJIaOFxdEXn~bMynV3yq-uP1V7D6mx88GSAnGcgv1Jptky6QRDUS-QpLvIca~xFhBnB5ygOsdFQyupGwbOtxyL4r-wco~4ASTmN4jPSGO28Ov~yN5PAz~u74rRwYG2M5KMMNpv5y7F7kaVA__">
            fashion
          </CategoriesCard>
          <CategoriesCard imageUrl="https://s3-alpha-sig.figma.com/img/9316/2cd5/9870f34dfd082f4be49f3d798967195f?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gNAgfk5ucCe0jeTo23684FTVVunqIB0-lkZThbJwHNUJtf8QruiDwsrHaDq2A3GwnnEmUvyBi8MXjeSKN9dUF2S5oTMhVrXevs1rgJXqMoRgyzmgJ40M~SAj-IwY79zwblxWB8xoTf4fLoTDfeQ3DN8CDCKxUVYiTyzgyIiQwRn7u6BAx0tkmDIAw10IT3FbuyLSCHywebd0OfTZyueWPC4BRT0TMrct1Q3dsPDXMC2AAKsqJ7keuzzf~NhYxc1zsYNXFj0e2-4e2R6aqpgsy-MqMtn1-EHIlT-GNLxq7T7hCtEjuRqnZaJSDhm~jqADn283~Jz3J82sQe6QkeZz3w__">
            sports
          </CategoriesCard>
          <CategoriesCard imageUrl="https://s3-alpha-sig.figma.com/img/aeb6/1043/4cf9d421d718761aa7b660ba1bd4b177?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BxxmP0jLbmpJeNeJBs5HLYb5YZpxTCjVf2ROrR5dLYSPIxm3KbQ6Yu3A-VOcv~90X6Xt4qmCzLP0gDzUgaBHe~1ohp~kbOLri0CarEi~K2Ce2moN0K2k4gvjkxLokx1uZ0qOhS~FdxkIE9GIcJVFMRPChDI84T7tURDQJzHVxbJ9pZ5J3Qr8PX9KX2Nc9bITHMiMqzzIfthSHEvhuteHM4Jsmd5aSxOeRvenugesH3UPTyII4NsLAMQTVPAxQSoQw9wXjB1FHcqzVt-~u3NUZ3-fiIr6hagOhMjLyRQWr61SbA0Yr8gJSqNexHxH2djZjF8pY-ih2W24v3YneZt50w__">
            health
          </CategoriesCard>
        </div>
        <SectionHeading>Recommended For You</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 my-12">
          {productsWithUser.map((product) => (
            <ProductCard
              key={nanoid()}
              productID={product._id.toString()}
              businessName={product.businessName}
              name={product.productName}
              desc={product.productDesc}
              price={product.productPrice}
              url={product.productUrl}
              isVR={product.isVR}
            />
          ))}
        </div>
        <SectionHeading>Best Sellers</SectionHeading>
        <div className="flex gap-2 mt-8">
          <BestSeller
            brand="zara"
            price="35,000"
            imageUrl="https://s3-alpha-sig.figma.com/img/d1af/93c4/d088fdcc87910c7307843e4dbd414715?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SvkTkzo5lFvg~8I7CwD27sb1tN5gJi2mnDvh3LZVQy3c8XE22fivqgNBbk8vfM9ve-UuV95ZYhwuW61QDFyPp3Q7fFeYHD05sjyTokDHVhSErcyEIlQIKXxGx-9a6gQ0PILCptoeavEmNzUWpyGv1sy3t5Nq9e7rSOIlSMqNsBV9~ZFsZjIev-6pWt6DMTkluztsALeZIzQSpKb6kDhRr8OOEjAFeVF471TJDiCFsxVmzaYjm0rqN1U0Ga8-TcBWC1GTWPxUcCUKnRwfH6u-6THObtB2C97mLmvatkhivOC~RGIFMRGUmM3al~99IYwTvleH0Xw4B~zcNMLSnAVUsg__"
            title="RIBBED KNIT
POLO SHIRT"
          ></BestSeller>
          <BestSeller
            brand="Adidas"
            price="35,000"
            imageUrl="https://s3-alpha-sig.figma.com/img/9d85/8790/a595eb684fc94384cb3d6bbb16a18217?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fl77jkajWivd0TlGSMICae-4NjKo0PSetj-lm9UchX5crOBH1mcq8YtZeP0otqyvODb9-zjuibi3OzEHN7LfJ~uxnHBICc4PeTSGQv0jBh5T5pE60hZoX1idniquREJazeiJQpMISVZDbGlDNLAqa7la1Yn1MTgqm6gFIjhdM4zqk7U6Vgfrta-7PKk71xfuvDOP6xC4USpPev5KRQn~6pWeHKKUtGibxRbiAGz6NMDHuhvsTnWEJWjp5BOiZtWLsi8nqAogeDS-Z8b3bwZdFcYux0LJ6nKQSH6bZGaN0xO1rb9TgWeqhF5oy3APjy14DG6I-aB0pVIKyGSvw08DHQ__"
            title="STEEL METAL 
BOTTLE 1L
"
          ></BestSeller>
          <BestSeller
            brand="Samsung"
            price="150,000"
            imageUrl="https://s3-alpha-sig.figma.com/img/3ede/9f84/dad908161f0177e23caccc96fabb1815?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZJouVtCKYJV-fPEAy8IZ3m~sgQL3Qj99R59m0hEtn-iFuhaiuurw54YAYX12tPLVmR8KruNfqTAzq5CJ6L-O7q6qhba5VynY6LAO5LWTZI4RcCjR0QfajB9NYib9fDJBo8XoswFrUtn1-HB6vcMLMvsncSgbMy-~Ky3Xf1RNPznI06sD2iDQNquWgpP813k3h9nsKz6a5wY3u5fV0ldOahxNUafp1LeW17gvZb0YfXotYs~1y3rbW0dbKGhCbsmvpAhaCvKPTumVPQQSeUNUJ2E3yYRoJ-aRX51HWUhTC5GzxsSt8kRxOHO865tdkeDvjRRtOySbcQe5uzQTW4mpgQ__"
            title="Washing Machine
WA10CK4545BYRT
"
          ></BestSeller>
          <BestSeller
            brand="Apple"
            price="100,000"
            imageUrl="https://s3-alpha-sig.figma.com/img/3ede/9f84/dad908161f0177e23caccc96fabb1815?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZJouVtCKYJV-fPEAy8IZ3m~sgQL3Qj99R59m0hEtn-iFuhaiuurw54YAYX12tPLVmR8KruNfqTAzq5CJ6L-O7q6qhba5VynY6LAO5LWTZI4RcCjR0QfajB9NYib9fDJBo8XoswFrUtn1-HB6vcMLMvsncSgbMy-~Ky3Xf1RNPznI06sD2iDQNquWgpP813k3h9nsKz6a5wY3u5fV0ldOahxNUafp1LeW17gvZb0YfXotYs~1y3rbW0dbKGhCbsmvpAhaCvKPTumVPQQSeUNUJ2E3yYRoJ-aRX51HWUhTC5GzxsSt8kRxOHO865tdkeDvjRRtOySbcQe5uzQTW4mpgQ__"
            title="iphone 12
"
          ></BestSeller>
        </div>

        {/* <SectionHeading>#boughtfromxmart</SectionHeading> */}
        <div className="flex  mt-28 w-[98%]">
          <OurAimsCard title="Free Shipping" desc="order above 200$">
            <Box size={32} />
          </OurAimsCard>
          <OurAimsCard title="Money Back" desc="30 Days Guarrantee">
            <Banknote size={32} />
          </OurAimsCard>
          <OurAimsCard title="Secure Payments" desc="Secured by Stripe">
            <Lock size={32} />
          </OurAimsCard>
          <OurAimsCard title="24/7 support" desc="phone and email support">
            <Phone size={32} />
          </OurAimsCard>
        </div>
      </div>
    </>
  );
}
