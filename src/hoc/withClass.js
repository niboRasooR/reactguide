import React, {Component} from "react";

// palauttaa anonyymin funktion!! ei siis jsx:ää
// Propsit menevät vasta funktion parametriin
// const withClass saa komponentin ja css-luokan
// JA propsit täytyy välittää eteenpäin ...spread-operaattorilla
const withClass = (WrappedComponent, className) =>{
  const WithClass = class extends Component {
    render(){
      return(
        <div className={className}>
        <WrappedComponent ref={this.props.forwardedRef} {...this.props} />
       </div>
      )      
    }
  }
return React.forwardRef((props, ref) => {
  return <WithClass {...props} forwardedRef={ref} />
});
}

export default withClass;