import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Health Check' })
  @ApiResponse({
    status: 200,
    description: 'API online',
    schema: {
      example: {
        status: 'online',
        environment: 'development',
        database: 'connected',
      },
    },
  })
  healthCheck() {
    return {
      status: 'online',
      environment: process.env.NODE_ENV || 'development',
      database: 'connected',
    };
  }
}
