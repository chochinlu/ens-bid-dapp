import React from 'react';
import Paper from 'material-ui/Paper';

export const About = () => (
  <Paper className="About">
    <h1>About Ethereum Name System</h1>
    <p>This app allows you to register a .eth domain name for use in ethereum decentralized applications (dapps) and compatible blockchain browsers. Names are not purchased. Each name registered requires depositing some amount of ether directly into its respective registrar contract for a minimum duration of one year, thus no central entity receives the funds. All ether deposited to contract deeds are then temporarily locked until the end of the auction.</p>
    <p>The registration process begins with an auction in which bids are placed for a name. There are three possible outcomes for bidders:</p>
    <p>During the designated “reveal” period, your bid is revealed to be the highest one and you win the auction. In this case, a deposit equivalent to the value of the second highest bid will be used to secure your name, and the remainder is returned to you. </p>
    <p>During the designated “reveal” period, you reveal your bid, but you are not the highest bidder so you do not win the auction. In this case, your entire deposit will be returned to you, minus a 0.5% fee that is burned. </p>
    <p>If for any reason you failed to reveal your bid during the designated “reveal” period, your entire deposit is burned. </p>
    <p>Once a name is requested, a period of 72 hours begins in which anyone can put a sealed bid for it and send the necessary funds (minimum of 0.01 ether). This period is followed by a 48 hour one (the "Reveal Period") in which bids must be revealed. Any bid that is not revealed during Reveal Period results in the loss of its related funds. Revealing your bid requires information stored in your browser, or backed up using the 'Export Bids' option. The highest bidder after all bids are revealed during this Reveal Period becomes the registrant of the name, and the ether they sent to the contract will be refunded immediately, minus the value required to outbid the second highest bidder. The remaining funds are kept locked in a contract for at least a year, after which they can be withdrawn by the registrant upon releasing rights of use of the name. Names with registrants are controlled only by their registrants, who can transfer or release the name until it needs to be renewed.</p>
    <p>The registrar contract is expected to be upgraded in 2018 to include small renewal fees in order to discourage long term squatting and speculation.</p>
  </Paper>
);