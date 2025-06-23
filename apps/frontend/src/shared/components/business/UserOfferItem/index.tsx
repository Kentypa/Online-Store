import { FC } from "react";
import { UserOffer } from "@shared-types/user-offer";
import { Button } from "@ui/Button";
import CoinIcon from "@icons/coin-small.svg";

type UserOfferItemProps = {
  offer: UserOffer;
};

export const UserOfferItem: FC<UserOfferItemProps> = ({ offer }) => {
  return (
    <li className="border hover:border-primary border-subtle-light rounded-lgx p-5.75 flex flex-col gap-4">
      <div className="flex w-full">
        <img
          src={offer.userAvatar}
          alt={offer.userName}
          className="size-12 mr-2"
        />
        <div className="flex flex-col h-[50px] relative w-full">
          <div className="flex justify-between">
            <h5 className="text-body-large text-subtle-dark truncate self-start max-w-[154px]">
              {offer.userName}
            </h5>
            <div className="flex items-center">
              <img
                src={CoinIcon}
                alt="coin-small"
                className="mr-2 size-6 p-0.5"
              />
              <div className="flex items-center">
                <p className="text-headline-small">
                  {offer.pricePerCoin}&nbsp;
                  <span className="text-body-large text-subtle-dark self-end">
                    /coin
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex absolute top-full -translate-y-full">
            <p className="text-title-medium">
              {offer.totalOffers}&nbsp;
              <span className="text-body-large text-subtle-dark">selling</span>
            </p>
          </div>
        </div>
      </div>
      <Button className="py-2.5 px-4 hover:bg-primary hover:text-white bg-background text-label-medium rounded-xl">
        Buy
      </Button>
    </li>
  );
};
