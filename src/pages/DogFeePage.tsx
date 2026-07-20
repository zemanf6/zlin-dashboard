import { useState } from "react";
import { Building2, ChevronDown, Clock3, Dog, Home, Info, Pencil, Plus, ReceiptText, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FeeBackButton, FeeCard, FeeHero, FeeHistory, FeeLayout, FeePageShell, FeePaymentPanel } from "../components/fees/FeeComponents";
import { createPaymentDetails } from "../components/fees/feePayment";
import "../styles/dogFee.css";

type HomeType = "apartment" | "house";

export function DogFeePage() {
  const navigate = useNavigate();
  const [homeType, setHomeType] = useState<HomeType>("apartment");
  const [showDiscountInfo, setShowDiscountInfo] = useState(false);
  const amount = homeType === "apartment" ? 1000 : 500;

  return (
    <FeePageShell>
      <FeeBackButton onClick={() => navigate("/")} />
      <FeeHero title="Poplatek ze psů" description="Zkontrolujte evidovaného psa, jednoduše zvolte typ bydlení a zobrazte údaje k platbě." summaryLabel="K úhradě za rok 2026" summaryValue={`${amount.toLocaleString("cs-CZ")} Kč`} summaryMeta="Rex · čeká na úhradu" />
      <FeeLayout payment={<FeePaymentPanel amount={amount} status="Čeká na úhradu" statusDescription="Platba za psa Rex pro rok 2026." deadline="Splatnost 30. 4. 2026" details={createPaymentDetails({ variableSymbol: "0201154470", message: "Poplatek za psa Rex 2026", subject: "Rex", subjectLabel: "Platba za psa" })} />}>
        <FeeCard icon={Dog} eyebrow="Evidence" title="Váš pes" badge="1 pes">
          <div className="dog-record">
            <div className="dog-record__identity"><span><Dog size={23} /></span><div><strong>Rex</strong><small>Labradorský retrívr · čip 203098100842100</small></div><b>Aktivní</b></div>
            <div className="dog-record__details"><div><span>Datum narození</span><strong>14. 3. 2021</strong></div><div><span>Pořadí psa</span><strong>První pes</strong></div><div><span>Držitel</span><strong>Jan Novák</strong></div></div>
            <div className="dog-record__actions"><button type="button"><Pencil size={16} /> Upravit údaje psa</button></div>
          </div>
          <button className="dog-add-button" type="button"><Plus size={18} /> Přidat dalšího psa</button>
        </FeeCard>

        <FeeCard icon={ReceiptText} eyebrow="Výpočet poplatku" title="Vyberte typ bydlení">
          <p className="dog-rate-intro">Podle typu bydlení určíme správnou roční sazbu za psa.</p>
          <div className="dog-home-options" role="group" aria-label="Typ bydlení">
            <button className={homeType === "apartment" ? "is-active" : ""} type="button" aria-pressed={homeType === "apartment"} onClick={() => setHomeType("apartment")}><span><Building2 size={25} /></span><span><strong>Bytový dům</strong><small>Byt v bytovém nebo panelovém domě</small></span><b>1 000 Kč</b></button>
            <button className={homeType === "house" ? "is-active" : ""} type="button" aria-pressed={homeType === "house"} onClick={() => setHomeType("house")}><span><Home size={25} /></span><span><strong>Rodinný dům</strong><small>Rodinný dům nebo jiný objekt</small></span><b>500 Kč</b></button>
          </div>
          <div className="dog-area-info"><span><ShieldCheck size={21} /></span><div><strong>Oblast jsme určili automaticky</strong><p>Podle vašeho trvalého bydliště spadáte do oblasti uvedené v příloze č. 1 vyhlášky. Nemusíte nic dohledávat ani vybírat.</p><small>Dlouhá 123, 760 01 Zlín</small></div></div>
          <div className="dog-rate-result"><div><span>Roční sazba za psa Rex</span><strong>{homeType === "apartment" ? "První pes v bytovém domě" : "První pes v rodinném domě"}</strong></div><b>{amount.toLocaleString("cs-CZ")} Kč</b></div>
        </FeeCard>

        <section className="fee-card dog-info-grid">
          <article><Clock3 size={22} /><div><span>Splatnost</span><strong>do 30. 4. 2026</strong><p>Při pozdějším přihlášení psa do jednoho měsíce.</p></div></article>
        </section>
        <div className="dog-discount-info">
          <button type="button" onClick={() => setShowDiscountInfo((value) => !value)} aria-expanded={showDiscountInfo}><Info size={19} /><span>Kdo má nárok na nižší sazbu nebo osvobození?</span><ChevronDown className={showDiscountInfo ? "is-open" : ""} size={18} /></button>
          {showDiscountInfo && <div><p><strong>Snížená sazba:</strong> osoby nad 65 let a vybraní příjemci důchodu.</p><p><strong>Osvobození:</strong> například držitelé ZTP/P, nevidomé osoby, asistenční a služební psi, psi převzatí z útulku nebo po kastraci.</p><small>Příslušnou možnost zvolíte přes „Upravit údaje psa“ u konkrétního psa.</small></div>}
        </div>
        <FeeHistory title="Předchozí platby" items={[{ year: 2025, amount: 1000, paidAt: "Rex · uhrazeno 18. 4. 2025" }]} />
      </FeeLayout>
    </FeePageShell>
  );
}
