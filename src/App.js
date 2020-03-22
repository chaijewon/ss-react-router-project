import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
//import {browserHistory} from 'react-router'
import Header from "./movie_component/Header";
import Footer from "./movie_component/Footer";
import Home from "./movie_component/Home";
import Released from "./movie_component/Released";
import Scheduled from "./movie_component/Scheduled";
import News from "./movie_component/News";
import Find from "./movie_component/Find";
import BoxOffice from "./movie_component/BoxOffice";
import MovieDetail from "./movie_component/MovieDetail";
class App extends Component{
  render(){
    return (
        <Router>
           <React.Fragment>
             <Header/>
              <div className={"jumbotron"}>
                  <Switch>
                      <Route exact path={"/"} component={Home}/>
                      <Route path={"/released"} component={Released}/>
                      <Route path={"/scheduled"} component={Scheduled}/>
                      <Route path={"/news"} component={News}/>
                      <Route path={"/find"} component={Find}/>
                      <Route path={"/boxoffice"} component={BoxOffice}/>
                      <Route path={"/movie_detail/:mno"} component={MovieDetail}/>
                  </Switch>
              </div>
             <Footer/>
           </React.Fragment>
        </Router>
    )
  }
}

export default App;
