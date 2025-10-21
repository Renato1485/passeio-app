import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Categoria } from '../../categorias/categoria';
import { LugarService } from './../../lugares/lugar.service';
import { CategoriaService } from '../../categorias/categoria.service';
import { Lugar } from '../../lugares/lugar';

@Component({
  selector: 'app-galeria',
  standalone: false,
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GaleriaComponent implements OnInit {

  lugares: Lugar[] = [];
  categoriasFiltro: Categoria[] = [];
  nomefiltro: string = '';
  categoriaFiltro: string = '';

  constructor(
    private lugarService: LugarService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.categoriaService.obterLista().subscribe(categorias => this.categoriasFiltro = categorias);

    this.lugarService.obterLista().subscribe(lugaresResposta => this.lugares = lugaresResposta)
  }

  filtrar() {
    this.lugarService.filtrar(this.nomefiltro, this.categoriaFiltro).subscribe(resultado => this.lugares = resultado);
  }
}