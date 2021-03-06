import React from 'react';
import { Link } from 'react-router-dom';

///This is the regular unconnected component
const ExpenseItem = ({
  dispatch,
  description,
  _id,
  amount,
  createdAt,
  note,
  user
}) => (
  <div className="expense-item expense-item-wrapper">
    <Link to={`/edit/${_id}`} className="expense-item_description">
      <h3> {description} </h3>
    </Link>
    <div className="expense-item_note-amount-createdat">
      <div>{note}</div>
      <div>
        ${amount / 100} <div>Created at: {createdAt}</div>
        <div>_id #: {user}</div>
      </div>
    </div>
  </div>
);

export default ExpenseItem;
