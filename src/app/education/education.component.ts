import { Component } from '@angular/core';
import { EducationService } from '../services/education-service/education.service'; 
import { Education } from '../models/education/education.model'; 
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-education',
  standalone: false,
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent{
  // Declaramos la propiedad 'education' como un arreglo de objetos de tipo Education
  education: Education[] = [];

  constructor(public educationService: EducationService) {
    console.log(this.educationService);
    this.educationService.getEducation().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
        ({id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.education = data;
      console.log(this.education);
    });
  }
}
