import type { NextApiRequest, NextApiResponse } from 'next'
import { PushAPI } from "@pushprotocol/restapi";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";

import { polygonMumbai } from "viem/chains";
// import * as dotenv from "dotenv";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
// dotenv.config();

const sendNotification = async () => {
  const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`);

  const client = createWalletClient({
    account,
    chain: polygonMumbai,
    transport: http(process.env.RPC_URL),
  });

  const userAlice = await PushAPI.initialize(client, { env: ENV.STAGING });
  const sendNotifRes = await userAlice.channel.send(["*"], {
    notification: { title: "am I receiving", body: "this test notificaiton?" },
  });
  return sendNotifRes;
};
 
export default async function executeNotification(
) {
  await sendNotification();

}