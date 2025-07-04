import { Input, InputProps } from "@forms/Input";
import { FC, useState } from "react";
import { Button } from "@ui/Button";
import ClosedEye from "@icons/eye-closed.svg?react";
import OpenedEye from "@icons/eye-open.svg?react";

export const InputPassword: FC<InputProps> = ({
  handleChange,
  className = "",
  ...otherOptions
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  return (
    <div className="container relative">
      <Input
        handleChange={handleChange}
        className={className}
        type={showPassword ? "text" : "password"}
        {...otherOptions}
      />
      <Button
        handleClick={handleClick}
        className="absolute top-1/2 right-3 -translate-y-1/2"
      >
        {showPassword ? (
          <OpenedEye className="fill-separator size-6" />
        ) : (
          <ClosedEye className="fill-separator size-6" />
        )}
      </Button>
    </div>
  );
};
