import { Module } from '@nestjs/common';
import { OperationModule } from './operation/operation.module';
import { UserModule } from './user/user.module';
import { FunctionalityModule } from './functionality/functionality.module';


@Module({
    imports: [
        OperationModule,
        UserModule,
        FunctionalityModule,
    ],
    controllers: [],
})
export class IdentityModule {}
