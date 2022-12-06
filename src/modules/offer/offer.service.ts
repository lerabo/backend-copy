import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, UpdateResult } from 'typeorm';
import { OfferEntity } from 'src/entities/offer.entity';
import { OfferDto } from './dto/jobOffer.dto';
import { UpdateOfferDto } from './dto/update.offer.dto';
import { client, DateOrders, freelancer, Status } from './dto/offer.types';
import { FindContractDto } from './dto/contract.offer.dto';

@Injectable()
export class OfferPostService {
  constructor(
    @InjectRepository(OfferEntity)
    private offerRepository: Repository<OfferEntity>,
  ) {}

  async getJobOfferByProfile(id: number, freelancerId: number, clientId: number): Promise<OfferEntity> {
    const profile = await this.offerRepository
      .createQueryBuilder('getOffer')
      .where('getOffer.jobPostId = :jobId', { jobId: id })
      .andHaving('getOffer.clientId = :clientId', { clientId: clientId })
      .andHaving('getOffer.freelancerId = :id', { id: freelancerId })
      .getOne();
    if (profile) {
      return profile;
    }
    throw new NotFoundException(id);
  }
  async updateJobOfferByProfile(offerDto: OfferDto): Promise<UpdateResult> {
    const updateOffer = await this.offerRepository
      .createQueryBuilder('offer')
      .update(OfferEntity)
      .set({
        price: offerDto.price,
        startDate: offerDto.startDate,
        endDate: offerDto.endDate,
        name: offerDto.name,
      })
      .where(`offer.freelancerId = ${offerDto.freelancerId}`)
      .andWhere(`offer.jobPostId = ${offerDto.jobPostId}`)
      .andWhere(`offer.clientId = ${offerDto.clientId}`)
      .execute();
    if (updateOffer) {
      return updateOffer;
    } else {
      throw new NotFoundException(offerDto.freelancerId);
    }
  }

  async saveJobOffer(data: OfferDto): Promise<UpdateResult | OfferEntity> {
    try {
      return await this.offerRepository.save({
        price: data.price,
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        jobPostId: { id: data.jobPostId },
        clientId: { id: data.clientId },
        freelancerId: { id: data.freelancerId },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getJobOffer(): Promise<OfferEntity[]> {
    const allOffer = await this.offerRepository.find();
    return allOffer;
  }

  async updateJobOffer(
    jobId: number,
    freelancerId: number,
    clientId: number,
    statusOffer: UpdateOfferDto,
  ): Promise<UpdateResult> {
    const { status } = statusOffer;
    const existOffer = await this.offerRepository
      .createQueryBuilder('offer')
      .update(OfferEntity)
      .set({
        status: status,
      })
      .where('offer.jobPostId = :jobId', { jobId: jobId })
      .andWhere('offer.freelancerId = :id', { id: freelancerId })
      .andWhere('offer.clientId = :clientId', { clientId: clientId })
      .execute();

    if (existOffer) {
      return existOffer;
    } else {
      throw new NotFoundException(jobId);
    }
  }

  async getOfferAccepted(userId: number, role: string, query: FindContractDto): Promise<OfferEntity[]> {
    const category = query.status;
    const date = query.date as DateOrders;
    if (role === freelancer) {
      try {
        const contract = await this.offerRepository
          .createQueryBuilder('freelancer')
          .leftJoinAndSelect('freelancer.clientId', 'user')
          .leftJoinAndSelect('user.clientSetting', 'clientInfo')
          .leftJoinAndSelect('freelancer.jobPostId', 'job_post_entity')
          .where(`freelancer.freelancerId = ${userId}`)
          .andHaving(category ? 'freelancer.status LIKE :status AND freelancer.status  != :declined ' : 'TRUE', {
            status: category,
            declined: 'rejected',
          })
          //.andHaving('freelancer.status != :pending', { pending: 'pending' })
          .orderBy('freelancer.startDate', date === 'ASC' ? 'ASC' : 'DESC')
          .getMany();
        return contract;
      } catch (error) {
        console.log(error);
      }
    } else if (role === client) {
      try {
        const contract = await this.offerRepository
          .createQueryBuilder('client')
          .leftJoinAndSelect('client.freelancerId', 'user')
          .leftJoinAndSelect('user.profileSetting', 'profile')
          .leftJoinAndSelect('client.jobPostId', 'job_post_entity')
          .where(`client.clientId = ${userId}`)
          .andHaving(category ? 'client.status LIKE :status AND client.status  != :declined' : 'TRUE', {
            status: category,
            declined: 'rejected',
          })
          //.andHaving('client.status != :pending', { pending: 'pending' })
          .orderBy('client.startDate', date === 'ASC' ? 'ASC' : 'DESC')
          .getMany();
        return contract;
      } catch (error) {
        console.log(error);
      }
    }
  }

  async updateExpiredStatus(updateOfferExpired: UpdateOfferDto): Promise<UpdateOfferDto> {
    const { status, id } = updateOfferExpired;
    try {
      await this.offerRepository
        .createQueryBuilder('contract')
        .update(OfferEntity)
        .set({ status: status })
        .where({ id: In(id) })
        .execute();
      return updateOfferExpired;
    } catch (error) {
      throw new NotFoundException(id);
    }
  }
}
