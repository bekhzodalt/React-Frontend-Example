import React from 'react';
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

const activeColor = "#000000";
const deActiveColor = "#00000055";

function TableOrderBy(props) {
  return (
    <div className="TableOrderBy">
      <AiFillCaretUp color={(props.searchParam.order_column === props.column && props.searchParam.order_by === 'ASC') ? activeColor : deActiveColor} 
        onClick={() => props.handleOrderBy(props.column, 'ASC')}
      />
      <AiFillCaretDown color={(props.searchParam.order_column === props.column && props.searchParam.order_by === 'DESC') ? activeColor : deActiveColor} 
        onClick={() => props.handleOrderBy(props.column, 'DESC')}
      />
    </div>
  );
}

export default TableOrderBy;
