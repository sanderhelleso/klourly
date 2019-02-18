import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import CheckinReport from '../room/admin/reports/checkin/CheckinReport';
import MemberReport from '../room/admin/reports/member/MemberReport';
import Announcement from '../room/announcements/Announcement';
import RoomAnnouncements from '../room/admin/announcements/RoomAnnouncements';
import RoomMembers from '../room/admin/members/RoomMembers';
import RoomCheckin from '../room/admin/checkin/RoomCheckin';
import Reports from '../room/admin/reports/Reports';
import LoggedinNavbar from '../navigation/LoggedinNavbar';
import Room from '../room/Room';

const RoomRoutes = () => (
    <Fragment>
        <Route path="/" component={LoggedinNavbar} />
        <Route exact path="/dashboard/rooms/:roomID" component={Room} />
        <Route exact path="/dashboard/rooms/:roomID/admin/reports" component={Reports} />
        <Route exact path="/dashboard/rooms/:roomID/admin/members" component={RoomMembers} />
        <Route exact path="/dashboard/rooms/:roomID/admin/checkin" component={RoomCheckin} />
        <Route exact path="/dashboard/rooms/:roomID/admin/announcements" component={RoomAnnouncements} />
        <Route exact path="/dashboard/rooms/:roomID/announcements/:announcementID" component={Announcement} />
        <Route exact path="/dashboard/rooms/:roomID/admin/reports/checkin/:checkinID" component={CheckinReport} />
        <Route exact path="/dashboard/rooms/:roomID/admin/reports/member/:memberID" component={MemberReport} />
    </Fragment>
);

export default RoomRoutes;