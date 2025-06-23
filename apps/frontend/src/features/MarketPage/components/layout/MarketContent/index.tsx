import { FC, useState } from "react";
import { PaginationButtons } from "@business/PaginationButtons";
import { UserOffer } from "@shared-types/user-offer";
import { useParams } from "react-router";
import { OffersContent } from "../../business/OffersContent";
import { MarketChart } from "../../charts/MarketChart";
import UserSmallAvatar from "@icons/user-dark.svg";

const userOffers: UserOffer[] = [
  {
    pricePerCoin: 100,
    totalOffers: 274,
    userAvatar: UserSmallAvatar,
    userName: "Cameron Williamson",
  },
  {
    pricePerCoin: 95,
    totalOffers: 150,
    userAvatar: UserSmallAvatar,
    userName: "Isabella Rodriguez",
  },
  {
    pricePerCoin: 110,
    totalOffers: 300,
    userAvatar: UserSmallAvatar,
    userName: "Ethan Patel",
  },
  {
    pricePerCoin: 80,
    totalOffers: 50,
    userAvatar: UserSmallAvatar,
    userName: "Sophia Chen",
  },
  {
    pricePerCoin: 120,
    totalOffers: 400,
    userAvatar: UserSmallAvatar,
    userName: "Liam Kim",
  },
  {
    pricePerCoin: 105,
    totalOffers: 200,
    userAvatar: UserSmallAvatar,
    userName: "Olivia Garcia",
  },
  {
    pricePerCoin: 90,
    totalOffers: 100,
    userAvatar: UserSmallAvatar,
    userName: "Noah Lee",
  },
  {
    pricePerCoin: 115,
    totalOffers: 350,
    userAvatar: UserSmallAvatar,
    userName: "Emma Wilson",
  },
  {
    pricePerCoin: 85,
    totalOffers: 75,
    userAvatar: UserSmallAvatar,
    userName: "Aiden Davis",
  },
  {
    pricePerCoin: 125,
    totalOffers: 450,
    userAvatar: UserSmallAvatar,
    userName: "Ava Brown",
  },
  {
    pricePerCoin: 98,
    totalOffers: 175,
    userAvatar: UserSmallAvatar,
    userName: "Jackson Jones",
  },
  {
    pricePerCoin: 112,
    totalOffers: 325,
    userAvatar: UserSmallAvatar,
    userName: "Mia Miller",
  },
  {
    pricePerCoin: 78,
    totalOffers: 60,
    userAvatar: UserSmallAvatar,
    userName: "Lucas Moore",
  },
  {
    pricePerCoin: 122,
    totalOffers: 425,
    userAvatar: UserSmallAvatar,
    userName: "Harper Taylor",
  },
  {
    pricePerCoin: 108,
    totalOffers: 225,
    userAvatar: UserSmallAvatar,
    userName: "Elijah Anderson",
  },
  {
    pricePerCoin: 92,
    totalOffers: 125,
    userAvatar: UserSmallAvatar,
    userName: "Abigail Thomas",
  },
  {
    pricePerCoin: 118,
    totalOffers: 375,
    userAvatar: UserSmallAvatar,
    userName: "Carter Jackson",
  },
  {
    pricePerCoin: 82,
    totalOffers: 80,
    userAvatar: UserSmallAvatar,
    userName: "Emily White",
  },
  {
    pricePerCoin: 128,
    totalOffers: 475,
    userAvatar: UserSmallAvatar,
    userName: "Sebastian Harris",
  },
  {
    pricePerCoin: 96,
    totalOffers: 160,
    userAvatar: UserSmallAvatar,
    userName: "Madison Martin",
  },
  {
    pricePerCoin: 116,
    totalOffers: 360,
    userAvatar: UserSmallAvatar,
    userName: "Alexander Thompson",
  },
  {
    pricePerCoin: 88,
    totalOffers: 90,
    userAvatar: UserSmallAvatar,
    userName: "Chloe Garcia",
  },
  {
    pricePerCoin: 124,
    totalOffers: 440,
    userAvatar: UserSmallAvatar,
    userName: "Daniel Martinez",
  },
  {
    pricePerCoin: 102,
    totalOffers: 280,
    userAvatar: UserSmallAvatar,
    userName: "Grace Robinson",
  },
  {
    pricePerCoin: 97,
    totalOffers: 155,
    userAvatar: UserSmallAvatar,
    userName: "Owen Clark",
  },
  {
    pricePerCoin: 111,
    totalOffers: 305,
    userAvatar: UserSmallAvatar,
    userName: "Lily Rodriguez",
  },
  {
    pricePerCoin: 81,
    totalOffers: 55,
    userAvatar: UserSmallAvatar,
    userName: "Caleb Lewis",
  },
  {
    pricePerCoin: 121,
    totalOffers: 405,
    userAvatar: UserSmallAvatar,
    userName: "Aria Lee",
  },
  {
    pricePerCoin: 106,
    totalOffers: 205,
    userAvatar: UserSmallAvatar,
    userName: "Joseph Walker",
  },
  {
    pricePerCoin: 91,
    totalOffers: 105,
    userAvatar: UserSmallAvatar,
    userName: "Scarlett Hall",
  },
  {
    pricePerCoin: 116,
    totalOffers: 355,
    userAvatar: UserSmallAvatar,
    userName: "Samuel Young",
  },
  {
    pricePerCoin: 86,
    totalOffers: 70,
    userAvatar: UserSmallAvatar,
    userName: "Victoria Allen",
  },
  {
    pricePerCoin: 126,
    totalOffers: 455,
    userAvatar: UserSmallAvatar,
    userName: "David King",
  },
  {
    pricePerCoin: 99,
    totalOffers: 170,
    userAvatar: UserSmallAvatar,
    userName: "Elizabeth Wright",
  },
  {
    pricePerCoin: 113,
    totalOffers: 330,
    userAvatar: UserSmallAvatar,
    userName: "Matthew Scott",
  },
  {
    pricePerCoin: 79,
    totalOffers: 65,
    userAvatar: UserSmallAvatar,
    userName: "Natalie Green",
  },
  {
    pricePerCoin: 123,
    totalOffers: 430,
    userAvatar: UserSmallAvatar,
    userName: "Christopher Baker",
  },
  {
    pricePerCoin: 109,
    totalOffers: 230,
    userAvatar: UserSmallAvatar,
    userName: "Addison Hill",
  },
  {
    pricePerCoin: 93,
    totalOffers: 130,
    userAvatar: UserSmallAvatar,
    userName: "Logan Nelson",
  },
  {
    pricePerCoin: 119,
    totalOffers: 380,
    userAvatar: UserSmallAvatar,
    userName: "Stella Carter",
  },
  {
    pricePerCoin: 83,
    totalOffers: 85,
    userAvatar: UserSmallAvatar,
    userName: "Ryan Mitchell",
  },
  {
    pricePerCoin: 129,
    totalOffers: 480,
    userAvatar: UserSmallAvatar,
    userName: "Leah Roberts",
  },
  {
    pricePerCoin: 101,
    totalOffers: 285,
    userAvatar: UserSmallAvatar,
    userName: "Nathan Phillips",
  },
  {
    pricePerCoin: 94,
    totalOffers: 135,
    userAvatar: UserSmallAvatar,
    userName: "Audrey Campbell",
  },
  {
    pricePerCoin: 117,
    totalOffers: 365,
    userAvatar: UserSmallAvatar,
    userName: "Dylan Parker",
  },
  {
    pricePerCoin: 87,
    totalOffers: 72,
    userAvatar: UserSmallAvatar,
    userName: "Savannah Evans",
  },
];

export const MarketContent: FC = () => {
  const params = useParams();
  const [page, setPage] = useState<number>(parseInt(params.page || "1") || 1);
  const maxOffersPerPage = 12;
  const totalPages = Math.ceil(userOffers.length / maxOffersPerPage);
  const currentOffers = userOffers.slice(
    (page - 1) * maxOffersPerPage,
    page * maxOffersPerPage
  );

  return (
    <main className="flex flex-col w-full max-w-[1440px] px-30 py-10">
      <div className="p-6 gap-4 flex flex-col">
        <MarketChart className="mb-10" />
      </div>
      <OffersContent offers={currentOffers} />
      <PaginationButtons
        currentPage={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </main>
  );
};
