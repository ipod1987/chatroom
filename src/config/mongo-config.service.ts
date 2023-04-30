import { ConfigService } from '@nestjs/config';
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose';

export class MongoConfigService implements MongooseOptionsFactory {
  async getMongooseOptions(): Promise<MongooseModuleOptions> {
    return {
      uri: new ConfigService().getOrThrow('MONGO_URI'),
    };
  }

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: new ConfigService().getOrThrow('MONGO_URI'),
    };
  }
}
