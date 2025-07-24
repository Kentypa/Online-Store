import { FC, SVGProps } from "react";
import NotFoundIcon from "@icons/not-found.svg?react";
import ElectronicsIcon from "@icons/categories/electronics.svg?react";
import HomeGardenIcon from "@icons/categories/home-garden.svg?react";
import FashionIcon from "@icons/categories/fashion.svg?react";
import SportsOutdoorsIcon from "@icons/categories/sports-outdoors.svg?react";
import BeautyHealthIcon from "@icons/categories/beauty-health.svg?react";
import AutomotiveIcon from "@icons/categories/automotive.svg?react";
import ToysHobbiesIcon from "@icons/categories/toys-hobbies.svg?react";
import BooksIcon from "@icons/categories/books.svg?react";
import MusicInstrumentsIcon from "@icons/categories/music-instruments.svg?react";
import PetsIcon from "@icons/categories/pets.svg?react";
import BabyProductsIcon from "@icons/categories/baby-products.svg?react";

type CatalogVariantsIconsProps = {
  iconName: string;
  className?: string;
};

const ICON_MAP: Record<string, FC<SVGProps<SVGSVGElement>>> = {
  electronics: ElectronicsIcon,
  "home-garden": HomeGardenIcon,
  fashion: FashionIcon,
  "sports-outdoors": SportsOutdoorsIcon,
  "beauty-health": BeautyHealthIcon,
  automotive: AutomotiveIcon,
  "toys-hobbies": ToysHobbiesIcon,
  books: BooksIcon,
  "music-instruments": MusicInstrumentsIcon,
  pets: PetsIcon,
  "baby-products": BabyProductsIcon,
};

export const CatalogVariantsIcons: FC<CatalogVariantsIconsProps> = ({
  iconName,
  className = "size-6 fill-primary",
}) => {
  const Icon = ICON_MAP[iconName] || NotFoundIcon;

  return <Icon className={className} />;
};
