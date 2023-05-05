export const environment = {
  production: false,
  apiUrl: "http://localhost:8080/api/",
  apiEndpoints: {
    login: "login/",
    register: "users/register/",
    users: "users/",
    groups: "groups/",
    groupCreate: "groups/create/",
    groupUpdate: "groups/update/",
    groupDelete: "groups/delete/",
    groupMembers: "groups/members/",
    groupWhereMember: "groups/where-member/",
    groupWhereAdmin: "groups/where-admin/",
    groupJoin: "groups/join/",
    groupLeave: "groups/leave/",
    groupKick: "groups/kick/",
    groupPromote: "groups/promote/",
    groupAddMeetingDates: "groups/add-meeting-dates/",
    groupRemoveMeetingDates: "groups/remove-meeting-dates/",
  }
};
