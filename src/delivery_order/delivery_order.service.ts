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
import IRepositories from 'src/core/types/i-respositories.type';
import Branches from 'src/core/enums/branch.enum';
import Branch from 'src/core/enums/branch.enum';

@Injectable()
export class DeliveryOrderService {
  private _branchRepostiories: IRepositories<DeliveryOrder> = {
    jeddah: this.jeddahDeliveryOrderRepository,
    riyadh: this.riyadhDeliveryOrderRepository,
  };

  constructor(
    @InjectRepository(DeliveryOrder, Branch.jeddah)
    private readonly jeddahDeliveryOrderRepository: Repository<DeliveryOrder>,
    @InjectRepository(DeliveryOrder, Branch.riyadh)
    private readonly riyadhDeliveryOrderRepository: Repository<DeliveryOrder>,
    private readonly deliveryOrderGateway: DeliveryOrderGateway,
    private readonly smsService: SmsService,
  ) {}

  findAllPaginated(
    query: PaginateQuery,
    driverNumber: number,
    branchName: Branches,
  ): Promise<Paginated<DeliveryOrder>> {
    return paginate(query, this._branchRepostiories[branchName], {
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
    branchName: Branches,
  ): Promise<DeliveryOrder> {
    const deliveryOrder = await this._branchRepostiories[branchName].findOneBy({
      number: deliveryOrderNumber,
      driverNumber,
    });

    if (!deliveryOrder) throw new BadRequestException();

    const updatedDeliveryOrder = await this._branchRepostiories[
      branchName
    ].save({
      ...deliveryOrder,
      seen: true,
    });
    return updatedDeliveryOrder;
  }

  async markAsDelivered(
    deliveryOrderNumber: number,
    markAsDeliveredDto: MarkAsDeliveredDto,
    driverNumber: number,
    branchName: Branches,
  ): Promise<DeliveryOrder> {
    const deliveryOrder = await this._branchRepostiories[branchName].findOneBy({
      driverNumber,
      number: deliveryOrderNumber,
      verificationCode: markAsDeliveredDto.verificationCode,
    });

    if (!deliveryOrder || !deliveryOrder) throw new NotAcceptableException();

    const updatedDeliveryOrder = this._branchRepostiories[branchName].create({
      ...deliveryOrder,
      delivered: true,
      deliveredAt: new Date(),
    });
    await this._branchRepostiories[branchName].save(updatedDeliveryOrder);

    return updatedDeliveryOrder;
  }

  async notifyDriver(sendDataDto: SendDataDto, branchName: Branches) {
    const { deliveryOrderNumber } = sendDataDto;

    const deliveryOrder = await this._branchRepostiories[branchName].findOneBy({
      number: deliveryOrderNumber,
    });

    await this._updateMobileNumber(
      deliveryOrder.number,
      sendDataDto.mobileNumber,
      branchName,
    );

    if (deliveryOrder) {
      const isSent = await this.sendVerificationCodeSms(
        sendDataDto,
        branchName,
      );

      this.deliveryOrderGateway.driversNotifier.notifyObserver(
        deliveryOrder.driverNumber,
        deliveryOrder,
      );

      return isSent;
    }
  }

  async sendVerificationCodeSms(
    sendDataDto: SendDataDto,
    branchName: Branches,
  ): Promise<boolean> {
    const { mobileNumber, deliveryOrderNumber } = sendDataDto;

    await this._updateMobileNumber(
      deliveryOrderNumber,
      sendDataDto.mobileNumber,
      branchName,
    );

    const verificationCode: number =
      await this.findVerificationCodeByDeliveryOrderNumber(
        deliveryOrderNumber,
        branchName,
      );

    if (regEx.saudiaArabiaMobile.test(mobileNumber)) {
      return await this.smsService.send({
        message: `أمر التسليم رقم ${deliveryOrderNumber}
رقم التحقق الخاص به هو ${verificationCode}`,
        mobile: mobileNumber,
      });
    }
  }

  private async _updateMobileNumber(
    deliveryOrderNumber: number,
    mobileNumber: string,
    branchName: Branches,
  ): Promise<void> {
    await this._branchRepostiories[branchName].update(deliveryOrderNumber, {
      customer: { mobileNumber },
    });
  }

  async findVerificationCodeByDeliveryOrderNumber(
    deliveryOrderNumber: number,
    branchName: Branches,
  ): Promise<number> {
    const deliveryOrder = await this._branchRepostiories[branchName]
      .createQueryBuilder('deliveryOrder')
      .where({ number: deliveryOrderNumber })
      .addSelect('verificationCode')
      .getRawOne();

    if (!deliveryOrder) throw new NotFoundException();

    return deliveryOrder.verificationCode;
  }
}
