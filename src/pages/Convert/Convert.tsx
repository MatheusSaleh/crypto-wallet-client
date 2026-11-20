import ConversionCard from "../../components/conversion/ConversionCard";

export default function Convert() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold dark:text-white">Conversão</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Troque entre Real, Bitcoin e Ethereum com cotação em tempo real.
        </p>
      </div>

      <ConversionCard />
    </div>
  );
}
