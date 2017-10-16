import { RouterModule, Routes }     from "@angular/router";

import { ConentComponent } from './content.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { SppComponent } from './spp.component';
import { MppComponent } from './mpp.component';
import { PageNotFoundComponent } from './pagenotfound.component';


const routing: Routes = [
    { path: '', component: ConentComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'spp/:id', component: SppComponent},
    { path: 'mpp/:catagory', component: MppComponent},
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
];

export const appRouterModule = RouterModule.forRoot(routing);
