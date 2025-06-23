import { UserOfferItem } from "@business/UserOfferItem";
import { UserOffer } from "@shared-types/user-offer";
import { FC } from "react";

type OffersListProps = {
  offers: UserOffer[];
};

export const OffersList: FC<OffersListProps> = ({ offers }) => {
  return (
    <ul className="grid grid-cols-3 gap-6">
      {offers.map((offer, index) => (
        <UserOfferItem offer={offer} key={index + offer.userName} />
      ))}
    </ul>
  );
};
