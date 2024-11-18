import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Theater } from 'src/app/models/theater.model';
import { TheaterService } from 'src/app/services/theater.service';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  theater:Theater;
  mode:number //1->view, 2--> create, 3--> update

  constructor(private TheaterService,  //llama las apis
              private ActivatedRoute, //analisar url
              private router:Router //como moverme dentro de la pagina
            ) { 
    this.theater = {capacity:0,location:""}
    this.mode=0;
  }

  ngOnInit(): void {
    const currentUrl = this.ActivatedRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }

    if (this.ActivatedRoute.snapshot.params.id) {
      this.theater.id = this.ActivatedRoute.snapshot.params.id
      this.getTheater(this.theater.id)
    }
  }

  getTheater(id: number) {
    this.TheaterService.view(id).subscribe(data => {
      this.theater = data
    })
  }

}
