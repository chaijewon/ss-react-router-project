/*
     1. 제어문
        반복문 : map,forEach
        조건문 : 삼항연산자,if
     2. 상위 클래스 => 데이터 전송 => 함수(props)
        <SearchBar onUserInput={this.handleUserInput} ss={this.state.ss}/>

        handleChange(e){
           this.props.onUserInput(e.target.value)
        }
 */
import React,{Component} from 'react'
import axios from 'axios'

class Music extends Component{
    state={
        music:[],
        detail:{}
    }
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        axios.get("http://localhost:3000/music.json").then((res)=>{
             this.setState({music:res.data})
        })
    }
    onTrClick(m){
        this.setState({detail:m})
    }
    render() {
        const html=this.state.music.map((m)=>
           <tr onClick={this.onTrClick.bind(this,m)}>
               <td>{m.rank}</td>
               <td>
                   {
                       m.state==='상승' &&
                           <span style={{"color":"red"}}>▲{m.idcrement}</span>
                   }
                   {
                       m.state==='하강' &&
                       <span style={{"color":"blue"}}>▼{m.idcrement}</span>
                   }
                   {
                       m.state==='유지' &&
                       <span style={{"color":"gray"}}>-</span>
                   }
               </td>
               <td>
                   <img src={m.poster} width={"35"} height={"35"}/>
               </td>
               <td>{m.title}</td>
               <td>{m.singer}</td>
           </tr>
        )
        return (
            <div className={"row"}>
                <h1 className={"text-center"}>뮤직 Top 50</h1>
                <div className={"col-md-8"}>
                    <table className={"table"}>
                        <thead>
                            <tr className={"danger"}>
                                <th className={"text-center"}>순위</th>
                                <th className={"text-center"}>등폭</th>
                                <th className={"text-center"}></th>
                                <th className={"text-center"}>곡명</th>
                                <th className={"text-center"}>가수명</th>
                            </tr>
                        </thead>
                        <tbody>
                        {html}
                        </tbody>
                    </table>
                </div>
                <div className={"col-md-4"}>
                  <MusicDetail music={this.state.detail}/>
                </div>
            </div>
        )
    }

}
class MusicDetail extends Component{
    render() {
        return (
            <iframe src={"http://youtube.com/embed/"+this.props.music.key} width={"350"} height={"300"}></iframe>
        )
    }
}
export default Music;