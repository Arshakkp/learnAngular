import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private router:Router,) { }
  public navigate(path:string,) { 
    this.router.navigate([path ]);
    }
    generateArray(count: number): number[] {
      return Array(count).fill(0).map((x, i) => i + 1);
    }
}
