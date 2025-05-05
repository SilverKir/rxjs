import { Test, TestingModule } from "@nestjs/testing";
import { RxjsController } from "./rxjs.controller";
import { RxjsService } from "./rxjs.service";

describe("RxjsController", () => {
  let controller: RxjsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RxjsController],
      providers: [RxjsService],
    }).compile();

    controller = module.get<RxjsController>(RxjsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
