import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'categorias',
        loadChildren: () => import('../categorias/categorias.module').then(m => m.CategoriasModule),        
        data: { titulo: 'Categorias', subTitulo: 'Realize o cadastro de novas categorias', animation: 'CategoriaPage'}
      },
      {
        path: 'lugares',
        loadChildren: () => import('../lugares/lugares.module').then(m => m.LugaresModule),        
        data: { titulo: 'Lugares', subTitulo: 'Realize o cadastro de novos lugares', animation: 'LugaresPage'}
      },
      {
        path: 'galeria',
        loadChildren: () => import('../galeria/galeria.module').then(m => m.GaleriaModule),        
        data: { titulo: 'Galeria', subTitulo: 'Descubra os melhores lugares para explocar', animation: 'GaleriaPage'}
      }
    ]
  }    
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
