/** Valores de uma conversão a partir do preço do par e da taxa da plataforma. */
export function computeSwap(amount: number, price: number, feeRate: number) {
  const gross = amount * price;
  const fee = gross * feeRate;
  const net = gross - fee;
  return { gross, fee, net, effectivePrice: amount > 0 ? net / amount : 0 };
}
