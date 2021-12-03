import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';

export class ActivatedRouteStub {
  private paramsSubject = new ReplaySubject<Params>();

  constructor(initialParams?: Params) {
    this.setParams(initialParams);
  }

  readonly params = this.paramsSubject.asObservable();

  setParams(params: Params = {}) {
    this.paramsSubject.next(convertToParamMap(params));
  }
}
