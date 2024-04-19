import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { FrReq } from './fr_req.model';
import { FrReqService } from './fr_req.service';
import {
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('api/v1/fr_req')
export class FrReqController {
  constructor(private readonly frReqService: FrReqService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все транспортные заявки' })
  @ApiOkResponse({
    description: 'Все транспортные заявки',
    schema: {
      type: 'array',
      example: [
        [
          {
            id: 1,
            timestamp: '2024-04-17T05:02:10.692Z',
            client_brand: 'Магнит',
            freighter_name: 'Иванов Иван Иванович',
            phone: '+79999999998',
            comment: 'Накладные прибудут во вторник',
            status: 'новая',
            ati: 'https://ati.su/firms/29056/info',
          },
          {
            id: 2,
            timestamp: '2024-04-17T07:19:32.203Z',
            client_brand: 'Магнит',
            freighter_name: 'Петров Денис Андреевич',
            phone: '+79999999999',
            comment: 'Доставить срочно',
            status: 'в работе',
            ati: 'https://ati.su/firms/28267/info',
          },
          {
            id: 3,
            timestamp: '2024-04-17T07:23:07.722Z',
            client_brand: 'Магнит',
            freighter_name: 'Сидоров Андрей Сергеевич',
            phone: '+79999999995',
            comment: null,
            status: 'в работе',
            ati: 'https://ati.su/firms/35896/info',
          },
          {
            id: 5,
            timestamp: '2024-04-18T07:06:58.111Z',
            client_brand: 'Пятерочка',
            freighter_name: 'Иванов Иван Иванович',
            phone: '+79999999998',
            comment: 'Доставить к завтрашнему дню',
            status: 'завершено',
            ati: 'https://ati.su/firms/29056/info',
          },
        ],
      ],
    },
  })
  async getAllFrReq(): Promise<FrReq[]> {
    return this.frReqService.getAllFrReq();
  }

  @Post()
  @ApiOperation({ summary: 'Создать новую транспортную заявку' })
  @ApiBody({
    type: FrReq,
    description: 'Новая заявка',
    examples: {
      a: {
        summary: 'Новая заявка',
        description: 'Тело запроса для новой заявки',
        value: {
          client_brand: 'Пятерочка',
          freighter_name: 'Иванов Иван Иванович',
          phone: '+79999999998',
          comment: 'Доставить к завтрашнему дню',
          ati: 'https://ati.su/firms/29056/info',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Новая транспортная заявка',
    schema: {
      example: {
        id: 5,
        timestamp: '2024-04-18T07:06:58.111Z',
        client_brand: 'Пятерочка',
        freighter_name: 'Иванов Иван Иванович',
        phone: '+79999999998',
        comment: 'Доставить к завтрашнему дню',
        status: 'новая',
        ati: 'https://ati.su/firms/29056/info',
      },
    },
  })
  async postFrReq(@Body() postData: FrReq): Promise<FrReq> {
    return this.frReqService.createFrReq(postData);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить конкретную транспортную заявку' })
  @ApiParam({
    name: 'id',
    description: 'Номер заявки',
  })
  @ApiOkResponse({
    description: 'Транспортная заявка',
    schema: {
      example: {
        id: 5,
        timestamp: '2024-04-18T07:06:58.111Z',
        client_brand: 'Пятерочка',
        freighter_name: 'Иванов Иван Иванович',
        phone: '+79999999998',
        comment: 'Доставить к завтрашнему дню',
        status: 'новая',
        ati: 'https://ati.su/firms/29056/info',
      },
    },
  })
  async getFrReq(@Param('id') id: number): Promise<FrReq | null> {
    return this.frReqService.getFrReq(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить транспортную заявку' })
  @ApiParam({
    name: 'id',
    description: 'Номер заявки',
  })
  @ApiOkResponse({
    description: 'Транспортная заявка',
    schema: {
      example: {
        id: 5,
        timestamp: '2024-04-18T07:06:58.111Z',
        client_brand: 'Пятерочка',
        freighter_name: 'Иванов Иван Иванович',
        phone: '+79999999998',
        comment: 'Доставить к завтрашнему дню',
        status: 'завершено',
        ati: 'https://ati.su/firms/29056/info',
      },
    },
  })
  async deleteReq(@Param('id') id: number): Promise<FrReq> {
    return this.frReqService.deleteFrReq(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Изменить транспортную заявку' })
  @ApiParam({
    name: 'id',
    description: 'Номер заявки',
  })
  @ApiBody({
    type: FrReq,
    description: 'Новая заявка',
  })
  @ApiOkResponse({
    description: 'Транспортная заявка',
    schema: {
      example: {
        id: 5,
        timestamp: '2024-04-18T07:06:58.111Z',
        client_brand: 'Пятерочка',
        freighter_name: 'Иванов Иван Иванович',
        phone: '+79999999998',
        comment: 'Доставить к завтрашнему дню',
        status: 'завершено',
        ati: 'https://ati.su/firms/29056/info',
      },
    },
  })
  async updateFrReq(
    @Param('id') id: number,
    @Body() postData: FrReq,
  ): Promise<FrReq> {
    return this.frReqService.updateFrReq(id, postData);
  }
}
