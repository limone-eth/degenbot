import {NeynarAPIClient} from "@neynar/nodejs-sdk";

export const publishCast = async (text: string, embedUrl?: string) => {
  if (!process.env.ENABLE_FARCASTER) {
    return "0x";
  }
  if (!process.env.FARCASTER_API_KEY || !process.env.FARCASTER_SIGNER_UUID) {
    throw new Error(
      "FARCASTER_API_KEY and FARCASTER_SIGNER_UUID must be set in the environment"
    );
  }
  const signerUuid = process.env.FARCASTER_SIGNER_UUID as string;
  const client = new NeynarAPIClient(process.env.FARCASTER_API_KEY as string);
  const publishedCast = await client.publishCast(
    signerUuid,
    text,
    embedUrl
      ? {
          embeds: [{url: embedUrl}],
        }
      : {}
  );

  console.log(`New cast hash: ${publishedCast.hash}`);

  return publishedCast.hash;
};

export const replyToCast = async (existingCastHash: string, reply: string) => {
  if (!process.env.ENABLE_FARCASTER) {
    return "0x";
  }
  if (!process.env.FARCASTER_API_KEY || !process.env.FARCASTER_SIGNER_UUID) {
    throw new Error(
      "FARCASTER_API_KEY and FARCASTER_SIGNER_UUID must be set in the environment"
    );
  }
  const signerUuid = process.env.FARCASTER_SIGNER_UUID as string;
  const client = new NeynarAPIClient(process.env.FARCASTER_API_KEY as string);

  const publishedCast = await client.publishCast(signerUuid, reply, {
    replyTo: existingCastHash,
  });

  console.log(`Reply hash:${publishedCast.hash}`);

  return publishedCast.hash;
};
