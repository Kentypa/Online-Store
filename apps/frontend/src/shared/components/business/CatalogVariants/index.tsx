import { useCategories } from "@hooks/use-categories";
import { CatalogVariantsIcons } from "@ui/CatalogVariantsIcons";
import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Button } from "@ui/Button";
import { SortProductsBy } from "@enums/sortProductsBy";
import { PagesEndponts } from "@enums/pagesEndpoints";
import { CategoryRoot } from "@shared-types/storeTypes/categories/category-root";
import RightArrow from "@icons/angle-right.svg?react";

export type CatalogVariantsProps = {
  visible: boolean;
};

export const CatalogVariants: FC<CatalogVariantsProps> = ({ visible }) => {
  const { data: categoriesData, isLoading, isSuccess } = useCategories();
  const [currentCategory, setCurrentCategory] = useState<CategoryRoot>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("categoryId", String(categoryId));
    newParams.set("page", "1");
    newParams.set("sortBy", SortProductsBy.TOTAL_SOLD_DESC.toLowerCase());

    navigate(`${PagesEndponts.PRODUCTS}?${newParams.toString()}`);
  };

  useEffect(() => {
    if (isSuccess && categoriesData) {
      setCurrentCategory(categoriesData[0]);
    }
  }, [isSuccess, categoriesData]);

  if (isLoading) return;

  const activeCategoryStyle = (id: number) =>
    currentCategory?.id === id
      ? "text-accent fill-accent"
      : "text-secondary fill-secondary";

  if (!visible) return;

  return (
    <div className="z-20 absolute top-full left-0 w-full flex bg-primary rounded-b-4xl py-8 px-42.5 gap-27">
      <ul className="flex w-auto flex-col gap-3 bg-white rounded-4xl p-5 text-nowrap">
        {categoriesData?.map((category) => (
          <li
            key={category.id}
            className={`flex gap-2 w-full ${activeCategoryStyle(category.id)}`}
            onMouseEnter={() => {
              setCurrentCategory(category);
            }}
          >
            <CatalogVariantsIcons
              className="size-6"
              iconName={category.image_url ?? ""}
            />
            <Button
              className="flex justify-between max-w-62 w-full"
              handleClick={() =>
                handleCategoryClick(category.translations[0].category_id)
              }
            >
              <p className="text-body-paragraph">
                {category.translations[0].name}
              </p>
              <RightArrow className="size-6" />
            </Button>
          </li>
        ))}
      </ul>
      <div className="w-max-288 w-full grid grid-cols-5 bg-white p-5 rounded-4xl">
        {currentCategory?.children?.map((category) => (
          <div key={category.id} className="flex flex-col gap-1.5">
            <p className="text-display-smallest mb-3 hover:text-accent cursor-pointer">
              <Button
                handleClick={() =>
                  handleCategoryClick(category.translations[0].category_id)
                }
              >
                {category.translations[0].name}
              </Button>
            </p>
            <ul className="flex flex-col gap-1.5">
              {category.children.map((subcategory) => (
                <li
                  key={subcategory.id}
                  className="text-body-paragraph hover:text-accent cursor-pointer"
                >
                  <Button
                    handleClick={() =>
                      handleCategoryClick(
                        subcategory.translations[0].category_id,
                      )
                    }
                  >
                    {subcategory.translations[0].name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
