import { FC, useMemo, useState } from "react";
import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import { useTranslation } from "react-i18next";
import { SearchInput } from "@ui/SearchInput";
import { LanguageSwitchButton } from "@ui/LanguageSwitchButton";
import { Button } from "@ui/Button";
import { CatalogVariants } from "@business/CatalogVariants";
import { useNavigate } from "react-router";
import { PagesEndponts } from "@enums/pagesEndpoints";
import { useSearch } from "@hooks/use-search";
import { useForm } from "@hooks/use-form";
import { useNavigateToProduct } from "@hooks/use-navigate-to-product";
import StoreLogo from "@icons/logo-website.svg?react";
import CatalogIcon from "@icons/catalog.svg?react";
import UserIcon from "@icons/user.svg?react";
import ShopCartIcon from "@icons/shopping-cart.svg?react";
import { useNavigateToProducts } from "@hooks/use-navigate-to-products";

type SearchProps = {
  query: string;
};

export const Header: FC = () => {
  const { t } = useTranslation(["common"]);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((prev) => !prev);
  const navigate = useNavigate();

  const initialState = useMemo<SearchProps>(() => ({ query: "" }), []);

  const { formState, handleChange } = useForm<SearchProps>(initialState);
  const { products } = useSearch(formState.query);
  const { handleNavigateToProduct } = useNavigateToProduct();
  const { handleNavigateToProducts } = useNavigateToProducts();

  return (
    <header className="relative z-20 grid grid-cols-[1fr_2fr_1fr] items-center py-2.5 px-12 w-full bg-primary">
      <CatalogVariants visible={showModal} />
      {formState.query && (
        <ul className="absolute flex flex-col max-w-157.5 size-full h-auto right-1/2 translate-x-1/2 top-20 p-2.5 gap-1.5 bg-background border-2 rounded-4xl">
          {products &&
            products.map((product) => (
              <li key={product.product_id}>
                <Button
                  className="flex flex-row gap-3 p-3 w-full hover:bg-accent rounded-4xl"
                  handleClick={() =>
                    handleNavigateToProduct(product.product_id)
                  }
                  type="button"
                >
                  <img
                    src={`http://localhost:3000/public/${product.product.main_image_url}`}
                    className="object-cover size-6 rounded-full"
                  />
                  {product.title}
                </Button>
              </li>
            ))}
        </ul>
      )}
      <div className="flex gap-15">
        <Button
          handleClick={() => {
            navigate(PagesEndponts.HOME);
          }}
        >
          <StoreLogo className="fill-white size-11" />
        </Button>
        <ButtonWithIcon
          className="rounded-4xl text-body-paragraph bg-white border-2 border-separator flex items-center justify-center max-w-35 w-full max-h-11"
          icon={<CatalogIcon className="fill-primary size-6" />}
          handleClick={toggleModal}
        >
          {t("header.catalog")}
        </ButtonWithIcon>
      </div>

      <SearchInput
        className="justify-self-center flex max-w-157.5 w-full"
        searchText={t("header.search")}
        handleChange={handleChange}
        value={formState.query}
        handleClick={() => handleNavigateToProducts(formState.query)}
        name="query"
      />

      <div className="flex gap-6 justify-self-end">
        <LanguageSwitchButton />
        <Button
          handleClick={() => {
            navigate(PagesEndponts.USER_SETTINGS);
          }}
        >
          <UserIcon className="size-6 fill-white hover:fill-accent" />
        </Button>
        <Button
          handleClick={() => {
            navigate(PagesEndponts.USER_ORDERS);
          }}
        >
          <ShopCartIcon className="size-6 fill-white hover:fill-accent" />
        </Button>
      </div>
    </header>
  );
};
