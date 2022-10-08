import { Body, Controller, Post } from '@nestjs/common';
import { InviteTalentDto } from 'src/modules/inviteTalent/dto/inviteTalent.dto';
import { InviteTalentService } from 'src/modules/inviteTalent/inviteTalent.service';

@Controller('invite-talent')
export class InviteTalentController {
  constructor(private inviteTalentService: InviteTalentService) {}

  @Post()
  saveInviteMessage(@Body() inviteTalentDto: InviteTalentDto) {
    return this.inviteTalentService.saveInviteMessage(inviteTalentDto);
  }
}
