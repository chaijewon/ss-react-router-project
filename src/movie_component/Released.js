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

        // 이벤트 등록
        /*
             onClick
             onChange
             onKeyPress
         */
        this.handlePrev=this.handlePrev.bind(this)
        this.handleNext=this.handleNext.bind(this)
    }
    handlePrev()
    {
        this.state.page=this.state.page>1?this.state.page-1:this.state.page
        this.sendData()
    }
    handleNext()
    {
        this.state.page=this.state.page<this.state.totalpage?this.state.page+1:this.state.page
        this.sendData()
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
    sendData()
    {
        axios.get('http://localhost:3355/real_data',{
            params:{
                page:this.state.page,
                type:1
            }
        }).then((res)=>{
            this.setState({movie_data:res.data})// render()재호출
            // render() => 가상 돔 <==> 실제 돔
            //             ====== 비교 diff ====== 다른 곳만 변경
        })
    }
    componentDidMount() {
        // 서버에서 데이터 읽기
        this.sendData()
        axios.get("http://localhost:3355/movie_total",{
            params:{
                type:1
            }
        }).then((res)=>{

            this.setState({totalpage:res.data.totalpage})
            console.log(res.data.totalpage)
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
            <React.Fragment>
                <div className={"row"}>
                    <h1 className={"text-center"}>현재상영영화</h1>
                    {html}
                </div>
                <div class={"row text-center"}>
                    {/* btn-xs btn-md btn-sm btn-lg */}
                    <input type={"button"} value={"이전"} className={"btn btn-sm btn-danger"}
                      onClick={this.handlePrev}
                    />
                    {this.state.page} page / {this.state.totalpage} pages
                    <input type={"button"} value={"다음"} className={"btn btn-sm btn-danger"}
                      onClick={this.handleNext}
                    />
                </div>
            </React.Fragment>
        )
    }
}
export default Released;