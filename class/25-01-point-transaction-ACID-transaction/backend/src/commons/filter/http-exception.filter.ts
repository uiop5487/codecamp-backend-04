import { Catch, HttpException, ExceptionFilter } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exeption: HttpException) {
    const status = exeption.getStatus();
    const message = exeption.message;

    console.log('====================================');

    console.log('예외 발생');
    console.log('예외내용: ', message);
    console.log('예외코드', status);

    console.log('====================================');
  }
}
