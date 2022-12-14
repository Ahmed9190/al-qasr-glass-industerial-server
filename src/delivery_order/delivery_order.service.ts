import { Injectable } from '@nestjs/common';
import {
  NotAcceptableException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-paginate';
import { PaginateQuery } from 'nestjs-paginate/lib/decorator';
import { FilterOperator, Paginated } from 'nestjs-paginate/lib/paginate';
import { regEx } from 'src/core/constants/regex.constants';
import { SmsService } from 'src/sms/sms.service';
import { In, Repository } from 'typeorm';
import { DeliveryOrderGateway } from './delivery_order.gateway';
import { MarkAsDeliveredDto } from './dto/mark-as-delivered.dto';
import { SendDataDto } from './dto/send-data.dto';
import { DeliveryOrder } from './entities/delivery_order.entity';
import { DeliveryOrderStatus } from './enums/delivery-order-status.enum';

@Injectable()
export class DeliveryOrderService {
  constructor(
    @InjectRepository(DeliveryOrder)
    private readonly deliveryOrderRepository: Repository<DeliveryOrder>,
    private readonly deliveryOrderGateway: DeliveryOrderGateway,
    private readonly smsService: SmsService,
  ) {}

  findAllPaginated(
    query: PaginateQuery,
    driverNumber: number,
  ): Promise<Paginated<DeliveryOrder>> {
    return paginate(query, this.deliveryOrderRepository, {
      where: {
        driverNumber,
        status: In([
          DeliveryOrderStatus.hasLeavingPermission,
          DeliveryOrderStatus.carLeft,
        ]),
      },
      sortableColumns: ['number'],
      defaultSortBy: [['number', 'DESC']],
      filterableColumns: {
        seen: [FilterOperator.EQ],
        delivered: [FilterOperator.EQ],
        carLeavingAppointment: [FilterOperator.BTW],
      },
      relations: ['car'],
    });
  }

  async markAsSeen(
    deliveryOrderNumber: number,
    driverNumber: number,
  ): Promise<DeliveryOrder> {
    const deliveryOrder = await this.deliveryOrderRepository.findOneBy({
      number: deliveryOrderNumber,
      driverNumber,
    });

    if (!deliveryOrder) throw new BadRequestException();

    const updatedDeliveryOrder = await this.deliveryOrderRepository.save({
      ...deliveryOrder,
      seen: true,
    });
    return updatedDeliveryOrder;
  }

  async markAsDelivered(
    deliveryOrderNumber: number,
    markAsDeliveredDto: MarkAsDeliveredDto,
    driverNumber: number,
  ): Promise<DeliveryOrder> {
    const deliveryOrder = await this.deliveryOrderRepository.findOneBy({
      driverNumber,
      number: deliveryOrderNumber,
      verificationCode: markAsDeliveredDto.verificationCode,
    });

    if (!deliveryOrder || !deliveryOrder) throw new NotAcceptableException();

    const updatedDeliveryOrder = await this.deliveryOrderRepository.save({
      ...deliveryOrder,
      delivered: true,
      deliveredAt: new Date(),
    });
    return updatedDeliveryOrder;
  }

  async notifyDriver(sendDataDto: SendDataDto) {
    const { deliveryOrderNumber } = sendDataDto;

    const deliveryOrder = await this.deliveryOrderRepository.findOneBy({
      number: deliveryOrderNumber,
    });

    if (deliveryOrder) {
      const isSent = await this.sendVerificationCodeSms(sendDataDto);

      this.deliveryOrderGateway.driversNotifier.notifyObserver(
        deliveryOrder.driverNumber,
        deliveryOrder,
      );

      return isSent;
    }
  }

  async sendVerificationCodeSms(sendDataDto: SendDataDto): Promise<boolean> {
    const { mobileNumber, deliveryOrderNumber } = sendDataDto;

    const verificationCode: number =
      await this.findVerificationCodeByDeliveryOrderNumber(deliveryOrderNumber);

    if (regEx.saudiaArabiaMobile.test(mobileNumber)) {
      return await this.smsService.send({
        message: `أمر التسليم رقم ${deliveryOrderNumber}
رقم التحقق الخاص به هو ${verificationCode}`,
        mobile: mobileNumber,
      });
    }
  }

  async findVerificationCodeByDeliveryOrderNumber(
    deliveryOrderNumber: number,
  ): Promise<number> {
    const deliveryOrder = await this.deliveryOrderRepository
      .createQueryBuilder('deliveryOrder')
      .where({ number: deliveryOrderNumber })
      .addSelect('verificationCode')
      .getRawOne();

    if (!deliveryOrder) throw new NotFoundException();

    return deliveryOrder.verificationCode;
  }
}
