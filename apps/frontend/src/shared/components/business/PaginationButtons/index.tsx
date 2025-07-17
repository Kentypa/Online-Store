import { FC } from "react";
import { Button } from "@ui/Button";
import { useSearchParams } from "react-router";
import ArrowLeft from "@icons/angle-left.svg?react";
import ArrowRight from "@icons/angle-right.svg?react";

type PaginationButtonsProps = {
  currentPage: number;
  totalPages: number;
};

const getPaginationRange = (
  current: number,
  total: number,
): (number | "...")[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const range: (number | "...")[] = [];
  const nearStart = current <= 4;
  const nearEnd = current >= total - 3;

  if (nearStart) {
    range.push(1, 2, 3, 4, 5, "...", total);
  } else if (nearEnd) {
    range.push(1, "...", total - 4, total - 3, total - 2, total - 1, total);
  } else {
    range.push(1, "...", current - 1, current, current + 1, "...", total);
  }

  return range;
};

export const PaginationButtons: FC<PaginationButtonsProps> = ({
  currentPage,
  totalPages,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  };

  const pageButtons = getPaginationRange(currentPage, totalPages);

  return (
    totalPages > 1 && (
      <div className="flex flex-row items-center justify-center mt-8 gap-2">
        <Button
          aria-label="Previous page"
          handleClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-primary p-3 rounded-full"
        >
          <ArrowLeft className="fill-white size-6" />
        </Button>

        {pageButtons.map((item, idx) =>
          typeof item === "number" ? (
            <Button
              key={idx}
              handleClick={() => setPage(item)}
              className={`size-12 text-white rounded-full ${
                item === currentPage ? "bg-accent" : "bg-primary"
              }`}
            >
              {item}
            </Button>
          ) : (
            <span key={idx} className="px-2 text-muted select-none">
              {item}
            </span>
          ),
        )}

        <Button
          aria-label="Next page"
          handleClick={() => setPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-primary p-3 rounded-full"
        >
          <ArrowRight className="fill-white size-6" />
        </Button>
      </div>
    )
  );
};
