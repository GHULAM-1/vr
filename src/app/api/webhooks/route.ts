import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import connectDB from "@/lib/db-connect";
import User from "@/schemas/server/user-schema";
export async function POST(req: Request) {
  let WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!process.env.NEXT_PUBLIC_API_URL) {
    WEBHOOK_SECRET = process.env.WEBHOOK_SECRET_LOCAL;
  }
  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }
  const payload = await req.json();
  const body = payload.data;

  const email = body.email_addresses[0].email_address;
  try {
    console.log("Email:", email);
    await connectDB();
    console.log("............................");
    const isUserExistRes = await User.findOne({
      "userInfo.userEmail": email,
    });
    if (!isUserExistRes) {
      await User.create({
        userInfo: {
          userEmail: email,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(JSON.stringify(body), {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);

  console.log(
    "-------------------------------------------------------------------------------------------"
  );

  return new Response("", { status: 200 });
}
