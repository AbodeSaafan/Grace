import { Component, OnInit } from '@angular/core';
import { FileStorageService } from '../../services/file-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private filesList : any[];

  constructor(private fileStorage: FileStorageService) { }

  ngOnInit() {
  	
  	/*this.fileStorage.getMyFiles(localStorage.getItem('token'))
  	.subscribe(output => { this.filesList = output.filesList }
			// Create objects that hold file info and display it
			// Add object to array that is used to show the list of files
			// Make sure clicking on file does good stuff;*/
			
  }

}
