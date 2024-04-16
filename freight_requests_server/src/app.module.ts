import { Module } from '@nestjs/common';
import { FrReqModule } from './fr_req/fr_req.module';

@Module({
  imports: [FrReqModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
