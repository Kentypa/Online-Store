import { FC } from "react";
import { CreateOfferContent } from "../CreateOfferContent";
import { FilterForm } from "../FilterForm";

type OffersFilteringProps = {
  className?: string;
};

export const OffersFiltering: FC<OffersFilteringProps> = ({ className }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <h3 className="text-title-large flex mb-6">Filter offers by</h3>
      <div className="flex justify-between items-end">
        <FilterForm />
        <CreateOfferContent />
      </div>
    </div>
  );
};
