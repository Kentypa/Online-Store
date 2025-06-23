import { UserOffer } from "@shared-types/user-offer";
import { FC } from "react";
import { OffersFiltering } from "../../forms/OffersFiltering";
import { OffersList } from "../OffersList";

type OffersContentProps = {
  offers: UserOffer[];
};

export const OffersContent: FC<OffersContentProps> = ({ offers }) => {
  return (
    <div className="flex flex-col">
      <OffersFiltering className="mb-8" />
      <OffersList offers={offers} />
    </div>
  );
};
