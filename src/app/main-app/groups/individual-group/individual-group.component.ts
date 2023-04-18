import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GroupsService} from "../groups.service";
import {User} from "../../../models/user.model";
import {AuthenticationService} from "../../../service/authentication.service";
import {Group} from "../../../models/group.model";

@Component({
  selector: 'app-individual-group',
  templateUrl: './individual-group.component.html',
  styleUrls: ['./individual-group.component.scss']
})
export class IndividualGroupComponent implements OnInit {
  groupId!: string;
  loggedInUser!: User;
  group!: Group | undefined;
  loading: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupsService,
    private authenticationService: AuthenticationService,
  ) {
    this.loggedInUser = <User>this.authenticationService.getUserFromLocalCache();
  }
  ngOnInit(): void {
    this.loading = true;
    this.groupId = this.route.snapshot.params['id'];
    console.log(this.groupId);
    console.log(this.loggedInUser)
    this.groupService.getGroupWithId(this.groupId).subscribe((result) => {
      this.group = result;
    });
    this.loading = false;
  }


}
const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
