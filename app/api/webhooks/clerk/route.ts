/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import {
  WebhookEvent,
  UserJSON,
  DeletedObjectJSON,
} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text();

    const svixId = req.headers.get("svix-id");
    const svixTimestamp = req.headers.get("svix-timestamp");
    const svixSignature = req.headers.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      return new NextResponse("Missing required Svix headers", { status: 400 });
    }

    const webhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

    if (!webhookSecret) {
      return new NextResponse("Webhook secret not configured", { status: 500 });
    }

    const wh = new Webhook(webhookSecret);

    let event: WebhookEvent;

    try {
      event = wh.verify(payload, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Webhook verification failed:", err);
      return new NextResponse("Invalid signature", { status: 401 });
    }

    switch (event.type) {
      case "user.created":
        await handleUserCreated(event.data as UserJSON);
        break;

      case "user.updated":
        await handleUserUpdated(event.data as UserJSON);
        break;

      case "user.deleted":
        await handleUserDeleted(event.data as DeletedObjectJSON);
        break;

      default:
        console.log(`Unhandled Clerk webhook event: ${event.type}`);
    }

    return new NextResponse(`Processed event: ${event.type}`, { status: 200 });
  } catch (error) {
    console.error("Clerk Webhook Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

async function handleUserCreated(user: UserJSON) {
  const email = user.email_addresses?.[0]?.email_address || "";

  await prisma.user.upsert({
    where: {
      clerkId: user.id,
    },
    update: {
      email,
      firstName: user.first_name || "",
      lastName: user.last_name || "",
      imageUrl: user.image_url || "",
    },
    create: {
      clerkId: user.id,
      email,
      firstName: user.first_name || "",
      lastName: user.last_name || "",
      imageUrl: user.image_url || "",
      isFirstTimeUser: true,
    },
  });
}

async function handleUserUpdated(user: UserJSON) {
  const email = user.email_addresses?.[0]?.email_address || "";

  await prisma.user.upsert({
    where: {
      clerkId: user.id,
    },
    update: {
      email,
      firstName: user.first_name || "",
      lastName: user.last_name || "",
      imageUrl: user.image_url || "",
      updatedAt: new Date(),
    },
    create: {
      clerkId: user.id,
      email,
      firstName: user.first_name || "",
      lastName: user.last_name || "",
      imageUrl: user.image_url || "",
      isFirstTimeUser: true,
    },
  });
}

async function handleUserDeleted(user: DeletedObjectJSON) {
  if (!user.id) return;

  await prisma.user.deleteMany({
    where: {
      clerkId: user.id,
    },
  });
}
