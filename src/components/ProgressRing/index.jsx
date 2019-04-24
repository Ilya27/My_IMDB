import React, { Component } from 'react';
class ProgressRing extends Component {
    constructor(props) {
      super(props);
      
      const { radius, stroke } = this.props;
      
      this.normalizedRadius = radius - stroke * 2;
      this.circumference = this.normalizedRadius * 2 * Math.PI;
    }

    checColor(value){
      if(value<=40){
        return 'red'
      }else if(value>40 && value<70){
        return 'khaki'
      }else if (value>=70){
        return 'green'
      }
    }

    render() {
      const { radius, stroke, progress } = this.props;
  
      const strokeDashoffset = this.circumference - progress / 100 * this.circumference;
      return (
        <svg
          height={radius * 2}
          width={radius * 2}
         >
          <circle
            stroke={this.checColor(progress)}
            fill="transparent"
            strokeWidth={ stroke }
            strokeDasharray={ this.circumference + ' ' + this.circumference }
            style={ { strokeDashoffset } }
            stroke-width={ stroke }
            r={ this.normalizedRadius }
            cx={ radius }
            cy={ radius }
            className='circle'
           />
        </svg>
      );
    }
  }
  
  class Example extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        progress: 0
      };
    }
    
    componentDidMount() {
      const {progress}=this.props;
      let  percent = progress*10;  
      const interval = setInterval(() => {
        this.setState({ progress: percent});}, 600);
    }
    
    
    render() {
      return (
        <ProgressRing
          radius={ 35 }
          stroke={ 5 }
          progress={ this.state.progress }
        />
      );
    }
  }


  class OurProgressRing extends Component{
    checkVote(vote_average){
        if(vote_average===0){
          return <h2 className ='NR'> NR</h2> /*Расположение поровнять*/
        }else{
          return (<><Example progress={vote_average}/> <p className='vote_average'>{Math.round(vote_average*10)}</p></>)
        }
      }
    render() {
        const {progress}=this.props
        return (
            <>
              {this.checkVote(progress)}
            </>
        );
      }
  }

  export default OurProgressRing;
  