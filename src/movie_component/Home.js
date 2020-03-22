import React,{Component} from 'react'
import axios from 'axios'
class Home extends Component{
    state={
        movie_data:[],
        movie_detail:{},
        title:'',
        open:false
    }
    onMovieDataClick(no)
    {
       if(no===1)
           this.setState({title:'일별 박스오피스'});
       else if(no===2)
           this.setState({title:'실시간 예매율'});
       else if(no===3)
           this.setState({title:'좌석점유율 순위'})
        else if(no===4)
            this.setState({title:'온라인 상영관 일일'})

        axios.get("http://localhost:3355/movie_home",{
            params:{
                no:no
            }
        }).then((res)=>{
            this.setState({movie_data:res.data})
        })
    }
    componentDidMount() {
        axios.get("http://localhost:3355/movie_home",{
            params:{
                no:1
            }
        }).then((res)=>{
            this.setState({movie_data:res.data,open:true})
        })
    }

    render(){
        return(
            <React.Fragment>
                <div className={"row"}>
                    <h1 className={"text-center"}>영화홈</h1>
                    <button className={"btn btn-sm btn-info"} onClick={this.onMovieDataClick.bind(this,1)}>일별 박스오피스</button>
                    <button className={"btn btn-sm btn-success"} onClick={this.onMovieDataClick.bind(this,2)}>실시간 예매율</button>
                    <button className={"btn btn-sm btn-danger"} onClick={this.onMovieDataClick.bind(this,3)}>좌석점유율 순위</button>
                    <button className={"btn btn-sm btn-warning"} onClick={this.onMovieDataClick.bind(this,4)}>온라인 상영관 일일</button>
                </div>
                <div className={"row"}>
                    <div className={"col-md-6"}>

                    </div>
                    <div className={"col-md-6"}>
                        {this.state.open==true?<MovieList movie={this.state.movie_data}/>:null}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
class MovieList extends Component{
    render(){
        const html=this.props.movie.map((m)=>
          <tr>
              <td><img src={"http://www.kobis.or.kr/"+m.thumbUrl} width={"35"} height={"35"}/> </td>
              <td>{m.movieNm}</td>
              <td>{m.genre}</td>
              <td>{m.openDt}</td>
          </tr>

        )
        return (
            <table className={"table table-striped"}>
                <thead>
                   <th className={"text-center"}></th>
                   <th className={"text-center"}>영화명</th>
                   <th className={"text-center"}>장르</th>
                   <th className={"text-center"}>개봉일</th>
                </thead>
                <tbody>
                {html}
                </tbody>
            </table>
        )
    }
}
export default Home;