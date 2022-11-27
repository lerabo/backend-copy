import { Injectable, NotFoundException, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientSettingsEntity } from 'src/entities/clientSetttings.entity';
import { ClientSettingsDto } from './dto/clientSettings.dto';

@Injectable()
export class ClientSettingsService {
  constructor(
    @InjectRepository(ClientSettingsEntity)
    private clientSettingsRepository: Repository<ClientSettingsEntity>,
  ) {}

  async getClientInfo(id: number) {
    const info = await this.clientSettingsRepository.findOne({
      where: {
        id: id,
      },
    });
    if (info) {
      return info;
    }
    throw new NotFoundException(id);
  }

  async getClientInfoByUser(userId: number) {
    const clientInfoByUser = await this.clientSettingsRepository
      .createQueryBuilder('ClientSettings')
      .where('ClientSettings.userId = :userId', { userId })
      .getOne();

    if (!clientInfoByUser) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'user post not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return clientInfoByUser;
  }

  async getAllClientsInfo() {
    const clientInfo = await this.clientSettingsRepository.createQueryBuilder('ClientSettings').getMany();
    return clientInfo;
  }

  async saveClientInfo(clientInfoDto: ClientSettingsDto) {
    try {
      const newClientInfo = new ClientSettingsEntity();
      newClientInfo.name = clientInfoDto.name;
      newClientInfo.country = clientInfoDto.country;
      newClientInfo.photo = clientInfoDto.photo;
      newClientInfo.website = clientInfoDto.website;
      newClientInfo.industry = clientInfoDto.industry;
      newClientInfo.quantity = clientInfoDto.quantity;
      newClientInfo.description = clientInfoDto.description;
      newClientInfo.userId = clientInfoDto.userId;
      const info = await this.clientSettingsRepository.save(newClientInfo);
      return info;
    } catch (error) {
      console.log(error);
    }
  }
  async updateClientInfo(id: number, updateClientSettingsDto: ClientSettingsDto) {
    const findedInfo = await this.clientSettingsRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!findedInfo) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `client info with id:${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      const updatedInfo = await this.clientSettingsRepository.update(id, updateClientSettingsDto);
      return updatedInfo;
    } catch (error) {
      console.log(error);
    }
  }
}
