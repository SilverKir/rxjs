import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RxjsModule } from "./rxjs/rxjs.module";

@Module({
  imports: [ConfigModule.forRoot(), RxjsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
