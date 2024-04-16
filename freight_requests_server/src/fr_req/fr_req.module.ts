import { Module } from '@nestjs/common';
import { FrReqController } from './fr_req.controller';
import { FrReqService } from './fr_req.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FrReqController],
  providers: [FrReqService, PrismaService],
})
export class FrReqModule {}
