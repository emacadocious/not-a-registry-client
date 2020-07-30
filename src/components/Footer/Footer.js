import React from 'react';

import './Footer.css';

const Footer = () => {
  return (
    <footer className="blog-footer">
      <h5>Legal Disclaimer:</h5>
      <p>
        We use <a href="https://stripe.com/">Stripe</a> for all payment processing. We do not control any part of it, we just link out to them.
      </p>
      <p>
        We also never store any of your information.
      </p>
      <p>
        The only thing we store is the name you enter when you purchase an item, so we know who to write the "thank you" letter to.
      </p>
    </footer>
)};

export default Footer;
