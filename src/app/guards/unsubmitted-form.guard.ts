import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FormComponent } from '../interfaces/form-component';

@Injectable({
  providedIn: 'root'
})
export class UnsubmittedFormGuard implements CanDeactivate<FormComponent> {
  canDeactivate(
    component: FormComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean {

    if (!component.canDeactivate()) {
      return window.confirm("Are you sure you want to leave the page?");
    }
    return true;
  }

}
