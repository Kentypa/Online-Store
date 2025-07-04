import { Button } from "@ui/Button";
import { Input, InputProps } from "@forms/Input";
import { FC } from "react";
import SearchIcon from "@icons/search.svg?react";

type SearchInputProps = InputProps & {
  searchText: string;
  className?: string;
  handleClick?: () => void;
};

export const SearchInput: FC<SearchInputProps> = ({
  className = "",
  handleClick,
  searchText,
  ...otherOptions
}) => {
  return (
    <form className={`${className} relative w-full`}>
      <Input
        {...otherOptions}
        placeholder={searchText}
        className={`bg-white text-secondary rounded-4xl border-2 border-separator max-h-11 p-2.5 w-full placeholder:absolute placeholder:right-1/2 placeholder:translate-x-1/2 placeholder:top-1/2 placeholder:-translate-y-1/2`}
      />

      <Button
        handleClick={handleClick}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
      >
        <SearchIcon className="fill-primary size-6" />
      </Button>
    </form>
  );
};
