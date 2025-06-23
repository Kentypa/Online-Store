import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { Request } from "express";

interface RequestWithUser extends Request {
  user: User;
}

const getUserByContext = (context: ExecutionContext): User => {
  const request = context.switchToHttp().getRequest<RequestWithUser>();
  return request.user;
};

export const UserDecorator = createParamDecorator(
  (_data: unknown, context: ExecutionContext): User =>
    getUserByContext(context),
);
