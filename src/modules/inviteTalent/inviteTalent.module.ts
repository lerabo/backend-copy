import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InviteTalentEntity } from 'src/entities/inviteTalent.entity';
import { InviteTalentService } from 'src/modules/inviteTalent/inviteTalent.service';
import { InviteTalentController } from 'src/modules/inviteTalent/inviteTalent.controller';
import { ProfileEntity } from 'src/entities/profile/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InviteTalentEntity, ProfileEntity])],
  providers: [InviteTalentService],
  controllers: [InviteTalentController],
})
export class InviteTalentModule {}
