import React from 'react';
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { WHY_LOGIN } from './constants';

const showTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    {WHY_LOGIN}
  </Tooltip>
);

function RenderTooltip({
  title = "Why do I need to login?",
  ...props
}) {
  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={showTooltip}
    >
      <span>Why do I need to login?</span>
    </OverlayTrigger>
  )
}

export default RenderTooltip;
