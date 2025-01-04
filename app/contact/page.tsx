"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to a backend API
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center mb-5">
        <div className="col-md-8 text-center">
          <h1 className="display-4 fw-bold mb-3">Get in Touch</h1>
          <p className="lead text-muted">
            We're here to help and answer any question you might have. We look
            forward to hearing from you!
          </p>
        </div>
      </div>
      <div className="row g-4">
        <div className="col-md-5 order-md-2">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <h2 className="h4 mb-4">Contact Information</h2>
              <ul className="list-unstyled mb-4">
                <li className="mb-3 d-flex">
                  <MapPin className="me-3 text-primary" />
                  <div>
                    <strong>Address:</strong>
                    <br />
                    123 Sky Avenue, Cloud City,
                    <br />
                    Airspace 54321
                  </div>
                </li>
                <li className="mb-3 d-flex">
                  <Phone className="me-3 text-primary" />
                  <div>
                    <strong>Phone:</strong>
                    <br />
                    +1 (555) 123-4567
                  </div>
                </li>
                <li className="mb-3 d-flex">
                  <Mail className="me-3 text-primary" />
                  <div>
                    <strong>Email:</strong>
                    <br />
                    info@flightfinder.com
                  </div>
                </li>
              </ul>
              <h3 className="h5 mb-3">Connect With Us</h3>
              <div className="d-flex gap-2">
                <a
                  href="#"
                  className="btn btn-outline-primary rounded-circle"
                  aria-label="Facebook"
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-outline-primary rounded-circle"
                  aria-label="Twitter"
                >
                  <i className="bi bi-twitter"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-outline-primary rounded-circle"
                  aria-label="Instagram"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-outline-primary rounded-circle"
                  aria-label="LinkedIn"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-7 order-md-1">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h2 className="h4 mb-4">Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
                    <select
                      className="form-select"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Choose a subject...</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="support">Customer Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary d-flex align-items-center"
                    >
                      <Send size={18} className="me-2" />
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
