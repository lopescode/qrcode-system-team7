import crypto from "crypto";

export abstract class TextHelper {
  static formatPercentage = (value: number) => {
    const sign = value > 0 ? "+" : "";
    return `${sign}${value}%`;
  };

  static formatPrice = (value: number | string) => {
    return `R$ ${Number(value).toFixed(2)}`;
  };

  static sha256 = (value: string) => {
    return crypto.createHash("sha256").update(value).digest("hex");
  };
}
