import { Component, Input, OnInit } from '@angular/core';
import { ResultsInterface } from 'src/app/models/interface/results-interface';

@Component({
  selector: 'app-table-results',
  templateUrl: './table-results.component.html',
  styleUrls: ['./table-results.component.scss']
})
export class TableResultsComponent implements OnInit {
  
  @Input() listResult!:ResultsInterface[];

  constructor() { }

  ngOnInit(): void {
  }

  

}
