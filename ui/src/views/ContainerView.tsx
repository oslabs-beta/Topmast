import React from "react";
import { Link } from "react-router-dom";

export default function ContainerView() {
    return (
      <div>
        <h2>Container</h2>

        <div>This is the content on the container view component</div>

        <Link to="/">Link to Dashboard (/)</Link>
      </div>
    );
  }
