
// import * as React from 'react';

// interface IAlerter {
//   ref: any;
//   wrapperRef: any;
// }

// export default class OutsideAlerter extends React.Component {
//   public wrapperRef: any;
//   constructor(props: any) {
//     super(props);

//     this.setWrapperRef = this.setWrapperRef.bind(this);
//     this.handleClickOutside = this.handleClickOutside.bind(this);
//   }


//   public componentDidMount() {
//     document.addEventListener('mousedown', this.handleClickOutside);
//   }

//   public componentWillUnmount() {
//     document.removeEventListener('mousedown', this.handleClickOutside);
//   }

//   /**
//    * Set the wrapper ref
//    */
//   public setWrapperRef(node: any) {
//     this.wrapperRef = node;
//   }

//   /**
//    * Alert if clicked on outside of element
//    */
//   public handleClickOutside(event: any) {
//     if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
//       // alert('You clicked outside of me!');
//       console.log('You clicked outside of me!')
//     }
//   }

//   public render() {
//     return <div ref={this.setWrapperRef}>{this.props.children}</div>;
//   }
// }