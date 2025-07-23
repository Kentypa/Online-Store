import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/shared/entities/user.entity";
import { Product } from "src/store/products/entities/product.entity";
import { UserModule } from "src/user/user.module";
import { ProductsModule } from "src/store/products/products.module";
import { CartItem } from "./entities/cart-item.entity";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product, CartItem]),
    UserModule,
    ProductsModule,
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
