import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})

export class AddQuestionComponent implements OnInit {

  formQuestion : FormGroup
  modalView : boolean = false
  questionLists : any
  constructor ( private _fb : FormBuilder, private _question : QuestionService ) {

     this.formQuestion = this._fb.group({
      question     : [null, Validators.required],
      questiontype : [0, Validators.required],
      paragraph    : [null, Validators.required],
      options      : this._fb.array([])
    })
    this.addOption()
  }

  ngOnInit(): void {
    this.fetchAllQuestion()
  }

  fetchAllQuestion () {
    let response:any = this._question.fetchQuestion()
    if ( response ) {
      this.questionLists = JSON.parse(response)
    }
  }

  changeAnswer ( index : number, optionIndex : number, type : string, event : any ) {
    if( type === '1' ) {
      if ( optionIndex == -1 ) {
        this.questionLists.questions[index]['showOption'] = event.target.checked
        sessionStorage.setItem("questions", JSON.stringify(this.questionLists))
        return
      }
      if ( optionIndex == -2 ) {
        this.questionLists.questions[index]['OptionAnswer'] = event.target.value
        sessionStorage.setItem("questions", JSON.stringify(this.questionLists))
        return
      }
      this.questionLists.questions[index].options[optionIndex]['answer'] = event.target.checked
      sessionStorage.setItem("questions", JSON.stringify(this.questionLists))
    } else {
      this.questionLists.questions[index]['paragraph'] = event.target.value
      sessionStorage.setItem("questions", JSON.stringify(this.questionLists))
    }
  }

  addOption ( ) {
    const val = this._fb.group({
      option: ['', Validators.required],
    });
    const form = this.formQuestion.get('options') as FormArray
    form.push(val);
  }

  removeOption ( index : number ) {
    const form = this.formQuestion.get('options') as FormArray
    form.removeAt(index);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  submit () {
    this._question.AddQuestion(this.formQuestion.value)
    this.fetchAllQuestion()
    this.modalView = false
  }

}