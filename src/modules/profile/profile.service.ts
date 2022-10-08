import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CategoryEntity } from 'src/entities/category.entity';
import { ProfileEntity } from 'src/entities/profile/profile.entity';
import { SkillsEntity } from 'src/entities/skills.entity';
import { ProfileDto } from './dto/profile.dto';
import { FindUserDto } from './profile-filter.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(SkillsEntity)
    private skillsRepository: Repository<SkillsEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllCategories(): Promise<CategoryEntity[]> {
    const allCategories = await this.categoryRepository.find();
    return allCategories;
  }

  async getAllSkills(): Promise<SkillsEntity[]> {
    const allSkills = await this.skillsRepository.find();
    return allSkills;
  }
  async getAllProfile(): Promise<ProfileEntity[]> {
    const allProfile = await this.profileRepository.find();
    return allProfile;
  }

  async updateSingleProfile(id: number, save: { saved: boolean }) {
    const { saved } = save;
    if (id && save) {
      await this.profileRepository.update({ id: id }, { saved: saved });
      return save;
    }
    throw new NotFoundException(id);
  }

  async getProfileSettings(id: number) {
    const profile = await this.profileRepository.findOne({
      where: {
        userId: id,
      },
      relations: ['experience', 'education', 'skills', 'category'],
    });
    if (profile) {
      const setting = await this.userRepository
        .createQueryBuilder('Setting')
        .leftJoin(`Setting.userId`, 'profile')
        .where('Setting.userId = :userId', { userId: profile?.userId })
        .getOne();
      return {
        profile,
        setting,
      };
    }
    throw new NotFoundException(id);
  }
  async getProfile(alias: string) {
    return this.profileRepository
      .createQueryBuilder(alias)
      .innerJoinAndSelect(`${alias}.skills`, 'skills')
      .addSelect('skills.name')
      .innerJoinAndSelect(`${alias}.category`, 'category')
      .addSelect('category.name')
      .innerJoinAndSelect(`${alias}.userId`, 'user')
      .where(`${alias}.userId = :userId`, { userId: 'user.userId' });
  }
  async queryBuilderSkills(alias: string) {
    return this.getProfile(alias);
  }
  async querySavedTalent(alias: string) {
    return (await this.getProfile(alias)).where(`${alias}.saved = :saved`, { saved: true });
  }

  async paginationFilter(query: FindUserDto, profile: SelectQueryBuilder<ProfileEntity>) {
    const skillQuery = query.skills ? query.skills.split(',') : null;
    const search = `%${query.search}%`;
    const category = query.category;

    profile
      .where(search ? 'skillsprofile.position LIKE :search OR skillsprofile.description LIKE :search' : 'TRUE', {
        search,
      })
      .andHaving(category ? 'category.name LIKE :category' : 'TRUE', {
        category: category,
      })
      .andHaving(query.skills ? 'skills.name IN (:skills)' : 'TRUE', {
        skills: skillQuery,
      });

    return profile;
  }

  async saveProfile(profileDto: ProfileDto) {
    try {
      const newProfile = new ProfileEntity();
      newProfile.photo = profileDto.photo;
      newProfile.position = profileDto.position;
      newProfile.price = profileDto.price;
      newProfile.englishLevel = profileDto.englishLevel;
      newProfile.description = profileDto.description;
      newProfile.category = profileDto.category;
      newProfile.education = profileDto.education;
      newProfile.experience = profileDto.experience;
      newProfile.skills = profileDto.skills;
      newProfile.userId = profileDto.userId;
      const profile = await this.profileRepository.save(newProfile);
      console.log(profile);
      return profile;
    } catch (error) {
      console.log(error);
    }
  }
}
