import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ContentObserver } from '@angular/cdk/observers';
import { ProjectService } from 'app/services/project.service';
import { ConfigService } from 'app/services/config.service';

@Component({
  selector: 'app-add-edit-activity',
  templateUrl: './add-edit-activity.component.html',
  styleUrls: ['./add-edit-activity.component.scss']
})
export class AddEditActivityComponent implements OnInit {
  public myForm: FormGroup;
  public isEditing = false;
  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();
  public loading = true;
  public projects = [];
  public types = [];
  public priorities = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private configService: ConfigService,
    private projectService: ProjectService
  ) {
    console.log(this.configService.lists);
  }

  ngOnInit() {
    this.route.url.subscribe(segments => {
      segments.forEach(segment => {
        if (segment.path === 'edit') {
          this.isEditing = true;
        }
      });
    });

    this.route.parent.data
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {
        this.buildForm(data);
        this.loading = false;
      });

      this.projectService.getAll(1, 1000)
        .takeUntil(this.ngUnsubscribe)
        .subscribe((res: any) => {
          if (res) {
            this.projects = res.data;
          }
        });

        // Priorities
        console.log('list:', this.configService.lists);

        // Types
        console.log('list:', this.configService.lists);
  }

  onCancel() {
    this.router.navigate(['/activity']);
  }

  onSubmit() {
    console.log('submitting', this.myForm);
  }

  register (myForm: FormGroup) {
    console.log('Successful registration');
    console.log(myForm);
  }

  buildForm(data) {
    console.log('data:', data);
    this.myForm = new FormGroup({
      'headline': new FormControl(),
      'content': new FormControl(),
      'dateAdded': new FormControl(),
      'project': new FormControl(),
      'active': new FormControl(),
      'priority': new FormControl(),
      'type': new FormControl(),
      'contentUrl': new FormControl(),
      'documentUrl': new FormControl(),
      'status': new FormControl(),
      'projectSel': new FormControl(),
      'prioritySel': new FormControl(),
      'typeSel': new FormControl()
    });
  }

}
