import { useFooterColumns } from "@hooks/use-footer-columns";
import { FooterColumn } from "@layout/FooterColumn";
import { FC } from "react";

export const Footer: FC = () => {
  const footerColums = useFooterColumns();

  return (
    <footer className="flex gap-17 py-4 px-17 w-full bg-secondary mt-auto">
      {footerColums.map((column, index) => (
        <FooterColumn key={index} {...column} />
      ))}
    </footer>
  );
};
