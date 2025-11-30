import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import FAQSection from "./FAQSection";

function AboutSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const authors = [
    {
      name: "John Green",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
      bio: "Bestselling author known for emotionally rich and inspiring novels like 'The Fault in Our Stars'.",
    },
    {
      name: "Elena Gilbert",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      bio: "Award-winning writer and storyteller who blends romance and mystery in her captivating books.",
    },
    {
      name: "Ali Abbas",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
      bio: "Pakistani author known for insightful books on culture, history, and self-development.",
    },
  ];

  return (
    <>
      {/* About Section */}
      <section id="about" className="about-section py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="section-title text-success fw-bold">About Our Books</h2>
            <p className="text-muted">
              <strong>Discover the world of stories, knowledge, and imagination at BookHaven.</strong>
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="100">
              <div className="about-card text-center p-4 shadow-sm border rounded bg-white h-100">
                <i className="fas fa-book-reader about-icon text-success fa-2x mb-3"></i>
                <h4 className="fw-bold">Vast Collection</h4>
                <p className="text-muted">
                  Access over 50,000 books across fiction, non-fiction, self-help, business, and more.
                  Find your perfect read every time.
                </p>
              </div>
            </div>

            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="200">
              <div className="about-card text-center p-4 shadow-sm border rounded bg-white h-100">
                <i className="fas fa-mobile-alt about-icon text-primary fa-2x mb-3"></i>
                <h4 className="fw-bold">Read Anywhere</h4>
                <p className="text-muted">
                  Enjoy seamless reading on any device — smartphone, tablet, or computer.
                  Your library follows you everywhere.
                </p>
              </div>
            </div>

            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="300">
              <div className="about-card text-center p-4 shadow-sm border rounded bg-white h-100">
                <i className="fas fa-star about-icon text-warning fa-2x mb-3"></i>
                <h4 className="fw-bold">Curated Selections</h4>
                <p className="text-muted">
                  Discover handpicked recommendations, bestsellers, and hidden gems selected by our
                  expert literary team.
                </p>
              </div>
            </div>
          </div>

          <div className="row mt-5 g-4">
            <div className="col-md-6" data-aos="fade-right">
              <div className="about-card p-4 shadow-sm border rounded bg-white h-100">
                <h4 className="fw-bold">
                  <i className="fas fa-heart text-danger me-2"></i>Why Readers Love Us
                </h4>
                <p className="text-muted">
                  BookHaven provides an immersive reading experience with features like adjustable
                  fonts, night mode, bookmarks, and personalized recommendations based on your
                  reading history.
                </p>
              </div>
            </div>

            <div className="col-md-6" data-aos="fade-left">
              <div className="about-card p-4 shadow-sm border rounded bg-white h-100">
                <h4 className="fw-bold">
                  <i className="fas fa-users text-primary me-2"></i>Join Our Community
                </h4>
                <p className="text-muted">
                  Connect with fellow book lovers, join reading clubs, participate in author Q&As,
                  and share your thoughts through reviews and ratings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Authors */}
      <section className="authors-section py-5 ">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="section-title text-success fw-bold">Meet Our Authors</h2>
            <p className="text-muted"><strong>Get to know the brilliant minds behind your favorite books.</strong></p>
          </div>

          <div className="row g-4 bg-light">
            {authors.map((author, index) => (
              <div
                key={index}
                className="col-md-4"
                data-aos="zoom-in"
                data-aos-delay={index * 200}
              >
                <div className="card shadow-sm border-0 text-center h-100 author-card">
                  <img
                    src={author.image}
                    className="card-img-top rounded-circle mx-auto mt-4"
                    alt={author.name}
                    style={{
                      width: "130px",
                      height: "130px",
                      objectFit: "cover",
                      border: "4px solid #198754",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="fw-bold text-success">{author.name}</h5>
                    <p className="text-muted small">{author.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div data-aos="fade-up" data-aos-delay="200">
        <FAQSection />
      </div>
    </>
  );
}

export default AboutSection;
