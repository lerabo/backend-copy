import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InviteTalentEntity } from 'src/entities/inviteTalent.entity';
import { InviteTalentDto } from 'src/modules/inviteTalent/dto/inviteTalent.dto';
import { Repository } from 'typeorm';

@Injectable()
export class InviteTalentService {
  constructor(
    @InjectRepository(InviteTalentEntity)
    private inviteTalentRepository: Repository<InviteTalentEntity>,
  ) {}

  async saveInviteMessage(InviteTalentDto: InviteTalentDto) {
    try {
      const newMessage = new InviteTalentEntity();
      newMessage.message = InviteTalentDto.message;
      newMessage.userId = InviteTalentDto.userId;
      newMessage.profileId = InviteTalentDto.profileId;
      newMessage.jobTitle = InviteTalentDto.jobTitle;
      const invitation = await this.inviteTalentRepository.save(newMessage);
      return invitation;
    } catch (e) {
      console.log(e);
    }
  }
}
