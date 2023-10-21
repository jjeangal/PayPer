function weiToEth(wei: bigint) {
  const ether = BigInt(wei) / BigInt(10)**BigInt(18);
  return Math.round(Number(ether));
}

export default weiToEth;