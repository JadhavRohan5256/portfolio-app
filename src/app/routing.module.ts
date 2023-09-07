import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ServiceComponent } from "./service/service.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { SkillsComponent } from "./skills/skills.component";
import { ContactComponent } from "./contact/contact.component";
import { AuthComponent } from "./auth/auth.component";

const routes: Routes = [
    {path: "home", component: HomeComponent},
    {path: "about", component: AboutComponent},
    {path: "service", component: ServiceComponent},
    {path: "portfolio", component: PortfolioComponent},
    {path: "skills", component: SkillsComponent},
    {path: "contact", component: ContactComponent},
    {path: "auth", component: AuthComponent},
    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "**", component: PageNotFoundComponent},
];

@NgModule({
      imports: [ RouterModule.forRoot(routes) ],
      exports: [ RouterModule ]
})
export class RoutingModule {}