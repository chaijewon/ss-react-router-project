import React,{Component} from 'react'
import axios from 'axios'
// 외부 데이터 읽기
class Released extends Component{
    // function Released(props)
    constructor(props) {
        super(props);

        // 변수 선언  ==> useState() => 데이터를 한개만 지정
        this.state={
            movie_data:[],
            page:1,
            totalpage:0
        }
    }
    /*
           <App>

           constructor() => componentWillMount() => render() => componentDidMount()
                           ======================
                                 삭제
           constructor() => render() => componentDidMount()
                                        ===================
                                          setState() => componentDidUpdate()
                                          render()
     */
    // function => useEffect
    // function => useMemo , useCallback

    componentDidMount() {
        // 서버에서 데이터 읽기
        axios.get('http://localhost:3355/real_data',{
             params:{
                 page:this.state.page
             }
        }).then((res)=>{
             this.setState({movie_data:res.data})// render()재호출
            // render() => 가상 돔 <==> 실제 돔
            //             ====== 비교 diff ====== 다른 곳만 변경
        })
    }

    render(){
        const html=this.state.movie_data.map((movie)=>
            <div className={"col-md-4"}>
                <div className="panel panel-primary">
                    <div className="panel-heading">{movie.title}</div>
                    <div className="panel-body">
                        <img src={movie.poster} width={"100%"}/>
                    </div>
                </div>
            </div>
        )
        return(
            <div className={"row"}>
                <h1 className={"text-center"}>현재상영영화</h1>
                {html}
            </div>
        )
    }
}
export default Released;