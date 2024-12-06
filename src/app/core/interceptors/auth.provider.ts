import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
    ENVIRONMENT_INITIALIZER,
    EnvironmentProviders,
    inject,
    Provider,
} from '@angular/core';

import { AuthService } from '../services/auth.service';
import { authInterceptor } from './auth.interceptor';


export const provideAuth = (): (Provider | EnvironmentProviders)[] => {
    return [
        provideHttpClient(withInterceptors([authInterceptor])),
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(AuthService),
            multi: true,
        },
    ];
};
