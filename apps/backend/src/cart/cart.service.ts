import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartItem } from "./entities/cart-item.entity";
import { CreateCartItemDto } from "./dto/create-cart-item.dto";
import { UserService } from "src/user/user.service";
import { ProductsService } from "src/store/products/products.service";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    private userService: UserService,
    private productService: ProductsService,
  ) {}

  async addItemToCart({ productId }: CreateCartItemDto, userId: number) {
    const user = await this.userService.getById(userId);
    if (!user) throw new BadRequestException("User not found");

    const products = await this.productService.getProducts({
      ids: [productId],
    });
    if (!products?.data?.length)
      throw new BadRequestException("Product not found");

    const existingCartItem = await this.cartItemRepository.findOneBy({
      user_id: userId,
      product_id: productId,
    });

    if (existingCartItem)
      throw new BadRequestException("Review already exists");

    const cartItem = this.cartItemRepository.create({
      user_id: userId,
      product_id: productId,
    });

    return this.cartItemRepository.save(cartItem);
  }

  async removeItemFromCart(productId: number, userId: number) {
    const user = await this.userService.getById(userId);
    if (!user) throw new BadRequestException("User not found");

    const products = await this.productService.getProducts({
      ids: [productId],
    });
    if (!products?.data?.length)
      throw new BadRequestException("Product not found");

    const existingCartItem = await this.cartItemRepository.findOneBy({
      user_id: userId,
      product_id: productId,
    });

    if (!existingCartItem)
      throw new BadRequestException("No item to remove from cart");

    return this.cartItemRepository.remove(existingCartItem);
  }

  async updateQuantity(productId: number, userId: number, newQuantity: number) {
    const user = await this.userService.getById(userId);
    if (!user) throw new BadRequestException("User not found");

    const products = await this.productService.getProducts({
      ids: [productId],
    });
    if (!products?.data?.length)
      throw new BadRequestException("Product not found");

    const existingCartItem = await this.cartItemRepository.findOne({
      where: {
        user_id: userId,
        product_id: productId,
      },
      relations: ["product"],
    });

    if (newQuantity > (existingCartItem?.product.stock ?? 0))
      throw new BadRequestException("Quantity is more than stock");

    return await this.cartItemRepository.update(
      { user_id: userId, product_id: productId },
      { quantity: newQuantity },
    );
  }
}
