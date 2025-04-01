import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { HomeModule } from './Home/home.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { loaderInterceptor } from './core/Interceptor/loader.interceptor';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      closeButton: true,
      positionClass: 'toast-top-right',
      countDuplicates: true,
      timeOut:1500,
      progressBar:true,
    }),
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptorsFromDi()),
    {provide:HTTP_INTERCEPTORS,useClass:loaderInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
