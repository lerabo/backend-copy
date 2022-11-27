import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { InviteTalentDto } from 'src/modules/inviteTalent/dto/inviteTalent.dto';
import { InviteTalentService } from 'src/modules/inviteTalent/inviteTalent.service';
import { InviteTalentEntity } from 'src/entities/inviteTalent.entity';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Invite talent')
@Controller('invite-talent')
export class InviteTalentController {
  constructor(private inviteTalentService: InviteTalentService) {}

  @ApiOperation({ summary: 'Get invite talent by ID' })
  @ApiResponse({ status: 200, type: InviteTalentEntity })
  @Get(':id')
  getInviteMessageById(@Param('id') id: number): Promise<InviteTalentEntity> {
    return this.inviteTalentService.getInviteMessageById(Number(id));
  }

  @ApiOperation({ summary: 'Get invite freelancer talent by ID' })
  @ApiResponse({ status: 200, type: [InviteTalentEntity] })
  @Get('/freelancer/:id')
  getInviteMessageByProfile(@Param('id') id: number): Promise<InviteTalentEntity[]> {
    return this.inviteTalentService.getInviteMessageByProfile(Number(id));
  }

  @ApiOperation({ summary: 'Get all invite talent' })
  @ApiResponse({ status: 200, type: [InviteTalentEntity] })
  @Get()
  getAllInviteMessages(): Promise<InviteTalentEntity[]> {
    return this.inviteTalentService.getAllInviteMessages();
  }

  @ApiOperation({ summary: 'Create invite talent' })
  @ApiResponse({ status: 200, type: InviteTalentEntity })
  @Post()
  saveInviteMessage(@Body() inviteTalentDto: InviteTalentDto): Promise<InviteTalentEntity> {
    return this.inviteTalentService.saveInviteMessage(inviteTalentDto);
  }
}
