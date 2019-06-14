import React from "react";

const SmurfFormList = props => {
  return (
    <div>
      {props.name}

      <button onClick={event => props.setUpdateForm(event, props.smurf)}>
        Reeducate Smurf
      </button>
    </div>
  );
};

export default SmurfFormList;
