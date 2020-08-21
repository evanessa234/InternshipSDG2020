import { IsAuthUserDirective, IsAuthDirective } from './auth.directive';
import { IsAdminDirective, IsDQADirective, IsHODDirective} from './role.directive';
export const schemaDirectives = {
    isAuth: IsAuthDirective,
    isAuthUser: IsAuthUserDirective,
    isHOD: IsHODDirective,
    isAdmin: IsAdminDirective,
    isDQA: IsDQADirective
};