import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit {
  // Runtime env vars (read at server startup)
  private readonly runtimePrivateVar = process.env.RUNTIME_PRIVATE_VAR || 'default-value';
  private readonly runtimePublicVar = process.env.RUNTIME_PUBLIC_VAR || 'default-value';

  constructor(private readonly appService: AppService) {}

  onModuleInit() {
    console.log('=== Runtime Variables ===');
    console.log('RUNTIME_PRIVATE_VAR:', this.runtimePrivateVar);
    console.log('RUNTIME_PUBLIC_VAR:', this.runtimePublicVar);
  }

  @Get()
  getHello() {
    return {
      message: 'Hello from NestJS!',
      runtimePrivateVar: this.runtimePrivateVar,
      runtimePublicVar: this.runtimePublicVar,
    };
  }

  @Get('health')
  getHealth() {
    return { status: 'ok' };
  }
}
