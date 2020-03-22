import React,{Component} from 'react'
/*
     React : 화면 UI
     1) 생명주기
        constructor()
        render() =======> 재호출 ==> setState()
        componentDidMount() => window.onload
     2) JSX (JavaScript+XML) : XML 형식으로 코딩
        render()
        {
            return (
               <div>
                 <h1>Hello</h1>
               </div>
            )
        }

        render()
        {
             return (
                React.createElement('div',null,
                   React.createElement('h1',null,'Hello')
                )
             )
        }

        class A extends Component
        {
            render()
            {
               return (
                 <h1>Hello</h1>
               )
            }
        }

        => 호출
             <A/>  <h1>Hello</h1>
        ReactDOM.render(<A/>,douement.getElementById('root'))
                             document.getSelector('#')
                             document.getSelector('body')
          <div id="root">
            <h1>Hello</h1>
          </div>
     3) 이벤트 처리
        => onClick={등록된 이벤트설정}
           onChange={}

     5) WebPack : 배포 => 사용자 만든 모든 js4) Router : 화면 이동 <jsp:include>,css,img
     6) Style 설정
         className , style={{"backgroundColor":"값"}}
     7) 변수 ===> prototype
        ===
        props(다른 컴포넌트에 데이터를 전송) VS state(변경된 데이터 저장)
     8) 서버 사이드 : node.js / Spring-Boot
 */
import axios from 'axios'
import {NavLink} from "react-router-dom";

class MovieDetail extends Component{
    constructor(props) {
        super(props);
        this.state={
            movie_detail:{}
        }
    }
    componentDidMount() {
        axios.get('http://localhost:3355/detail',{
            params:{
                mno:this.props.match.params.mno
            }
        }).then((res)=>{
            console.log(res.data);
            console.log(res.data[0])
            this.setState({movie_detail:res.data[0]})
        })
    }

    render() {
        return (
            <div className={"row"}>
                <h1 className={"text-center"}>
                    {this.state.movie_detail.title} 영화 상세보기
                </h1>
                <table className={"table table-hover"}>
                    <tr>
                        <td width={"30%"} className={"text-center"} rowSpan={"7"}>
                            <img src={this.state.movie_detail.poster} width={"250"} height={"300"}/>
                        </td>
                        <td colSpan={"2"}>{this.state.movie_detail.title}</td>
                    </tr>
                    <tr>
                        <td width={"10%"}>감독</td>
                        <td width={"60%"}>{this.state.movie_detail.director}</td>
                    </tr>
                    <tr>
                        <td width={"10%"}>출연</td>
                        <td width={"60%"}>{this.state.movie_detail.actor}</td>
                    </tr>
                    <tr>
                        <td width={"10%"}>장르</td>
                        <td width={"60%"}>{this.state.movie_detail.genre}</td>
                    </tr>
                    <tr>
                        <td width={"10%"}>등급</td>
                        <td width={"60%"}>{this.state.movie_detail.grade}</td>
                    </tr>
                    <tr>
                        <td width={"10%"}>평점</td>
                        <td width={"60%"}>{this.state.movie_detail.score}</td>
                    </tr>
                    <tr>
                        <td width={"10%"}>상영일</td>
                        <td width={"60%"}>{this.state.movie_detail.regdate}</td>
                    </tr>
                    <tr>
                        <td colSpan={"3"} height={"200"} valign={"top"}>
                            {this.state.movie_detail.story}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={"3"} className={"text-right"}>
                            <NavLink to={"/Released"}>
                                <span className={"btn btn-lg btn-primary"}>목록</span>
                            </NavLink>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default MovieDetail;