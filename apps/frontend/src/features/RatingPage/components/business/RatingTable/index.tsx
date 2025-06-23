import { RatingIcon } from "@ui/RatingIcon";
import { numberFormatter } from "@utils/number-formatter";
import { MockUser } from "@features/RatingPage/types/mock-user";
import { FC } from "react";

type PlayerTableProps = {
  users: MockUser[];
};

const TableData = ["Rating", "Player", "Balance", "Upgrades"];

export const PlayerTable: FC<PlayerTableProps> = ({ users }) => {
  return (
    <div className="border border-collapse border-subtle-light rounded-2.5xl overflow-hidden w-full">
      <div className="grid gap-px bg-subtle-light grid-cols-[100px_1fr_1fr_1fr]">
        {TableData.map((item) => (
          <div
            key={item}
            className={`p-2.25 bg-white text-label-large text-subtle-dark text-left first:text-center`}
          >
            {item}
          </div>
        ))}

        {users.map((user) => (
          <div key={user.name} className="contents">
            <div className="flex py-2 px-2.25 bg-white justify-center items-center">
              <div className="text-body-large relative flex flex-row items-center justify-center w-full">
                <RatingIcon rating={user.rating ?? 0} />
                {user.rating}
              </div>
            </div>
            <div className="py-2 px-2.25 bg-white text-left text-body-large flex items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="size-8 mr-2 border border-subtle-light rounded-full"
              />
              {user.name}
            </div>
            <div className="py-2 px-2.25 bg-white text-left text-label-large pb-4.5">
              {numberFormatter(user.balance)}
            </div>
            <div className="py-2 px-2.25 bg-white text-left text-body-large pb-4.5">
              {numberFormatter(user.upgrades)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
