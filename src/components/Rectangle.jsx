import React from "react";
import styled from "styled-components";

class Rectangle extends React.Component {

  render() {
    const BlackRectangle = styled.div`
    background-color: black;
    width: ${this.props.width}px;
    height: ${this.props.height}px;
    position: absolute;
    left: ${this.props.x}px;
    top: ${this.props.y}px;
  `;

    return (
      <BlackRectangle />
    );
  }
}

export default Rectangle;
