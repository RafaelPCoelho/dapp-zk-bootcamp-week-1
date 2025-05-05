import { createPublicClient, http } from "viem";
import { polygonAmoy } from "viem/chains";

export const provider = createPublicClient({
  chain: polygonAmoy,
  transport: http(),
});
