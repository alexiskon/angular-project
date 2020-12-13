import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BugFormComponent } from '../data-form/bug-form/bug-form.component';

@Injectable({
  providedIn: 'root'
})
export class UnsubmittedFormGuard implements CanDeactivate<BugFormComponent> {
  canDeactivate(
    component: BugFormComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean {
      if (!component.canDeactivate()) {
        return window.confirm("Are you sure you want to leave the page?");
      }
      return true;
    }
}
