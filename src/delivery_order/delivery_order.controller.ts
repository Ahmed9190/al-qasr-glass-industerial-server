import {
  Controller,
  Get,
  ParseIntPipe,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Body, Param, Patch, Post } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { Paginate, PaginateQuery } from 'nestjs-paginate/lib/decorator';
import { Paginated } from 'nestjs-paginate/lib/paginate';
import { DeliveryOrderService } from './delivery_order.service';
import { MarkAsDeliveredDto } from './dto/mark-as-delivered.dto';
import { SendDataDto } from './dto/send-data.dto';
import { DeliveryOrder } from './entities/delivery_order.entity';

@Controller('delivery-order')
export class DeliveryOrderController {
  constructor(private readonly deliveryOrderService: DeliveryOrderService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAllPaginated(
    @Paginate() query: PaginateQuery,
    @Req() request: any,
  ): Promise<Paginated<DeliveryOrder>> {
    console.log(query);
    return this.deliveryOrderService.findAllPaginated(
      query,
      request.user.driverNumber,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch('mark-as-seen/:deliveryOrderNumber')
  public markAsSeen(
    @Param('deliveryOrderNumber', ParseIntPipe) deliveryOrderNumber: number,
    @Req() request: any,
  ): Promise<DeliveryOrder> {
    return this.deliveryOrderService.markAsSeen(
      deliveryOrderNumber,
      request.user.driverNumber,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('mark-as-delivered/:deliveryOrderNumber')
  @HttpCode(HttpStatus.ACCEPTED)
  public markAsDelivered(
    @Param('deliveryOrderNumber', ParseIntPipe) deliveryOrderNumber: number,
    @Req() request: any,
    @Body() markAsDeliveredDto: MarkAsDeliveredDto,
  ) {
    return this.deliveryOrderService.markAsDelivered(
      deliveryOrderNumber,
      markAsDeliveredDto,
      request.user.driverNumber,
    );
  }

  @Post('notify-driver')
  public notifyDriver(@Body() sendDataDto: SendDataDto) {
    return this.deliveryOrderService.notifyDriver(sendDataDto);
  }

  @Post('send-verification-code-sms')
  public sendVerificationCodeSms(@Body() sendDataDto: SendDataDto) {
    return this.deliveryOrderService.sendVerificationCodeSms(sendDataDto);
  }
}
