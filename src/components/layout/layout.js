import React from "react";
import Aux from "../../hoc/Aux";

const layout = props => (
  <Aux className="">
    <main>{props.children}</main>
  </Aux>
);

export default layout;