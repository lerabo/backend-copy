import { Body, Controller, Get, Post, Param, Query, Put } from '@nestjs/common';
import { CategoryEntity } from 'src/entities/category.entity';
import { ProfileDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';
import { FindUserDto } from './profile-filter.dto';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('category')
  getAllCategories(): Promise<CategoryEntity[]> {
    return this.profileService.getAllCategories();
  }

  @Get('skills')
  getAllSkills() {
    return this.profileService.getAllSkills();
  }

  @Get('allItem')
  getAllProfile() {
    return this.profileService.getAllProfile();
  }

  @Get('filter')
  async findAll(@Query() userQuery: FindUserDto) {
    const profileInfo = await this.profileService.queryBuilderSkills('skillsprofile');
    const filterProfile = await this.profileService.paginationFilter(userQuery, profileInfo);

    if (userQuery.sort) {
      filterProfile.orderBy('skillsprofile.price', 'ASC');
    }
    let filter = await filterProfile.getMany();

    const Paginate = async () => {
      if (userQuery.page && filterProfile) {
        const limit = 6;
        const page = parseInt(userQuery.page) || 1;
        const total = filter.length;
        const lastProfileIndex = page * limit;
        const firstProfileIndex = lastProfileIndex - limit;
        filter = filter?.slice(firstProfileIndex, lastProfileIndex);
        return {
          total,
          page,
          limit,
        };
      }
    };
    const singlePage = await Paginate();

    return {
      profile: filter,
      total: singlePage?.total,
      page: singlePage?.page,
      last_page: Math.ceil(singlePage?.total / singlePage?.limit),
      limit: 6,
    };
  }

  @Get('savedTalent')
  async findSavedTalent(@Query('page') page: string) {
    let savedTalent = await (await this.profileService.querySavedTalent('savedtalent')).getMany();

    const Paginate = async () => {
      if (page) {
        const limit = 6;
        const pageInt = parseInt(page) || 1;
        const total = savedTalent.length;
        const lastProfileIndex = pageInt * limit;
        const firstProfileIndex = lastProfileIndex - limit;
        savedTalent = savedTalent?.slice(firstProfileIndex, lastProfileIndex);
        return {
          total,
          page,
          limit,
        };
      }
    };
    const singlePage = await Paginate();

    return {
      profile: savedTalent,
      total: singlePage?.total,
      page: singlePage?.page,
      limit: 6,
    };
  }

  @Get(':id')
  getProfileSettings(@Param('id') id: number) {
    return this.profileService.getProfileSettings(Number(id));
  }

  @Put(':id')
  updateSingleProfile(@Param('id') id: number, @Body() saved: { saved: boolean }) {
    return this.profileService.updateSingleProfile(Number(id), saved);
  }

  @Post()
  saveProfile(@Body() profileDto: ProfileDto) {
    return this.profileService.saveProfile(profileDto);
  }
}
