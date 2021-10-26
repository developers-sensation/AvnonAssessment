import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionComponent } from './add-question/add-question.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
   { 
     path: '', 
     redirectTo: 'form', 
     pathMatch: 'full' 
   },
   {
     path : 'form',
     component : AddQuestionComponent
   },
   {
     path : 'answers',
     component : ReviewComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
