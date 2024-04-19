import { Prisma } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FrReq implements Prisma.FrReqCreateInput {
  @ApiProperty()
  id: number;
  @ApiProperty({
    type: 'string',
  })
  timestamp: string | Date;
  @ApiProperty()
  client_brand: string;
  @ApiProperty()
  freighter_name: string;
  @ApiProperty()
  phone: string;
  @ApiPropertyOptional()
  comment?: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  ati: string;
}
