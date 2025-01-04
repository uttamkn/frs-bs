import {
  Plane,
  Users,
  Globe,
  Shield,
  Star,
  Clock,
  CreditCard,
  HeadphonesIcon,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center mb-5">
        <div className="col-md-8 text-center">
          <h1 className="display-4 fw-bold mb-3">About Flight Finder</h1>
          <p className="lead text-muted">
            Connecting you to the world, one flight at a time.
          </p>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <h2 className="h3 card-title mb-3">Our Mission</h2>
              <p className="card-text">
                At Flight Finder, our mission is to revolutionize the way people
                search for and book flights. We're committed to providing a
                seamless, user-friendly platform that offers unparalleled access
                to a wide range of flight options at competitive prices. Our
                goal is to make air travel more accessible, convenient, and
                enjoyable for everyone, whether you're a frequent flyer or an
                occasional traveler.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <h2 className="h3 card-title mb-3">Our Vision</h2>
              <p className="card-text">
                We envision a future where travel knows no bounds. Flight Finder
                aims to be at the forefront of innovation in the travel
                industry, continuously improving our technology and services to
                meet the evolving needs of global travelers. We strive to
                inspire people to explore the world, connect cultures, and
                create unforgettable experiences through the power of seamless
                air travel.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="h2 text-center mb-4">Why Choose Flight Finder?</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-5">
        <div className="col">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <Plane className="text-primary mb-3" size={48} />
              <h3 className="h5 card-title">Extensive Selection</h3>
              <p className="card-text">
                Access to thousands of flights from hundreds of airlines
                worldwide.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <Users className="text-primary mb-3" size={48} />
              <h3 className="h5 card-title">Customer-Centric</h3>
              <p className="card-text">
                Dedicated support team to assist you every step of the way.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <Globe className="text-primary mb-3" size={48} />
              <h3 className="h5 card-title">Global Reach</h3>
              <p className="card-text">
                Connecting you to destinations across the globe with ease.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <Shield className="text-primary mb-3" size={48} />
              <h3 className="h5 card-title">Secure Booking</h3>
              <p className="card-text">
                State-of-the-art security measures to protect your information.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mb-5">
        <div className="col-md-8 text-center">
          <h2 className="h2 mb-4">Our Commitment to You</h2>
          <p className="lead mb-5">
            At Flight Finder, we're more than just a flight search engine. We're
            your trusted partner in travel, committed to providing you with the
            best possible experience from start to finish.
          </p>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col">
          <div className="d-flex align-items-start">
            <Star className="text-primary me-3 flex-shrink-0" size={24} />
            <div>
              <h3 className="h5 mb-2">Best Price Guarantee</h3>
              <p>
                We're committed to offering the most competitive prices in the
                market.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="d-flex align-items-start">
            <Clock className="text-primary me-3 flex-shrink-0" size={24} />
            <div>
              <h3 className="h5 mb-2">24/7 Customer Support</h3>
              <p>
                Our dedicated team is always ready to assist you, anytime,
                anywhere.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="d-flex align-items-start">
            <CreditCard className="text-primary me-3 flex-shrink-0" size={24} />
            <div>
              <h3 className="h5 mb-2">Flexible Payment Options</h3>
              <p>
                Choose from a variety of payment methods that suit your needs.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="d-flex align-items-start">
            <HeadphonesIcon
              className="text-primary me-3 flex-shrink-0"
              size={24}
            />
            <div>
              <h3 className="h5 mb-2">Personalized Service</h3>
              <p>
                We tailor our services to meet your unique travel requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
