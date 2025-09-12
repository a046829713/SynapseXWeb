import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HeaderComponent } from './app/components/header/header.component';
import { NavbarComponent } from './app/components/navbar/navbar.component';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
bootstrapApplication(HeaderComponent).catch((err) => console.error(err));
bootstrapApplication(NavbarComponent).catch((err) => console.error(err));