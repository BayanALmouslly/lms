import { Component, OnInit } from '@angular/core';
import { Exam } from '../../model/exam/exam.model';
import { ExamService } from '../../service/exam.service';

@Component({
  selector: 'ngx-student-exam',
  templateUrl: './student-exam.component.html',
  styleUrls: ['./student-exam.component.scss']
})
export class StudentExamComponent implements OnInit {

  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.GetCurrentExamForStudent()
    this.enabledQuetions()
  }
  date: Date = new Date()
  exam: Exam = new Exam()
  findExamToDay: boolean = false
  enabled: boolean = false
  GetCurrentExamForStudent() {
    this.date = new Date()
    var today = new Date();

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    var time=h+":"+m+":"+s
    this.examService.GetCurrentExamForStudent({ Year: yyyy,Month:mm,Day:dd,Hour:h,Minit:m }).subscribe(res => {
      console.log(res)
      if (!res)
        this.findExamToDay = false
      else {
        this.exam = res as any
        this.findExamToDay = true
      }
    })
  }
  enabledQuetions() {
    this.date = new Date()
    // console.log(this.date)
    if (this.date <= this.exam.Date)
      this.enabled = true
  }
  timeQuestion() {
    this.date = new Date()
  }
}
