import React, {Component} from 'react';

const withStyleStateful = (WrappedC, className) => {
  return class extends Component{
    render (){
      return (
        <div className={className}>
          <WrappedC {...this.props} />
        </div>

      )
      ;
    }


      

}


export default withStyleStateful;