import { Controller, Get, HttpCode, HttpStatus, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import type { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.NO_CONTENT)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('fetchQuery')
  fetchQuery(@Query('name') name:string) {
    return `Name: ${name}`;
  }
}
