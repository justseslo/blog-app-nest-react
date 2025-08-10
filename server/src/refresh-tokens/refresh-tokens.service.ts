import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  RefreshToken,
  RefreshTokenDocument,
} from './schemas/refresh-token.schema';
import { Model } from 'mongoose';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';

@Injectable()
export class RefreshTokensService {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshTokenDocument>,
  ) {}
  async create(createRefreshTokenDto: CreateRefreshTokenDto) {
    await this.refreshTokenModel.create(createRefreshTokenDto);
  }
  async delete(token: string) {
    await this.refreshTokenModel.findOneAndDelete({ token });
  }
  async getToken(token:string){
    return await this.refreshTokenModel.findOne({token})
  }
}
