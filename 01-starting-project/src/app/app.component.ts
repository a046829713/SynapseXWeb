import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  public equityData = [
    { "datetimelist": "2019-09-09 01:30:00", "CloseProfit": 15000.0 },
    { "datetimelist": "2019-09-09 02:00:00", "CloseProfit": 15000.0 },
    { "datetimelist": "2019-09-09 02:30:00", "CloseProfit": 14985.007477567298 },
    { "datetimelist": "2019-09-09 03:00:00", "CloseProfit": 14820.538384845464 },
    { "datetimelist": "2019-09-09 03:30:00", "CloseProfit": 14805.725234565496 },
    { "datetimelist": "2019-09-09 04:00:00", "CloseProfit": 14601.964419002072 },
    { "datetimelist": "2019-09-09 04:30:00", "CloseProfit": 14587.369770196507 },
    { "datetimelist": "2019-09-09 05:00:00", "CloseProfit": 14413.103477916555 },
    { "datetimelist": "2019-09-09 05:30:00", "CloseProfit": 14232.74433361441 },
    { "datetimelist": "2019-09-09 06:00:00", "CloseProfit": 14218.51871991423 },
    { "datetimelist": "2019-09-09 06:30:00", "CloseProfit": 14043.70454624909 },
    { "datetimelist": "2019-09-09 07:00:00", "CloseProfit": 13826.259769877852 },
    { "datetimelist": "2019-09-09 07:30:00", "CloseProfit": 13629.975677072196 },
    { "datetimelist": "2019-09-09 08:00:00", "CloseProfit": 13629.975677072196 },
    { "datetimelist": "2019-09-09 08:30:00", "CloseProfit": 13616.35249599915 },
    { "datetimelist": "2019-09-09 09:00:00", "CloseProfit": 13453.445022203283 },
    { "datetimelist": "2019-09-09 09:30:00", "CloseProfit": 13304.9784648408 },
    { "datetimelist": "2019-09-09 10:00:00", "CloseProfit": 13291.680152196834 },
    { "datetimelist": "2019-09-09 10:30:00", "CloseProfit": 13131.860317937753 },
    { "datetimelist": "2019-09-09 11:00:00", "CloseProfit": 12734.072625831794 },
    { "datetimelist": "2019-09-09 11:30:00", "CloseProfit": 12535.21435242536 },
    { "datetimelist": "2019-09-09 12:00:00", "CloseProfit": 12358.210767276012 },
    { "datetimelist": "2019-09-09 12:30:00", "CloseProfit": 12345.858747997096 },
    { "datetimelist": "2019-09-09 13:00:00", "CloseProfit": 12086.446892732445 },
    { "datetimelist": "2019-09-09 13:30:00", "CloseProfit": 12074.366501173827 },
    { "datetimelist": "2019-09-09 14:00:00", "CloseProfit": 11926.592597891544 },
    { "datetimelist": "2019-09-09 14:30:00", "CloseProfit": 11710.728771978913 },
    { "datetimelist": "2019-09-09 15:00:00", "CloseProfit": 11609.707022230159 },
    { "datetimelist": "2019-09-09 15:30:00", "CloseProfit": 11598.103102698968 },
    { "datetimelist": "2019-09-09 16:00:00", "CloseProfit": 11454.118257013346 },
    { "datetimelist": "2019-09-09 16:30:00", "CloseProfit": 11454.118257013346 },
    { "datetimelist": "2019-09-09 17:00:00", "CloseProfit": 11454.118257013346 },
    { "datetimelist": "2019-09-09 17:30:00", "CloseProfit": 11454.118257013346 },
    { "datetimelist": "2019-09-09 18:00:00", "CloseProfit": 11454.118257013346 },
    { "datetimelist": "2019-09-09 18:30:00", "CloseProfit": 11209.098458988923 },
    { "datetimelist": "2019-09-09 19:00:00", "CloseProfit": 11186.228642151851 },
    { "datetimelist": "2019-09-09 19:30:00", "CloseProfit": 10605.950836571268 },
    { "datetimelist": "2019-09-09 20:00:00", "CloseProfit": 10605.950836571268 },
    { "datetimelist": "2019-09-09 20:30:00", "CloseProfit": 10605.950836571268 },
    { "datetimelist": "2019-09-09 21:00:00", "CloseProfit": 10595.350199337321 },
    { "datetimelist": "2019-09-09 21:30:00", "CloseProfit": 10492.010578837286 },
    { "datetimelist": "2019-09-09 22:00:00", "CloseProfit": 10492.010578837286 },
    { "datetimelist": "2019-09-09 22:30:00", "CloseProfit": 10372.81806276438 },
    { "datetimelist": "2019-09-09 23:00:00", "CloseProfit": 10362.450441504252 },
    { "datetimelist": "2019-09-09 23:30:00", "CloseProfit": 10201.168333497486 },
    { "datetimelist": "2019-09-10 00:00:00", "CloseProfit": 10201.168333497486 },
    { "datetimelist": "2019-09-10 00:30:00", "CloseProfit": 9890.267757229938 },
    { "datetimelist": "2019-09-10 01:00:00", "CloseProfit": 9785.779741955312 },
    { "datetimelist": "2019-09-10 01:30:00", "CloseProfit": 9775.998864908617 },
    { "datetimelist": "2019-09-10 02:00:00", "CloseProfit": 9657.111209904237 },
    { "datetimelist": "2019-09-10 02:30:00", "CloseProfit": 9551.30613268259 },
    { "datetimelist": "2019-09-10 03:00:00", "CloseProfit": 9551.30613268259 },
    { "datetimelist": "2019-09-10 03:30:00", "CloseProfit": 9541.759611773421 },
    { "datetimelist": "2019-09-10 04:00:00", "CloseProfit": 9345.185008121229 },
    { "datetimelist": "2019-09-10 04:30:00", "CloseProfit": 9345.185008121229 },
    { "datetimelist": "2019-09-10 05:00:00", "CloseProfit": 9345.185008121229 }
  ];
}
