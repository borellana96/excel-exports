import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common';
export class ExceptionsInfo {
    static info(exception: string): string {
        switch (exception) {
            case 'BadRequestException':
                {
                    return 'Por favor revise que los campos obligatorios estén correctamente ingresados';
                    break;
                }

            case 'InternalServerErrorException':
                {
                    return 'Lo sentimos, hemos detectado un error, nuestro equipo ya esta trabajando para resolverlo lo mas pronto posible.';
                    break;
                }
            case 'NotFoundException':
                {
                    return 'No se ha podido encontrar la información solicitada.';
                    break;
                }
            case 'UnauthorizedException':
                {
                    return 'Por favor inicie sesión para continuar.';
                    break;
                }
        }
    }
}

export class ExceptionValidator {
    static validateException(ex) {
        switch (ex.status) {
          case HttpStatus.BAD_REQUEST: throw new BadRequestException(ex.message);
          case HttpStatus.BAD_GATEWAY: throw new BadGatewayException(ex.message);
          case HttpStatus.CONFLICT: throw new ConflictException(ex.message);
          case HttpStatus.FORBIDDEN: throw new ForbiddenException(ex.message);
          case HttpStatus.GATEWAY_TIMEOUT: throw new GatewayTimeoutException(ex.message);
          case HttpStatus.GONE: throw new GoneException(ex.message);
        //   case HttpStatus.INTERNAL_SERVER_ERROR: throw new InternalServerErrorException(ex.message); // validar
          case HttpStatus.INTERNAL_SERVER_ERROR: throw new InternalServerErrorException();
          case HttpStatus.PAYLOAD_TOO_LARGE: throw new PayloadTooLargeException(ex.message);
          case HttpStatus.NOT_FOUND: throw new NotFoundException(ex.message);
          case HttpStatus.NOT_IMPLEMENTED: throw new NotImplementedException(ex.message);
          case HttpStatus.NOT_ACCEPTABLE: throw new NotAcceptableException(ex.message);
          case HttpStatus.REQUEST_TIMEOUT: throw new RequestTimeoutException(ex.message);
          case HttpStatus.SERVICE_UNAVAILABLE: throw new ServiceUnavailableException(ex.message);
          case HttpStatus.UNAUTHORIZED: throw new UnauthorizedException(ex.message);
          case HttpStatus.UNPROCESSABLE_ENTITY: throw new UnprocessableEntityException(ex.message);
          case HttpStatus.UNSUPPORTED_MEDIA_TYPE: throw new UnsupportedMediaTypeException(ex.message);
        }
      }
}

export class BadRequestException extends HttpException {
    constructor(specificMessage?: string) {
        const messageSend = specificMessage ? specificMessage : ExceptionsInfo.info('BadRequestException');
        super(messageSend, HttpStatus.BAD_REQUEST);
    }
}

export class BadGatewayException extends HttpException {
    constructor(specificMessage?: string) {
        const messageSend = specificMessage ? specificMessage : 'BAD GATEWAY';
        super(messageSend, HttpStatus.BAD_GATEWAY);
    }
}

export class ConflictException extends HttpException {
    constructor(specificMessage?: string) {
        const messageSend = specificMessage ? specificMessage : 'CONFLICT';
        super(messageSend, HttpStatus.CONFLICT);
    }
}

export class ForbiddenException extends HttpException {
    constructor(specificMessage?: string) {
        const messageSend = specificMessage ? specificMessage : 'FORBIDDEN';
        super(messageSend, HttpStatus.FORBIDDEN);
    }
}

export class GatewayTimeoutException extends HttpException {
    constructor(specificMessage?: string) {
        const messageSend = specificMessage ? specificMessage : 'GATEWAY TIMEOUT';
        super(messageSend, HttpStatus.GATEWAY_TIMEOUT);
    }
}

export class GoneException extends HttpException {
    constructor(specificMessage?: string) {
        const messageSend = specificMessage ? specificMessage : 'GONE';
        super(messageSend, HttpStatus.GONE);
    }
}

export class InternalServerErrorException extends HttpException {
    constructor(specificMessage?: string) {
        const messageSend = specificMessage ? specificMessage : ExceptionsInfo.info('InternalServerErrorException');
        super(messageSend, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export class PayloadTooLargeException extends HttpException {
    constructor(specificMessage?: string) {
        const messageSend = specificMessage ? specificMessage : 'PAYLOAD TOO LARGE';
        super(messageSend, HttpStatus.PAYLOAD_TOO_LARGE);
    }
}

export class NotFoundException extends HttpException {
    constructor(specificMessage?: string) {
        const messageSend = specificMessage ? specificMessage : ExceptionsInfo.info('NotFoundException');
        super(messageSend, HttpStatus.NOT_FOUND);
    }
}

export class NotImplementedException extends HttpException {
    constructor(specificMessage?: string) {
        const messageSend = specificMessage ? specificMessage : 'NOT IMPLEMENTED';
        super(messageSend, HttpStatus.NOT_IMPLEMENTED);
    }
}

export class NotAcceptableException extends HttpException {
    constructor(specificMessage?: string) {
        const messageSend = specificMessage ? specificMessage : 'NOT ACCEPTABLE';
        super(messageSend, HttpStatus.NOT_ACCEPTABLE);
    }
}

export class RequestTimeoutException extends HttpException {
    constructor(specificMessage?: string) {
        const messageSend = specificMessage ? specificMessage : 'REQUEST TIMEOUT';
        super(messageSend, HttpStatus.REQUEST_TIMEOUT);
    }
}

export class ServiceUnavailableException extends HttpException {
    constructor(specificMessage?: string) {
        const messageSend = specificMessage ? specificMessage : 'SERVICE UNAVAILABLE';
        super(messageSend, HttpStatus.SERVICE_UNAVAILABLE);
    }
}

export class UnauthorizedException extends HttpException {
    constructor(specificMessage?: string, recoveryPassword?: boolean) {
        const messageSend = specificMessage ? specificMessage : ExceptionsInfo.info('UnauthorizedException');
        super({ message: messageSend, close_session: true, recoveryPassword }, HttpStatus.UNAUTHORIZED);
    }
}

export class UnprocessableEntityException extends HttpException {
    constructor(specificMessage?: string) {
        const messageSend = specificMessage ? specificMessage : 'UNPROCESSABLE ENTITY';
        super(messageSend, HttpStatus.UNPROCESSABLE_ENTITY);
    }
}

export class UnsupportedMediaTypeException extends HttpException {
    constructor(specificMessage?: string) {
        const messageSend = specificMessage ? specificMessage : 'UNSUPPORTED MEDIA TYPE';
        super(messageSend, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }
}