import { Injectable, NotFoundException, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPostEntity } from 'src/entities/jobPost.entity';
import { JobPostDto } from './dto/jobPost.dto';
import { UpdateJobPostDto } from './dto/update-job-post';

@Injectable()
export class JobPostService {
  constructor(
    @InjectRepository(JobPostEntity)
    private jobPostRepository: Repository<JobPostEntity>,
  ) {}

  async getJobPost(id: number) {
    const job = await this.jobPostRepository.findOne({
      where: {
        id: id,
      },
      relations: ['jobSkills', 'jobCategory'],
    });
    if (job) {
      return job;
    }
    throw new NotFoundException(id);
  }

  async getJobPosts() {
    const job = await this.jobPostRepository.find();
    return job;
  }

  async getJobPostByUser(userId: number) {
    const jobByUser = await this.jobPostRepository
      .createQueryBuilder('JobPost')
      .leftJoinAndSelect('JobPost.jobSkills', 'jobSkills')
      .leftJoinAndSelect('JobPost.jobCategory', 'jobCategory')
      .where('JobPost.userId = :userId', { userId })
      .getMany();

    if (!jobByUser) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'user post not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return jobByUser;
  }

  async getAllJobPost() {
    const jobPost = await this.jobPostRepository
      .createQueryBuilder('JobPost')
      .leftJoinAndSelect('JobPost.jobSkills', 'jobSkills')
      .leftJoinAndSelect('JobPost.jobCategory', 'jobCategory')
      .getMany();

    return jobPost;
  }

  async saveJobPost(jobPostDto: JobPostDto) {
    try {
      const newJob = new JobPostEntity();
      newJob.jobTitle = jobPostDto.jobTitle;
      newJob.jobCategory = jobPostDto.jobCategory;
      newJob.jobSkills = jobPostDto.jobSkills;
      newJob.fromHourRate = jobPostDto.fromHourRate;
      newJob.toHourRate = jobPostDto.toHourRate;
      newJob.jobDuration = jobPostDto.jobDuration;
      newJob.jobDescription = jobPostDto.jobDescription;
      newJob.dateTime = jobPostDto.dateTime;
      newJob.userId = jobPostDto.userId;
      const job = await this.jobPostRepository.save(newJob);
      return job;
    } catch (error) {
      console.log(error);
    }
  }
  async updatePost(id: number, updateJobPostDto: UpdateJobPostDto) {
    const findedPost = await this.jobPostRepository.findOneBy({ id });
    if (!findedPost) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `user post with id:${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      const updatedPost = await this.jobPostRepository.update(id, updateJobPostDto);
      return updatedPost;
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(id: number) {
    const deletedPost = await this.jobPostRepository.delete(id);

    if (deletedPost.affected === 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `user post with id:${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return deletedPost;
  }
}
