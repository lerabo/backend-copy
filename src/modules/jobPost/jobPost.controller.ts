import { Body, Controller, Get, Post, Param, Patch, Delete, Put } from '@nestjs/common';
import { JobPostDto } from './dto/jobPost.dto';
import { JobPostService } from './jobPost.service';
import { UpdateJobPostDto } from './dto/update-job-post';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JobPostEntity } from 'src/entities/jobPost.entity';

@ApiTags('Job Post')
@Controller('jobPost')
export class JobPostController {
  constructor(private jobPostService: JobPostService) {}

  @ApiOperation({ summary: 'Get job post by Id' })
  @ApiResponse({ status: 200, type: JobPostEntity })
  @Get(':id')
  getJobPost(@Param('id') id: number) {
    return this.jobPostService.getJobPost(Number(id));
  }

  @ApiOperation({ summary: 'Get All Job Posts by user' })
  @ApiResponse({ status: 200, type: [JobPostEntity] })
  @Get('user/:id')
  getJobPostByUser(@Param('id') userId: number) {
    return this.jobPostService.getJobPostByUser(Number(userId));
  }

  @ApiOperation({ summary: 'All Job Posts' })
  @ApiResponse({ status: 200, type: [JobPostEntity] })
  @Get()
  getAllJobPost() {
    return this.jobPostService.getAllJobPost();
  }

  @ApiOperation({ summary: 'Create Job Post' })
  @ApiResponse({ status: 200, type: JobPostEntity })
  @Post()
  saveJobPost(@Body() jobPostDto: JobPostDto) {
    return this.jobPostService.saveJobPost(jobPostDto);
  }

  @ApiOperation({ summary: 'Update Job Post by Id' })
  @ApiResponse({ status: 200, type: JobPostEntity })
  @Patch(':id')
  updatePost(@Param('id') id: number, @Body() updateJobPostDto: UpdateJobPostDto) {
    return this.jobPostService.updatePost(id, updateJobPostDto);
  }

  @ApiOperation({ summary: 'Delete Job Post by Id' })
  @ApiResponse({ status: 200, type: JobPostEntity })
  @Delete(':id')
  deletePost(@Param('id') id: number) {
    return this.jobPostService.deletePost(id);
  }
}
