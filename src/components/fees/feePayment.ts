import type { PaymentDetail } from "./FeeComponents";

export const CITY_FEE_ACCOUNT = "000000-123456789 / 0800";
export const CITY_FEE_CONSTANT_SYMBOL = "0379";

type CreatePaymentDetailsOptions = {
  variableSymbol: string;
  message: string;
  subject?: string;
  subjectLabel?: string;
};

export function createPaymentDetails({
  variableSymbol,
  message,
  subject,
  subjectLabel = "Platba za",
}: CreatePaymentDetailsOptions): PaymentDetail[] {
  return [
    ...(subject ? [{ label: subjectLabel, value: subject }] : []),
    { label: "Bankovní účet", value: CITY_FEE_ACCOUNT },
    { label: "Variabilní symbol", value: variableSymbol },
    { label: "Konstantní symbol", value: CITY_FEE_CONSTANT_SYMBOL },
    { label: "Zpráva pro příjemce", value: message },
  ];
}
