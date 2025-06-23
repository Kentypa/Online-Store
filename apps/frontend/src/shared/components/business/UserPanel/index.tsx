import { useAppSelector } from "@hooks/redux";
import { userSelector } from "@selectors/userSelector";
import { Button } from "@ui/Button";
import { textFormatter } from "@utils/text-formatter";
import { FC } from "react";
import { useNavigate } from "react-router";
import SmallCoin from "@icons/coin-small.svg";
import undefinedAvatar from "@icons/user-light.svg";

export const UserPanel: FC = () => {
  const userInfo = useAppSelector(userSelector);
  const nav = useNavigate();

  return (
    <Button
      handleClick={() => {
        nav("/profile");
      }}
    >
      <div className="flex flex-row justify-between items-center">
        <img
          src={userInfo.avatarUrl || undefinedAvatar}
          alt={"user-logo-light"}
          className="size-12 rounded-full object-cover mr-3"
        />

        <div>
          <p className="text-body-large text-subtle-dark mb-0.5">
            {userInfo.username || userInfo.email}
          </p>
          <div className="flex items-center w-full gap-0.5">
            <img
              src={SmallCoin}
              className="size-5 m-0.5 mr-2"
              alt={"small-coin"}
            />
            <p className="text-label-large">
              {textFormatter(userInfo.userStats.totalClickCoins)}
            </p>
          </div>
        </div>
      </div>
    </Button>
  );
};
