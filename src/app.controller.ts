import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import type { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  fetchConfig(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;
    const queryParams = req.query;
    const userAgent = req.headers['user-agent'];
    return res.send(`<script>
        console.log("id: ", ${id});
        console.log("queryParams: ", ${JSON.stringify(queryParams)});
        console.log("User Agent: ", '${userAgent}');
      </script>`);
  }
}
