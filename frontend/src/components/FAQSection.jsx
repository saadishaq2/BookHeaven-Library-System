import React, { useState } from "react";
import { Container, Accordion, Form } from "react-bootstrap";

const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      question: "How can I place an order?",
      answer:
        "Simply browse our collection, add your favorite books to the cart, and proceed to checkout. You can pay using cash on delivery or secure online payment.",
    },
    {
      question: "Do you offer free shipping?",
      answer:
        "Yes! We offer free shipping on orders above Rs. 2000. Orders below that have a small delivery fee.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Orders are usually delivered within 3–5 working days depending on your location.",
    },
    {
      question: "Can I return or exchange a book?",
      answer:
        "Yes, you can return or exchange any damaged or incorrect item within 7 days of delivery. Please ensure the book is unused and in its original condition.",
    },
    {
      question: "Do you sell eBooks?",
      answer:
        "Currently, we specialize in physical books. However, eBooks and audiobooks are coming soon!",
    },
    {
      question: "Can I track my order?",
      answer:
        "Absolutely! Once your order is shipped, we’ll send you a tracking link via email or SMS.",
    },
  ];

  // Filter FAQs based on search
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section
      className="faqs"
      style={{
        backgroundColor: "#f8f9fa",
      }}
    >
      <Container className="my-5">
        <div className="faqs text-center mb-5">
          <h2 className="fw-bold text-success">
            📖 Frequently Asked Questions
          </h2>
          <p className="text-muted mt-2">
            <strong>
              Have questions about our bookstore? Find your answers below or
              search to get help faster!
            </strong>
          </p>
        </div>

        {/* 🔍 Search Bar */}
        <Form className="mb-4">
          <Form.Control
            type="text"
            placeholder="Search your question..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 shadow-sm border-success"
          />
        </Form>

        {/* FAQ Accordion */}
        {filteredFaqs.length > 0 ? (
          <Accordion defaultActiveKey="0" className="shadow-sm rounded-3">
            {filteredFaqs.map((faq, index) => (
              <Accordion.Item
                eventKey={index.toString()}
                key={index}
                className="mb-2 border-success"
              >
                <Accordion.Header>{faq.question}</Accordion.Header>
                <Accordion.Body className="bg-light text-secondary">
                  {faq.answer}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : (
          <p className="text-center text-muted">
            No FAQs match your search.
          </p>
        )}
      </Container>
    </section>
  );
};

export default FAQSection;
