import type { Asset } from "../../types/transaction";
import { assetMeta } from "../../utils/assets";

export default function AssetBadge({ asset, size = "md" }: { asset: Asset; size?: "sm" | "md" }) {
  const meta = assetMeta[asset];
  const sizeClass = size === "sm" ? "w-6 h-6 text-[10px]" : "w-9 h-9 text-sm";

  return (
    <span
      className={`inline-flex items-center justify-center font-bold rounded-full shrink-0 ${sizeClass} ${meta.badgeClass}`}
      aria-hidden
    >
      {meta.symbolChar}
    </span>
  );
}
