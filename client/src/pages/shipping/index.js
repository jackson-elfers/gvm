import React from "react";

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>Shipping</h1>
        <hr />
        <p>Here is how I typically SHIP PARTS: After carefully packing and boxing the parts, I ship either:</p>
        <hr />
        <h3>USPS</h3>
        <h4>Small Parts – USA Locations</h4>
        <p>US Postal Service Priority Mail</p>

        <h4>Small – Mid-size parts – International</h4>
        <p>USPS Global Air Parcel Post or USPS Global Priority Mail</p>
        <hr />
        <h3>UPS</h3>
        <h4>Mid-size and weight parts – USA</h4>
        <p>UPS Ground</p>
        <hr />
        <h3>USPS</h3>
        <h4>Mid-size parts – International</h4>
        <p>USPS Global Air Parcel Post</p>
        <hr />
        <h3>FedEx</h3>
        <h4>Oversize Parts – USA</h4>
        <p>FedX Freight or other Truck Freight Private Car transporter (some take parts)</p>
      </div>
    );
  }
}
export default Main;
