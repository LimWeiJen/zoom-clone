"use server"

import { currentUser } from "@clerk/nextjs"
import { StreamClient } from "@stream-io/node-sdk"

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
const apiSecret = process.env.NEXT_PUBLIC_STREAM_SECRET_KEY

export const tokenForUser = async () => {
  const user = await currentUser();

  if (!user || !apiKey || !apiSecret) throw new Error("Missing credentials");

  const client = new StreamClient(apiKey, apiSecret);

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60

  const issued = Math.floor(Date.now() / 1000 - 60)

  return client.createToken(user.id, exp, issued);
}
