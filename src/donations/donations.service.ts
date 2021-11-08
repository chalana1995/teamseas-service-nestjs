import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { OrderByParams } from 'src/graphql';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDonationInput } from './dto/create-donation.input';
import { UpdateDonationInput } from './dto/update-donation.input';

@Injectable()
export class DonationsService {

  constructor(private prisma:PrismaService){}

  create(createDonationInput: Prisma.DonationCreateInput) {
    return this.prisma.donation.create({
      data: createDonationInput
    })
  }

  findAll(orderBy?: OrderByParams) {
    const {field = 'createdAt', direction = 'desc'} = orderBy || {}
    return this.prisma.donation.findMany({
      orderBy: {[field]: direction}
    });
  }

  findOne(donationWhereUniqueInput: Prisma.DonationWhereUniqueInput) {
    return this.prisma.donation.findUnique({
      where: donationWhereUniqueInput
    })
  }

  async getTotal(){
    const response = await this.prisma.donation.aggregate({
      _sum: {
        count: true
      }
    })

    return response._sum.count;
  }
}
