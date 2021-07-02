import { Injectable, NestMiddleware } from '@nestjs/common';
import * as atob from 'atob';
import { Constants } from 'src/utils/constant';
import * as JWT from 'jsonwebtoken';
import { UnauthorizedException } from 'src/utils/generalExceptions';
import { EnterpriseService } from 'src/entities/enterprise/enterprise.service';

@Injectable()
export class SONRMiddleware implements NestMiddleware {
  constructor(private _enterpriseService: EnterpriseService) { }

  async use(req, res, next) {
    if (req.headers && req.headers.key) {
      const keyAuthorization = req.headers.key.toString();
      if (keyAuthorization) {
        const parts = keyAuthorization.split(' ');
        if (parts.length === 2) {
          const keyScheme = parts[0];
          const keyCredentials = parts[1];
          if (/^Bearer$/i.test(keyScheme)) {
            const token = atob(keyCredentials);
            const publicKeySend = Constants.jwtKeys('publicKey');
            let decoded: any = {};
            try {
              decoded = JWT.verify(token, publicKeySend);
            } catch (error) {
              throw new UnauthorizedException();
            }

            if (decoded.key == Constants.parametersLuxury().key) {

              let urlSearch = req.baseUrl;
              if (req.method == 'PUT' || req.method == 'DELETE') {
                urlSearch = req.baseUrl.substring(
                  0,
                  req.baseUrl.lastIndexOf('/'),
                );
              }
              //   const listUrlAccess = Constants.listUrlAccess();

              //   const indexUrl = listUrlAccess.findIndex(
              //     item =>
              //       item.url == urlSearch &&
              //       item.method == req.method &&
              //       item.token_required == false,
              //   );
              if (1 == 1) {
                //if (indexUrl >= 0) {

                const enterpriseConection = this._enterpriseService;
                const configEnterprise: any = {};
                configEnterprise.dbconn = Constants.parametersLuxury().conexionConnect;

                const infoEnterprise = await enterpriseConection.findAll(
                  configEnterprise,
                  {
                    key: decoded.key
                    /* allowed_api_request_hosts: [req.headers.host], */
                  },
                );

                if (infoEnterprise.length > 0) {
                  req.config = {
                    tenant: infoEnterprise[0].tenant,
                    dbconn: infoEnterprise[0].database_connection,
                  };
                  req.rol = decoded.rol;
                  next();
                } else {
                  throw new UnauthorizedException();
                }
              } else {
                throw new UnauthorizedException();
              }
            } else {
              throw new UnauthorizedException();
            }
          } else {
            throw new UnauthorizedException();
          }
        } else {
          throw new UnauthorizedException();
        }
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
