// This folder is particularly build to show how 'Gaurds' work in NestJS
// Gaurds approves or rejects the requests on particular conditions we have written in the logics
// You can explore it more at https://docs.nestjs.com/guards

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BeltGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();  // extracting the data from request
    // console.log(request.body); // you can check the given body
    return true;
  }
}
