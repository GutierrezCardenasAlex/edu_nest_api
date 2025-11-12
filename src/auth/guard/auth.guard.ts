import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { jwtConstants } from '../constants/jwt.constant';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    console.log('HEADERS RECIBIDOS:', request.headers);
    console.log('Authorization header:', request.headers.authorization);

    const token = this.extractTokenFromHeader(request);
    
    console.log('Token extraído:', token ? 'SÍ' : 'NO'); // ← AÑADE ESTO

    if (!token) {
      console.log('ERROR: No token provided'); // ← AÑADE ESTO
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      console.log('Token verificado, payload:', payload); // ← AÑADE ESTO
      request['user'] = payload;
    } catch (error) {
      console.log('Token inválido:', error.message);
      throw new UnauthorizedException('Token inválido o expirado');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }

}
