import { useTicker } from "../../hooks/useTicker";
import type { TickerItem } from "../../types/transaction";

/** Segundos que cada item leva para cruzar a tela: controla a velocidade */
const SECONDS_PER_ITEM = 3.5;

function formatBrl(value: number) {
  // Moedas "baratas" (iene, peso argentino...) precisam de mais casas decimais
  const digits = value >= 1 ? 2 : value >= 0.01 ? 4 : 6;
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function TickerEntry({ item }: { item: TickerItem }) {
  const change = item.change24h;
  const up = change !== null && change >= 0;

  return (
    <span className="flex items-center gap-2 px-5 whitespace-nowrap" title={item.name}>
      <span
        className={`text-[10px] px-1 rounded font-bold ${
          item.type === "crypto" ? "bg-amber-400 text-black" : "bg-sky-400 text-black"
        }`}
      >
        {item.type === "crypto" ? "CRIPTO" : "CÂMBIO"}
      </span>
      <span className="font-bold tracking-wide text-white">{item.symbol}</span>
      <span className="text-gray-200 tabular-nums">{formatBrl(item.priceBrl)}</span>
      {change !== null && (
        <span className={`tabular-nums font-semibold ${up ? "text-green-400" : "text-red-400"}`}>
          {up ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
        </span>
      )}
      <span className="pl-3 text-red-600" aria-hidden>
        ●
      </span>
    </span>
  );
}

/** Letreiro de cotações no estilo de canal de notícias. */
export default function TickerTape() {
  const { data: items, isError } = useTicker();

  const hasData = !!items && items.length > 0;

  return (
    <div
      className="flex items-stretch h-9 overflow-hidden text-sm bg-gray-950 border-b-2 border-red-600 select-none"
      role="marquee"
      aria-label="Cotações de moedas e criptomoedas em reais"
    >
      {/* Selo fixo à esquerda */}
      <div className="relative z-10 flex items-center gap-2 px-3 font-extrabold tracking-wider text-white bg-red-600 shrink-0">
        <span className="relative flex w-2 h-2">
          <span className="absolute inline-flex w-full h-full bg-white rounded-full opacity-75 animate-ping motion-reduce:animate-none" />
          <span className="relative inline-flex w-2 h-2 bg-white rounded-full" />
        </span>
        AO VIVO
      </div>
      <div className="relative z-10 items-center hidden px-3 text-xs font-bold text-red-600 uppercase bg-white sm:flex shrink-0">
        Mercados · BRL
      </div>

      <div className="relative flex-1 overflow-hidden ticker-viewport">
        {/* Esmaecimento nas bordas */}
        <div className="absolute inset-y-0 left-0 z-10 w-8 pointer-events-none bg-gradient-to-r from-gray-950 to-transparent" />
        <div className="absolute inset-y-0 right-0 z-10 w-8 pointer-events-none bg-gradient-to-l from-gray-950 to-transparent" />

        {hasData ? (
          <div
            className="flex items-center h-full w-max ticker-track"
            style={
              { "--ticker-duration": `${items.length * SECONDS_PER_ITEM}s` } as React.CSSProperties
            }
          >
            {/* Lista duplicada para o loop contínuo */}
            {[...items, ...items].map((item, index) => (
              <TickerEntry key={`${item.symbol}-${index}`} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex items-center h-full px-4 text-gray-400">
            {isError ? "Cotações indisponíveis no momento" : "Carregando cotações..."}
          </div>
        )}
      </div>
    </div>
  );
}
