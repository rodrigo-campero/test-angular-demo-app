import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiPrefix } from './interceptors/api-prefix.interceptor';
import { ErrorsHandler } from './interceptors/errors-handler.interceptor';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefix,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler
    }
  ],
  declarations: [FooterComponent, HeaderComponent]
})
export class CoreModule { }
