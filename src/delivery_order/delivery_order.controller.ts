import {
  Controller,
  Get,
  ParseIntPipe,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { Body, Param, Patch, Post } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { Paginate, PaginateQuery } from 'nestjs-paginate/lib/decorator';
import { Paginated } from 'nestjs-paginate/lib/paginate';
import { DeliveryOrderService } from './delivery_order.service';
import { MarkAsDeliveredDto } from './dto/mark-as-delivered.dto';
import { SendDataDto } from './dto/send-data.dto';
import { DeliveryOrder } from './entities/delivery_order.entity';
import Branch from 'src/core/enums/branch.enum';

@Controller('delivery-order')
export class DeliveryOrderController {
  constructor(private readonly deliveryOrderService: DeliveryOrderService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAllPaginated(
    @Headers('branch') branch: Branch,
    @Paginate() query: PaginateQuery,
    @Req() request: any,
  ): Promise<Paginated<DeliveryOrder>> {
    return this.deliveryOrderService.findAllPaginated(
      query,
      request.user.driverNumber,
      branch,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch('mark-as-seen/:deliveryOrderNumber')
  public markAsSeen(
    @Headers('branch') branch: Branch,
    @Param('deliveryOrderNumber', ParseIntPipe) deliveryOrderNumber: number,
    @Req() request: any,
  ): Promise<DeliveryOrder> {
    return this.deliveryOrderService.markAsSeen(
      deliveryOrderNumber,
      request.user.driverNumber,
      branch,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('mark-as-delivered/:deliveryOrderNumber')
  @HttpCode(HttpStatus.ACCEPTED)
  async markAsDelivered(
    @Headers('branch') branch: Branch,
    @Param('deliveryOrderNumber', ParseIntPipe) deliveryOrderNumber: number,
    @Req() request: any,
    @Body() markAsDeliveredDto: MarkAsDeliveredDto,
  ) {
    return await this.deliveryOrderService.markAsDelivered(
      deliveryOrderNumber,
      markAsDeliveredDto,
      request.user.driverNumber,
      branch,
    );
  }

  @Post('notify-driver')
  public notifyDriver(
    @Body() sendDataDto: SendDataDto,
    @Headers('branch') branch: Branch,
  ) {
    return this.deliveryOrderService.notifyDriver(sendDataDto, branch);
  }

  @Post('send-verification-code-sms')
  async sendVerificationCodeSms(
    @Body() sendDataDto: SendDataDto,
    @Headers('branch') branch: Branch,
  ) {
    return await this.deliveryOrderService.sendVerificationCodeSms(
      sendDataDto,
      branch,
    );
  }
}
