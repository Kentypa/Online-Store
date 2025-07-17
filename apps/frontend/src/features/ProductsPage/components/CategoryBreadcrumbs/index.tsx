import { PagesEndponts } from "@enums/pagesEndpoints";
import { useCategories } from "@hooks/use-categories";
import { useParentCategories } from "@hooks/use-parent-categories";
import { Button } from "@ui/Button";
import { getCategoriesByIds } from "@utils/getCategoriesWithName";
import { FC } from "react";
import { useSearchParams, useNavigate } from "react-router";
import HomeIcon from "@icons/home.svg?react";

type CategoryBreadcrumbsProps = {
  categoryId: number;
};

export const CategoryBreadcrumbs: FC<CategoryBreadcrumbsProps> = ({
  categoryId,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { categoriesData } = useCategories();
  const { parentIds } = useParentCategories(categoryId);
  const navigate = useNavigate();

  const handleSetNewCategory = (value: string) => {
    searchParams.set("categoryId", value);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center gap">
      <Button handleClick={() => navigate(PagesEndponts.HOME)}>
        <HomeIcon className="fill-primary hover:fill-accent size-6" />
      </Button>

      {parentIds &&
        categoriesData &&
        getCategoriesByIds(
          [Number(categoryId), ...parentIds],
          categoriesData,
        ).map((category) => (
          <div key={category.id} className="flex items-center">
            <span>/</span>
            <Button
              handleClick={() => handleSetNewCategory(String(category.id))}
            >
              <p className="hover:text-accent">{category.names}</p>
            </Button>
          </div>
        ))}
    </div>
  );
};
