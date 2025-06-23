import { FC } from "react";
import { Button } from "@ui/Button";
import { useLocation, useNavigate } from "react-router";
import ArrowLeft from "@icons/arrow-left.svg";
import ArrowRight from "@icons/arrow-right.svg";

type PaginationButtonsProps = {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
};

export const PaginationButtons: FC<PaginationButtonsProps> = ({
  currentPage,
  totalPages,
  setPage,
}) => {
  const nav = useNavigate();
  const location = useLocation();

  function handleSetPage(page: number) {
    if (page < 1 || page > totalPages) {
      return;
    }
    const path = location.pathname.replace(/\/\d+$/, "");
    setPage(page);
    nav(`${path}/${page}`);
  }

  return (
    <div className="flex flex-row items-center justify-center mt-8">
      <Button handleClick={() => handleSetPage(currentPage - 1)}>
        <img src={ArrowLeft} alt="Previous page" />
      </Button>
      <div className="mx-6 flex flex-row items-center justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            handleClick={() => handleSetPage(index + 1)}
            className={`size-12 text-body-large ${
              index + 1 === currentPage ? "bg-background rounded-full" : ""
            }`}
          >
            {index + 1}
          </Button>
        ))}
      </div>
      <Button handleClick={() => handleSetPage(currentPage + 1)}>
        <img src={ArrowRight} alt="Next page" />
      </Button>
    </div>
  );
};
