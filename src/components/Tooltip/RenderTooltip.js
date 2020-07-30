import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { WHY_LOGIN } from './constants';
import './RenderTooltip.css';

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
      <span className="information-why">{title}</span>
    </OverlayTrigger>
  )
}

export default RenderTooltip;
