import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowDownUp, RefreshCw } from "lucide-react";
import { useBalance, useSwap } from "../../hooks/useWallet";
import { useSwapQuote } from "../../hooks/useSwapQuote";
import { getErrorMessage } from "../../services/api";
import type { Asset, SwapResult } from "../../types/transaction";
import { assetMeta, formatFeePercent, formatRate, parseAmountInput, toAmountInput } from "../../utils/assets";
import { formatAmount } from "../../utils/format";
import { computeSwap } from "../../utils/swap";
import AssetAmountBox from "./AssetAmountBox";
import SwapSummary from "./SwapSummary";
import BalanceImpact from "./BalanceImpact";
import ConfirmSwapModal from "./ConfirmSwapModal";

/** Tolerância para comparações de ponto flutuante com o saldo */
const EPSILON = 1e-12;

export default function ConversionCard() {
  const [from, setFrom] = useState<Asset>("BTC");
  const [to, setTo] = useState<Asset>("BRL");
  const [amountText, setAmountText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [result, setResult] = useState<SwapResult | null>(null);

  const { data: balances } = useBalance();
  const quote = useSwapQuote(from, to);
  const swap = useSwap();

  const balanceOf = (asset: Asset) => balances?.find((b) => b.token === asset)?.balance;
  const fromBalance = balanceOf(from);
  const toBalance = balanceOf(to);

  const amount = parseAmountInput(amountText);
  const hasAmount = amountText.trim() !== "";
  const isNumber = !Number.isNaN(amount);
  const isPositive = isNumber && amount > 0;
  const insufficient = isPositive && fromBalance !== undefined && amount > fromBalance + EPSILON;

  const price = quote.data?.price;
  const feeRate = quote.data?.feeRate ?? 0;
  const net = isPositive && price ? computeSwap(amount, price, feeRate).net : 0;

  let amountError: string | undefined;
  if (hasAmount && !isNumber) amountError = "Valor inválido";
  else if (insufficient) amountError = `Saldo insuficiente de ${from}`;

  const canReview = isPositive && !insufficient && !!price && !quote.isError;

  let buttonLabel = "Revisar conversão";
  if (!hasAmount || !isPositive) buttonLabel = "Informe um valor";
  else if (insufficient) buttonLabel = `Saldo insuficiente de ${from}`;
  else if (quote.isError) buttonLabel = "Cotação indisponível";
  else if (!price) buttonLabel = "Calculando cotação...";

  const changes = [
    {
      asset: from,
      before: fromBalance ?? 0,
      after: (fromBalance ?? 0) - (isPositive ? amount : 0),
    },
    { asset: to, before: toBalance ?? 0, after: (toBalance ?? 0) + net },
  ];

  // Ao escolher a mesma moeda do outro lado, inverte o par
  function changeFrom(asset: Asset) {
    if (asset === to) setTo(from);
    setFrom(asset);
  }

  function changeTo(asset: Asset) {
    if (asset === from) setFrom(to);
    setTo(asset);
  }

  function flip() {
    setFrom(to);
    setTo(from);
    setAmountText("");
  }

  function applyFraction(fraction: number) {
    if (!fromBalance) return;
    setAmountText(toAmountInput(fromBalance * fraction, from));
  }

  async function confirm() {
    try {
      const res = await swap.mutateAsync({ from, to, amount });
      setResult(res);
      toast.success("Conversão realizada com sucesso!");
    } catch (error) {
      toast.error(getErrorMessage(error, "Erro ao converter"));
    }
  }

  function closeModal() {
    setModalOpen(false);
    if (result) {
      setResult(null);
      setAmountText("");
    }
  }

  const receiveText =
    isPositive && price
      ? net.toLocaleString("pt-BR", {
          // BRL sempre com 2 casas; criptos até 8, sem zeros à direita
          minimumFractionDigits: to === "BRL" ? 2 : 0,
          maximumFractionDigits: assetMeta[to].decimals,
        })
      : "";

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Coluna principal: formulário de troca */}
      <section className="p-6 bg-white shadow lg:col-span-3 rounded-2xl dark:bg-gray-800">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold dark:text-white">Converter</h3>

          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            {quote.dataUpdatedAt > 0 && (
              <span>
                Cotação de {new Date(quote.dataUpdatedAt).toLocaleTimeString("pt-BR")}
              </span>
            )}
            <button
              type="button"
              onClick={() => quote.refetch()}
              disabled={quote.isFetching}
              aria-label="Atualizar cotação"
              title="Atualizar cotação"
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <RefreshCw size={14} className={quote.isFetching ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        <div className="relative space-y-2">
          <AssetAmountBox
            label="Você paga"
            asset={from}
            onAssetChange={changeFrom}
            balance={fromBalance}
            value={amountText}
            onValueChange={setAmountText}
            onFraction={applyFraction}
            error={amountError}
          />

          {/* Botão de inverter o par, sobreposto entre os dois cards */}
          <div className="relative z-10 flex justify-center -my-5">
            <button
              type="button"
              onClick={flip}
              aria-label="Inverter moedas"
              title="Inverter moedas"
              className="p-2.5 text-blue-600 transition-transform bg-white border-4 border-gray-100 rounded-xl hover:rotate-180 duration-300 dark:bg-gray-700 dark:border-gray-800 dark:text-blue-400 shadow"
            >
              <ArrowDownUp size={18} />
            </button>
          </div>

          <AssetAmountBox
            label="Você recebe"
            asset={to}
            onAssetChange={changeTo}
            balance={toBalance}
            value={receiveText}
            readOnly
            hint={
              price
                ? `1 ${from} ≈ ${formatRate(price, to)} · taxa de ${formatFeePercent(feeRate)} já descontada`
                : quote.isError
                  ? "Não foi possível obter a cotação"
                  : "Buscando cotação..."
            }
          />
        </div>

        {insufficient && (
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
            Você tem {formatAmount(fromBalance ?? 0, from)}.{" "}
            <Link to="/dashboard/deposit" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
              Depositar {from}
            </Link>{" "}
            ou use o botão MÁX.
          </p>
        )}

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          disabled={!canReview}
          className="w-full py-3.5 mt-5 text-base font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {buttonLabel}
        </button>
      </section>

      {/* Coluna lateral: detalhes e impacto no saldo */}
      <aside className="space-y-6 lg:col-span-2">
        <section className="p-6 bg-white shadow rounded-2xl dark:bg-gray-800">
          <h3 className="mb-2 font-semibold dark:text-white">Detalhes da operação</h3>
          {isPositive && price ? (
            <SwapSummary from={from} to={to} amount={amount} price={price} feeRate={feeRate} />
          ) : (
            <p className="py-4 text-sm text-gray-500 dark:text-gray-400">
              {price
                ? `1 ${from} = ${formatRate(price, to)}. Informe um valor para ver o detalhamento com taxa.`
                : "Aguardando cotação..."}
            </p>
          )}
        </section>

        <section className="p-6 bg-white shadow rounded-2xl dark:bg-gray-800">
          <h3 className="mb-3 font-semibold dark:text-white">Impacto no seu saldo</h3>
          <BalanceImpact changes={changes} />
        </section>
      </aside>

      {price !== undefined && (
        <ConfirmSwapModal
          open={modalOpen}
          onClose={closeModal}
          onConfirm={confirm}
          isPending={swap.isPending}
          result={result}
          from={from}
          to={to}
          amount={isPositive ? amount : 0}
          price={price}
          feeRate={feeRate}
          changes={changes}
        />
      )}
    </div>
  );
}
