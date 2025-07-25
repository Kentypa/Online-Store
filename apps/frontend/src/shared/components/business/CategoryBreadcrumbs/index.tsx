import { PagesEndponts } from "@enums/pagesEndpoints";
import { useCategories } from "@hooks/store/use-categories";
import { useParentCategories } from "@hooks/store/use-parent-categories";
import { Button } from "@ui/Button";
import { FC } from "react";
import { useNavigate } from "react-router";
import { getCategoriesByIds } from "@utils/get-categories-with-names";
import HomeIcon from "@icons/home.svg?react";

type CategoryBreadcrumbsProps = {
  categoryId: number;
  handleSetNewCategory: (value: string) => void;
};

export const CategoryBreadcrumbs: FC<CategoryBreadcrumbsProps> = ({
  categoryId,
  handleSetNewCategory,
}) => {
  const { data: categoriesData } = useCategories();
  const { data: parentIds } = useParentCategories(categoryId);
  const navigate = useNavigate();

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
