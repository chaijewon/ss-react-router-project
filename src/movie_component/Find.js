import React,{Component} from 'react'
import $ from 'jquery'
import axios from 'axios'
/*
   function
   function Find()
   {
       const [movie,setMovie]=useState([]);
       useEffect(()=>{
         axios.get()
       })

       return (
       )
   }
 */
class Find extends Component{
    state={
        movie:[]
    }
    componentDidMount() {
       axios.get("http://localhost:3355/movie_find").then((res)=>{
           this.setState({movie:res.data})
       })

        //jquery처리
        /*
            $(function(){

            })
         */
        $('#keyword').keyup(function () {
            var k=$(this).val();
            $('#user-table > tbody > tr').hide();
            var temp=$('#user-table > tbody > tr > td:nth-child(4n+2):contains("'+k+'")');
            $(temp).parent().show();
        })
    }

    render(){
        const html=this.state.movie.map((m)=>
           <tr>
               <td><img src={m.poster} width={"35"} height={"35"}/> </td>
               <td>{m.title}</td>
               <td>{m.director}</td>
               <td>{m.actor}</td>
           </tr>
        )
        return(
            <div className={"row"}>
                <h1 className={"text-center"}>영화찾기</h1>
                <div style={{"height":"35px"}}></div>
                <table className={"table"}>
                    <tr>
                        <td>
                            <input type={"text"} size={"20"}
                                   className={"input-sm"}
                                   placeholder={"영화 검색"} id={"keyword"}/>
                        </td>
                    </tr>
                </table>
                <table className={"table"} id={"user-table"}>
                   <thead>
                     <tr className={"danger"}>
                         <th></th>
                         <th>제목</th>
                         <th>감독</th>
                         <th>출연</th>
                     </tr>
                   </thead>
                    <tbody>
                    {html}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Find;