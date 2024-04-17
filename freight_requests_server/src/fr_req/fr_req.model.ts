import { Prisma } from '@prisma/client';

export class FrReq implements Prisma.FrReqCreateInput {
  id: number;
  timestamp: string | Date;
  client_brand: string;
  freighter_name: string;
  phone: string;
  comment?: string;
  status: string;
  ati: string;
}
