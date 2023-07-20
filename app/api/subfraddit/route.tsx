import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubfrandditValidator } from "@/lib/validators/subreddit";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }
    const body = await req.json()
    const { name } = SubfrandditValidator.parse(body)

    const subfrandditExists = await db.subfranddit.findFirst({
      where: {
        name,
      },
    })

    if (subfrandditExists) {
      return new Response('SubFranddit already exists', { status: 409 })
    }

    // create and associate it with the user
    const subfranddit = await db.subfranddit.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    })

    await db.subscription.create({
      data: {
        userId: session.user.id,
        subfrandditId: subfranddit.id,
      }
    })

    return new Response(subfranddit.name);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not create subreddit', { status: 500 })
  }
}