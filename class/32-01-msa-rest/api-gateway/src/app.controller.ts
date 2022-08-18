import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    // private readonly appService: AppService,
    @Inject('AUTH_SERVICE')
    private readonly clientAuthService: ClientProxy, //
    @Inject('RESOURCE_SERVICE')
    private readonly clientResourceService: ClientProxy,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Post('/auth/login')
  login(
    @Body() body: any, //
  ): Observable<string> {
    // auth 서비스로 트래픽 넘겨줌
    const { email, password } = body;

    return this.clientAuthService.send(
      { cmd: 'login' }, //
      { email, password },
    );
  }

  @Get('/boards')
  fetchBoards(): Observable<string> {
    // resource 서비스로 트래픽 넘겨줌
    return this.clientResourceService.send({ cmd: 'fetchBoards' }, {});
  }
}
