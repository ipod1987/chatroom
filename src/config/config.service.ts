export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.APPLICATION_SERVICE_PORT;
    this.envConfig.dataCoreService = {
      options: {
        port: process.env.DATACORE_SERVICE_PORT_TCP,
        host: process.env.DATACORE_SERVICE_HOST,
      },
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
