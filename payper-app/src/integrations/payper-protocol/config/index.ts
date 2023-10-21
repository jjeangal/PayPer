import { Address } from "../../../types";

const payperAddress: Address = '0xe3dd24b7336cc0eaab56614caefa53f43cf9c739';
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