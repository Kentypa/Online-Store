import { FooterColumnProps } from "@layout/FooterColumn";
import { useTranslation } from "react-i18next";
import PhoneIcon from "@icons/phone.svg?react";

export const useFooterColumns = () => {
  const { t } = useTranslation();

  return [
    {
      title: t("footer.column_1.section"),
      links: [
        { address: "", label: t("footer.column_1.aboutUs") },
        { address: "", label: t("footer.column_1.contacts") },
        { address: "", label: t("footer.column_1.allBrands") },
        { address: "", label: t("footer.column_1.onMap") },
      ],
    },
    {
      title: t("footer.column_2.section"),
      links: [
        { address: "", label: t("footer.column_2.delivery") },
        { address: "", label: t("footer.column_2.shops") },
        { address: "", label: t("footer.column_2.serviceAndWarranty") },
        { address: "", label: t("footer.column_2.serviceCenters") },
      ],
    },
    {
      title: t("footer.column_3.section"),
      links: [
        { address: "", label: t("footer.column_3.forBulkClients") },
        { address: "", label: t("footer.column_3.forCorporateClients") },
        { address: "", label: t("footer.column_3.serviceLogin") },
      ],
    },
    {
      title: t("footer.column_4.section"),
      links: [
        { address: "", label: t("footer.column_4.loyaltyProgram") },
        { address: "", label: t("footer.column_4.promotions") },
        { address: "", label: t("footer.column_4.giftCertificates") },
        { address: "", label: t("footer.column_4.paymentByInstallments") },
        { address: "", label: t("footer.column_4.discountedProducts") },
      ],
    },
    {
      title: <span className="underline">{t("footer.column_5.section")}</span>,
      links: [
        {
          address: "",
          label: (
            <div className="flex gap-3 justify-self-end">
              <PhoneIcon className="fill-background w-6" />
              <div>
                {t("footer.column_5.supportService")}
                <div className="underline">
                  {t("footer.column_5.phoneNumber")}
                </div>
              </div>
            </div>
          ),
        },
        { address: "", label: t("footer.column_5.callCenterHourse") },
        { address: "", label: t("footer.column_5.weekdays") },
        { address: "", label: t("footer.column_5.weekends") },
      ],
    },
  ] as FooterColumnProps[];
};
