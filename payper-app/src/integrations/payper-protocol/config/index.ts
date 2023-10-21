import { Address } from "../../../types";

const payperAddress: Address = '0x186265192e01FFED6F844c947d4a528f6781b9ae';
const subgraphUrl = "https://api.thegraph.com/subgraphs/name/efesozen7/payper-test-1";
const articleNewsTypeMapping: Record<number, string> = {
  0: 'Politics',
  1: 'Economics',
  2: 'Sports',
  3: 'Tech',
  4: 'Business',
  5: 'Entertainment,'
}

export {
  payperAddress,
  subgraphUrl,
  articleNewsTypeMapping,
}