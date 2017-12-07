import React from 'react';
import { connect } from 'react-redux';
import ExpenseItem from './ExpenseItem';
import selectExpenses from '../reducers/selector';
import { fetchExpenses } from '../actions/action';

///This is the regular unconnected component
// const ExpenseList = (props) => (
//     <div>
//         <h1>Expense List</h1>
//         {/* {props.filters.text} */}
//         {props.expenses.map((expense) => {
//             return <ExpenseItem key={expense.id} {...expense}/>
//         })}
//     </div>
// );

//This is a class component

export class ExpenseList extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.props.dispatch(fetchExpenses());
  //
  //   }
  componentDidMount() {
    this.props.dispatch(fetchExpenses());
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.dispatch(fetchExpenses());
  }

  render() {
    return (
      <div>
        <h1>Expense List</h1>
        {/* {props.filters.text} */}
        {this.props.expenses.map(expense => {
          return <ExpenseItem key={expense.id} {...expense} />;
        })}
      </div>
    );
  }
}

/////////this is the function

const mapStateToProps = state => {
  return {
    expenses: selectExpenses(state.expenses, state.filters) //state.expenses,
    // filters: state.filters //now we can use any filters we need in the ExpenseList component
  };
};

///////This is the call to connect to the store
export default connect(mapStateToProps)(ExpenseList);

// //for connected components it is easier to add the word Connected in front, to not get confused
///    Below is not the common way to have it set up. it is just waht is above usually
// const ConnectedExpenseList = connect((state)=> {
//     return {
//         expenses: state.expenses
//     };
// })(ExpenseList);

// export default ConnectedExpenseList;
