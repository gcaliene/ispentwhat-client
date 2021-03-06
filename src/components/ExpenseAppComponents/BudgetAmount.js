import React from 'react';
import { connect } from 'react-redux';
// import $ from 'jquery';

import { fetchBudget } from '../../actions/action';

import '../../css/BudgetAmount.css';

class BudgetAmount extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    console.log(this.state);
    console.log(props);
    this.state = {
      budget: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchBudget());
    console.log(this.props);
  }

  onAmountChange = e => {
    const budget = e.target.value;
    if (!budget || budget.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ budget }));
    }
  };

  handleClick(e) {
    this.props.handleClick({ budget: '' });
    this.setState({ budget: '' });
  }

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.budget);
    console.log(typeof this.props.budget);
    console.log(typeof this.state.budget);
    this.setState({ budget: this.state.budget });
    this.props.onSubmit({
      amount: parseFloat(this.state.budget, 10), //we are multiplying by 100 to wrok with pennies
      user: this.props.user
    });
  };

  render() {
    let firstTimeBudget;
    if (this.props.budget === '') {
      firstTimeBudget = (
        <form onSubmit={this.onSubmit}>
          <label htmlFor="">
            Include an amount and any expense added will deduct from that
            amount.
          </label>
          <br />
          <input
            id="js-budget-amount-input"
            type="text"
            className="will-be-hidden budget-container_content_amount-input"
            placeholder="Enter a budget here... (optional)"
            value={this.state.budget}
            onChange={this.onAmountChange}
            required
            size="6"
            maxLength="10"
          />
          <button className="budget-button budget-add-button">
            <p>Add Budget</p>
          </button>
        </form>
      );
    } else {
      firstTimeBudget = (
        <div>
          <p className="budget_p">
            Any expense you now add will deduct from the budget above. <br />
            <br /> Starting Budget:<br />
            <span className="green-text"> $ {this.props.budget}</span>
          </p>
          <button
            className="budget-button budget-delete-button"
            onClick={this.handleClick}
          >
            <p>Delete</p>
          </button>
        </div>
      );
    }

    let budgetMinusExpenses = this.state.budget || this.props.budget || 0;

    for (let i = 0; i < this.props.expenses.length; i++) {
      if (this.props.expenses[i].user === this.props.user) {
        console.log(typeof this.props.expenses[i].amount);
        budgetMinusExpenses -= this.props.expenses[i].amount / 100;
      }
    }

    return (
      <div>
        <div className="budget-container">
          <div className="budget-container_content">
            <h3 className="budget-container_content_title">Budget Amount </h3>
            <h1
              id="js-budget-amount-output"
              className="will-be-hidden budget-container_content_amount"
            >
              $ {parseFloat(budgetMinusExpenses).toFixed(2)}
            </h1>
            {firstTimeBudget}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const user = state.user.user;
  const budget = state.budget.budget;
  return {
    user: user,
    budget: budget,
    expenses: state.expenses
  };
};
export default connect(mapStateToProps)(BudgetAmount);
