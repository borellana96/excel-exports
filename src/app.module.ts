import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArrayConectService } from './connect/array-conect.service';
import { EnterpriseService } from './entities/enterprise/enterprise.service';
import { EntitiesModule } from './entities/entities.module';
import { LDVModule } from './entities/ldv/ldv.module';
import { UserService } from './entities/system-settings/identity/user/user.service';
import { SystemSettingsModule } from './entities/system-settings/system-settings.module';

import * as cors from 'cors';
import * as morgan from 'morgan';
import { SONRMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SystemSettingsModule,
    LDVModule,
    EntitiesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ArrayConectService,
    EnterpriseService,
    UserService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors(), morgan('tiny'), SONRMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
