import * as _ from 'lodash';
import * as moment from 'moment';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProjectDocument } from './interfaces/project.interface';
import { CreateProjectDto } from './dto/create-project.dto';
import { IDeletedEntitiesResponse } from '../common/interfaces/deleted-entities-response.interface';
import { IUpdatedEntitiesResponse } from '../common/interfaces/updated-entities-response.interface';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('Project')
    private readonly projectModel: Model<IProjectDocument>,
  ) {}

  generateApiToken(name: string): string {
    const data = name + new Date().getTime().toString();
    return Buffer.from(data).toString('base64');
  }

  async get(): Promise<IProjectDocument[]> {
    return await this.projectModel.find();
  }

  async find(id: string): Promise<IProjectDocument> {
    return await this.projectModel.findOne({ _id: id });
  }

  async create(createProjectDto: CreateProjectDto): Promise<IProjectDocument> {
    const project = await new this.projectModel(
      _.assignIn(createProjectDto, {
        createdAt: moment().toDate(),
        update_at: moment().toDate(),
        token: this.generateApiToken(createProjectDto.name),
      }),
    );
    return project.save();
  }

  async updateToken(id: string): Promise<IUpdatedEntitiesResponse> {
    const project = await this.projectModel.findOne({ _id: id });
    if (!project) throw new NotFoundException();
    const result = await this.projectModel.updateOne(
      { _id: id },
      {
        token: this.generateApiToken(project.name),
        updatedAt: moment().toDate(),
      },
    );
    return {
      success: !!result.ok,
      updatedCount: result.n,
      data: await this.find(id),
    };
  }

  async remove(id: string): Promise<IDeletedEntitiesResponse> {
    const isExists = await this.projectModel.exists({ _id: id });
    if (!isExists) throw new NotFoundException();
    //TODO enable soft delete
    const result = await this.projectModel.deleteOne({ _id: id });
    return { success: !!result.ok, deletedCount: result.n };
  }
}
