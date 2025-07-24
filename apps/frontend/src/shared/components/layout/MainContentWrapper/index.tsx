import { Footer } from "@layout/Footer";
import { Header } from "@layout/Header";
import { ComponentWithChildren } from "@shared-types/components/component-with-children";

export const MainContentWrapper: ComponentWithChildren = ({ children }) => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
