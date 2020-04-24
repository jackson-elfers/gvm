import React from "react";

class SlideShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [
        "images/slideshow/01.jpg",
        "images/slideshow/02.jpg",
        "images/slideshow/03.jpg",
        "images/slideshow/04.jpg",
        "images/slideshow/05.jpg",
        "images/slideshow/06.jpg"
      ],
      index: 0
    };
    this.inteval = null;
  }

  async nextSlide() {
    if (this.state.index > this.state.urls.length - 2) {
      this.setState({ index: 0 });
    } else {
      this.setState({ index: ++this.state.index });
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.nextSlide.bind(this), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div style={{ height: "350px" }}>
        <img src={`${process.env.REACT_APP_API}/${this.state.urls[this.state.index]}`} />
      </div>
    );
  }
}

class Main extends React.Component {
  render() {
    return (
      <div>
        <hr />
        <SlideShow />
        <a href="/inventory">
          <hr />
          <h3>Inventory</h3>
        </a>
        <a href="/sell">
          <hr />
          <h3>Sell a Vehicle</h3>
        </a>
        <a href="/contact">
          <hr />
          <h3>Talk to Us</h3>
        </a>
        <img alt="man standing by wheel of car" src={`${process.env.REACT_APP_API}/images/quote.jpg`} />
        <p>
          “Jim and his team at GVM helped make the process comfortable, safe and low stress. The car was described
          clearly, including known defects, great photos and I was able to communicate at length with Jim by email and
          phone, which made me really comfortable with my purchase decision. If this had been a private seller, I don’t
          think I would have taken the risk to buy the car without test inspecting it first. I felt confident I was
          buying a good car from a good source.”
        </p>
        <p>George Fox, GVM Customer, Car Buyer/Owner</p>
        <h3>Articles</h3>
        <hr />
        <a target="_blank" href="https://forzamotorsport.net/en-us/news/hma_7_5_12/">
          <b>forzamotorsport.net - Heavy Metal Affliction -- Giordano's Vintage Motors</b>
        </a>
        <a href="/inventory">
          <hr />
          <h3>See Our Inventory</h3>
        </a>
        <a href="/contact">
          <hr />
          <h3>Contact Us</h3>
        </a>
        <hr />
        <h3>Visit Us</h3>
        <hr />
        <div style={{ "text-align": "center" }}>
          <p>Tuesday-Saturday: 10:00am-5:00pm</p>
          <p>Sunday: Closed</p>
          <p>Other times by appointment</p>
        </div>
        <a
          target="_blank"
          href="https://www.google.com/maps/place/4501+Tolt+Ave,+Carnation,+WA+98014/@47.5870568,-121.8637045,10z/data=!4m5!3m4!1s0x54907699a5565d6d:0x2221acbaaaec123e!8m2!3d47.6480581!4d-121.9145478?hl=en&authuser=0"
        >
          <img src={`${process.env.REACT_APP_API}/images/map.jpg`} />
        </a>
        <div style={{ "text-align": "center" }}>
          <p>4501 Tolt Avenue,</p>
          <p>Carnation, WA 98014</p>
          <p>Call: 425-333-5600</p>
        </div>
      </div>
    );
  }
}
export default Main;
