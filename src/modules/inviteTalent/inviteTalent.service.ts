import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async getInviteMessageById(id: number): Promise<InviteTalentEntity> {
    if (!id) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'message not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const message = await this.inviteTalentRepository
      .createQueryBuilder('inviteTalent')
      .where('inviteTalent.id = :id', { id })
      .getOne();
    return message;
  }

  async getInviteMessageByProfile(freelancerId: number): Promise<InviteTalentEntity[]> {
    if (!freelancerId) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'user not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const messageOffer = await this.inviteTalentRepository
      .createQueryBuilder('inviteTalent')
      .where('inviteTalent.freelancerId = :freelancerId', { freelancerId })
      .getMany();

    if (!messageOffer.length) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'That user do not have messages',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return messageOffer;
  }

  async getAllInviteMessages(): Promise<InviteTalentEntity[]> {
    const messages = await this.inviteTalentRepository.createQueryBuilder('inviteTalent').getMany();
    return messages;
  }

  async saveInviteMessage(InviteTalentDto: InviteTalentDto): Promise<InviteTalentEntity> {
    try {
      const newMessage = new InviteTalentEntity();
      newMessage.message = InviteTalentDto.message;
      newMessage.clientId = InviteTalentDto.clientId;
      newMessage.freelancerId = InviteTalentDto.freelancerId;
      newMessage.profileId = InviteTalentDto.profileId;
      newMessage.jobPostId = InviteTalentDto.jobPostId;
      newMessage.jobTitle = InviteTalentDto.jobTitle;
      const invitation = await this.inviteTalentRepository.save(newMessage);
      return invitation;
    } catch (e) {
      console.log(e);
    }
  }
}
