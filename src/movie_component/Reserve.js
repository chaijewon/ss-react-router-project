//Reserve.js
import React,{Component} from 'react'
import axios from 'axios'

class Reserve extends Component{
    state={
        movie:[],
        ss:''
    }
    constructor(props) {
        super(props);
        this.handleUserInput=this.handleUserInput.bind(this);
    }
    handleUserInput(ss)
    {
        this.setState({ss:ss})
    }
    componentDidMount() {
        axios.get('http://localhost:3355/movie_find').then((res)=>{
             this.setState({movie:res.data})
        })
    }

    render(){
        return (
            <div className={"row"}>
             <SearchBar onUserInput={this.handleUserInput} ss={this.state.ss}/>
                {/*사용자 정의 이벤트 설정
                   설정 목적 : Child Component의 입력값을 받는 경우에 주로 사용
                   e.target.value => 입력된 값을 읽을 경우

                */}
             <MovieTable movie={this.state.movie} ss={this.state.ss}/>
            </div>
        )
    }
}

class SearchBar extends Component{
    constructor(props) {
        super(props);
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(e){
        this.props.onUserInput(e.target.value)
    }
   render(){
       return (
           <form>
               <input type={"text"} className={"input-sm"} placeholder={"Search"}
                      onChange={this.handleChange}
               />
           </form>
       )
   }
}

class MovieTable extends Component{
   render(){
       var row=[];
       this.props.movie.forEach((m)=>{
           if(m.title.indexOf(this.props.ss)==-1)
           {
               return;
           }
           row.push(<MovieRow m={m}/>);
       })
       return (
           <table className={"table table-hover"}>
               <thead>
                 <tr className={"danger"}>
                     <th></th>
                     <th>제목</th>
                     <th>감독</th>
                     <th>출연</th>
                     <th>장르</th>
                 </tr>
               </thead>
               <tbody>
               {row}
               </tbody>
           </table>
       )
   }
}

class MovieRow extends Component{
   render() {
       return (
           <tr>
               <td><img src={this.props.m.poster} width={"35"} height={"35"}/> </td>
               <td>{this.props.m.title}</td>
               <td>{this.props.m.director}</td>
               <td>{this.props.m.actor}</td>
               <td>{this.props.m.genre}</td>
           </tr>
       )
   }
}
export default Reserve;