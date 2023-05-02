import React from "react";

const Leaf = props => {
  let children = props.children;

  if (props.leaf.bold) {
    children = <strong>{children}</strong>
  };

  if (props.leaf.italic) {
    children = <em>{children}</em>
  };

  if (props.leaf.underline) {
    children = <u>{children}</u>
  };

  return (
    <span
      {...props.attributes}
    >
      {children}
    </span>
  )
}

export default Leaf;