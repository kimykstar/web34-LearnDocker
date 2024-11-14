import { ForbiddenException, UseGuards, applyDecorators } from '@nestjs/common';
import { Injectable, CanActivate } from '@nestjs/common';

@Injectable()
class HideInProductionGuard implements CanActivate {

  canActivate(): boolean {
    if (process.env.NODE_ENV === 'prod') {
        throw new ForbiddenException('This API is only available in development mode.');
    }
    return true;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HideInProduction = () => {
  return applyDecorators(
    UseGuards(HideInProductionGuard),
  );
}