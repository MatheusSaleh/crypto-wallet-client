import { useState } from "react";
import { useConversion } from "../../hooks/useConversion";

export default function ConversionCard() {
  const [from, setFrom] = useState("BTC");
  const [to, setTo] = useState("BRL");
  const [amount, setAmount] = useState("");

  const { convert, loading, result, rate, clearResult } = useConversion();

  function handleConvert() {
    const value = Number(amount);

    if (!value || value <= 0) {
      return;
    }

    convert(from, to, value);
  }

  return (
    <div className="p-6 bg-white shadow rounded-xl dark:bg-gray-800 space-y-4">
      <h3 className="text-lg font-semibold dark:text-white">
        Conversão de moedas
      </h3>

      <select
        value={from}
        onChange={(e) => {
          setFrom(e.target.value);
          clearResult();
        }}
        className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option>BTC</option>
        <option>ETH</option>
        <option>USDT</option>
        <option>BRL</option>
      </select>

      <select
        value={to}
        onChange={(e) => {
          setTo(e.target.value);
          clearResult;
        }}
        className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option>BTC</option>
        <option>ETH</option>
        <option>USDT</option>
        <option>BRL</option>
      </select>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Valor"
        className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />

      <button
        onClick={handleConvert}
        disabled={loading}
        className="flex items-center justify-center w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? (
          <svg
            className="w-5 h-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />

            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        ) : (
          "Converter"
        )}
      </button>

      {result && (
        <div className="p-3 bg-gray-100 rounded dark:bg-gray-700 text-black dark:text-white">
          <p>
            Resultado:{" "}
            <strong>
              {result.toFixed(4)} {to}
            </strong>
          </p>
          <p>
            Cotação usada: 1 {from} = {rate} {to}
          </p>
        </div>
      )}
    </div>
  );
}
