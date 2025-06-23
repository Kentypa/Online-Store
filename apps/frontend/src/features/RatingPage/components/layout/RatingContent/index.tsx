import { PaginationButtons } from "@business/PaginationButtons";
import { SortingType } from "@features/RatingPage/types/sorting-types";
import { FC, useState } from "react";
import { useParams } from "react-router";
import { PlayerTable } from "../../business/RatingTable";
import { SortingButtons } from "../../ui/SortingButtons";
import { users } from "./users.mock";

export const RatingContent: FC = () => {
  const params = useParams();
  const [sortingType, setSortingType] = useState<SortingType>("Balance");
  const [page, setPage] = useState<number>(parseInt(params.page || "1") || 1);
  const maxUsersCountPerPage = 10;
  const totalPages = Math.ceil(users.users.length / maxUsersCountPerPage);
  const currentUsers = users.users
    .sort((a, b) => {
      if (sortingType === "Balance") {
        return b.balance - a.balance;
      } else if (sortingType === "Upgrades") {
        return b.upgrades - a.upgrades;
      }
      return 0;
    })
    .map((user, index) => ({ ...user, rating: index + 1 }))
    .slice((page - 1) * maxUsersCountPerPage, page * maxUsersCountPerPage);

  return (
    <main className="flex flex-col mt-10 w-full px-30 pb-15 max-w-[1440px]">
      <div className="flex justify-between items-center w-full mb-8">
        <h2 className="text-headline-small">Rating</h2>
        <div className="flex items-center">
          <h3 className="text-subtle-dark pr-4 text-body-large">Sorted by</h3>
          <SortingButtons
            sortingType={sortingType}
            setSortingType={setSortingType}
            sortingTypes={["Balance", "Upgrades"]}
            buttonClassName="first:rounded-l-[10px] last:rounded-r-[10px] py-2.25 px-4.75 border text-label-medium"
          />
        </div>
      </div>
      <PlayerTable users={currentUsers} />
      <PaginationButtons
        currentPage={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </main>
  );
};
