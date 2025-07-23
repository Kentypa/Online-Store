import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Patch,
  Delete,
  Param,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UserDecorator } from "src/shared/decorators/user.decorator";
import { User } from "src/shared/entities/user.entity";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { CartService } from "./cart.service";
import { CreateCartItemDto } from "./dto/create-cart-item.dto";
import { CartItem } from "./entities/cart-item.entity";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto";
import { UpdateResult } from "typeorm";

@ApiBearerAuth()
@ApiTags("cart")
@Controller("cart/items")
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: "Adding product to user cart" })
  @ApiResponse({
    status: 201,
    description: "Cart item",
    type: CartItem,
  })
  @HttpCode(201)
  async addItemToCart(
    @Body() createCartItemDto: CreateCartItemDto,
    @UserDecorator() user: User,
  ): Promise<CartItem> {
    return this.cartService.addItemToCart(createCartItemDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":productId")
  @ApiOperation({ summary: "Updating quantity at product by new value" })
  @ApiResponse({
    status: 200,
    description: "Update result",
    type: UpdateResult,
  })
  @HttpCode(200)
  async updateQuantity(
    @Param("productId") productId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
    @UserDecorator() user: User,
  ): Promise<UpdateResult> {
    return this.cartService.updateQuantity(
      productId,
      user.id,
      updateCartItemDto.quantity,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":productId")
  @ApiOperation({ summary: "Delete product from user cart" })
  @ApiResponse({
    status: 204,
    description: "Cart item",
    type: CartItem,
  })
  @HttpCode(204)
  async deleteItemFromCart(
    @Param("productId") productId: number,
    @UserDecorator() user: User,
  ): Promise<void> {
    await this.cartService.removeItemFromCart(productId, user.id);
  }
}
