import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { trigger, transition, style, animate, query } from '@angular/animations';
import { AuthgoogleService } from '../../authgoogle.service';


@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%',
            opacity: 0,
            transform: 'translateY(20px)'
          })
        ], { optional: true }),
        query(':enter', [
          animate('450ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true })
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LayoutComponent {
  titulo = '';
  subTitulo = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: AuthgoogleService,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {      
        const childRoute = this.getChild(this.route);
        this.titulo = childRoute.snapshot.data['titulo'] || '';
        this.subTitulo = childRoute.snapshot.data['subTitulo'] || '';
        this.cdr.detectChanges();
      });
    };    

    getChild(route: ActivatedRoute): ActivatedRoute {
      while (route.firstChild) {
        route = route.firstChild;
      }
      return route;
    }
  
    prepareRoute(outlet: RouterOutlet) {
      return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }

    logaut() {
      this.loginService.logout();
    }
  }
  
