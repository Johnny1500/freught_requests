import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FrReq } from './fr_req.model';

@Injectable()
export class FrReqService {
  constructor(private prisma: PrismaService) {}

  async getAllFrReq(): Promise<FrReq[]> {
    return this.prisma.frReq.findMany();
  }

  async getFrReq(id: number): Promise<FrReq | null> {
    return this.prisma.frReq.findUnique({ where: { id: Number(id) } });
  }

  async createFrReq(data: FrReq): Promise<FrReq> {
    return this.prisma.frReq.create({
      data,
    });
  }

  async updateFrReq(id: number, data: FrReq): Promise<FrReq> {
    const {
      timestamp,
      client_brand,
      freighter_name,
      phone,
      comment,
      status,
      ati,
    } = data;

    return this.prisma.frReq.update({
      where: { id: Number(id) },
      data: {
        timestamp,
        client_brand,
        freighter_name,
        phone,
        comment,
        status,
        ati,
      },
    });
  }

  async deleteFrReq(id: number): Promise<FrReq> {
    return this.prisma.frReq.delete({
      where: { id: Number(id) },
    });
  }
}
