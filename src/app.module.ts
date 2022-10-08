import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleStrategy } from './google.strategy';
import { ProfileModule } from './modules/profile/profile.module';
import { MailerModule } from '@nestjs-modules/mailer/dist/mailer.module';
import { SettingsInfoModule } from './modules/settingsInfo/settingsInfo.module';
import { JobPostModule } from './modules/jobPost/jobPost.module';
import { ProposalPostModule } from './modules/proposal/proposal.module';
import { ClientSettingsModule } from './modules/clientSettings/clientSettings.module';
import { InviteTalentModule } from 'src/modules/inviteTalent/inviteTalent.module';
import { AppGateway } from './app.gateway';
import { ChatRoomModule } from './modules/chat-room/chat-room.module';
import { MessageModule } from './modules/message/message.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        AuthModule,
        ProfileModule,
        JobPostModule,
        ProposalPostModule,
        InviteTalentModule,
        ClientSettingsModule,
        ChatRoomModule,
        MessageModule,
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USERNAME'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [__dirname + '/entities/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        logging: true,
        migrationsRun: false,
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.sendgrid.net',
          port: 587,
          auth: {
            user: 'apikey',
            pass: configService.get<string>('SENDGRID_PASSWORD'),
          },
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    ConfigModule,
    AuthModule,
    ProfileModule,
    SettingsInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, AppGateway],
})
export class AppModule {}
