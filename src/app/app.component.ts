import { Component } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormBuilder, Validators } from '@angular/forms';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';


(<any>pdfMake).addVirtualFileSystem(pdfFonts);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } }]
})
export class AppComponent {
  isLinear = true;
  wholedata: any = {};

  constructor(private fb: FormBuilder ,private dp: DatePipe) { }

  studentdetail = this.fb.group({
    firstname: ['', Validators.required],
    secondname: ['', Validators.required],
    dob: ['', Validators.required],
    age: ['', Validators.required],
    bloodgroup: ['', Validators.required],
    gender: ['', Validators.required]
  });

  parentdetail = this.fb.group({
    fathername: ['', Validators.required],
    mothername: ['', Validators.required],
    mobilenumber: ['', Validators.required],
    address: ['', Validators.required]
  });

  academicdetail = this.fb.group({
    previousschool: ['', Validators.required],
    standardselection: ['', Validators.required],
    grade: ['', Validators.required],
    activities: ['', Validators.required]
  });

  academicdetailforcurrentschool = this.fb.group({
    standardselectionforcurrentschool: ['', Validators.required],
    groupselection:['',Validators.required]

  });

  submitall() {
    if (this.studentdetail.valid && this.parentdetail.valid && this.academicdetail.valid && this.academicdetailforcurrentschool.valid) {
      this.wholedata = {
        studentDetails: this.studentdetail.value,
        parentDetails: this.parentdetail.value,
        previousAcademicDetails: this.academicdetail.value,
        currentAcademicDetails: this.academicdetailforcurrentschool.value
      };

      console.log('data collected', this.wholedata);
      alert("Form submitted sucessfully");

    } else {
      console.log('Please fill all required fields');
      alert("please fill all fields");
      
    }
  }


  generate() {
    {
      const data = this.wholedata;
      const date=this.dp.transform(data.studentDetails.dob)
      {
        const studentpdf = {
        
          content: [
            {text:'ADMISSION DETAIL', marginLeft:190,marginBottom:30 },
            {text:'Student Detail',bold:true,marginBottom:10},
            {
              ol: [
                `Name:${data.studentDetails.firstname}  ${data.studentDetails.secondname}`,
                `Date of Birth:${date}`,
                `Age:${data.studentDetails.age}`,
                `Blood Group:${data.studentDetails.bloodgroup}`,
                `Gender:${data.studentDetails.gender}`,
              ]
            },
            {text:'Parent Detail',bold:true,marginTop:10,marginBottom:10},
            {
              ol:[
                `Father Name:${data.parentDetails.fathername}`,
                `Mother Name:${data.parentDetails.mothername}`,
                `Mobile Number:${data.parentDetails.mobilenumber}`,
                `Address :${data.parentDetails.address}`
              ]
            },
            {text:'previous Academic Details',bold:true,marginBottom:10,marginTop:10},
            {
              ol:[
                `School name:${data.previousAcademicDetails.previousschool}`,
                `Standard:${data.previousAcademicDetails.standardselection}`,
                `Grade:${data.previousAcademicDetails.grade}`,
                `Extra Curricular Activities${data.previousAcademicDetails.activities}`
              ]
            },
            {text:'Current Academic Detail',bold:true,marginBottom:10,marginTop:10},
            {
              ol:[
                `Standard:${data.currentAcademicDetails.standardselectionforcurrentschool}`,
                `Group Selection:${data.currentAcademicDetails.groupselection}`
              ]
            }

          ]
        }

        pdfMake.createPdf(studentpdf).open();
      }
    }
  }



}