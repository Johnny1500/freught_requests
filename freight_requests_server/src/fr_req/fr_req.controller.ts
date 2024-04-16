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

@Controller('api/v1/fr_req')
export class FrReqController {
  constructor(private readonly frReqService: FrReqService) {}

  @Get()
  async getAllFrReq(): Promise<FrReq[]> {
    return this.frReqService.getAllFrReq();
  }

  @Post()
  async postFrReq(@Body() postData: FrReq): Promise<FrReq> {
    return this.frReqService.createFrReq(postData);
  }

  @Get(':id')
  async getFrReq(@Param('id') id: number): Promise<FrReq | null> {
    return this.frReqService.getFrReq(id);
  }

  @Delete(':id')
  async deleteReq(@Param('id') id: number): Promise<FrReq> {
    return this.frReqService.deleteFrReq(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: number,
    @Body() postData: FrReq,
  ): Promise<FrReq> {
    return this.frReqService.updateFrReq(id, postData);
  }
}
