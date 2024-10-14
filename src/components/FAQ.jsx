import { useState } from 'react';
import styled from 'styled-components';

// FAQ Data Example
const faqData = [
  {
    question: 'What is ScrollMe?',
    answer:
      'ScrollMe is a dynamic e-commerce platform offering a wide range of products to cater to your shopping needs, all from the comfort of your home.'
  },
  {
    question: 'How do I track my order?',
    answer:
      "You can track your order by logging into your account and visiting the 'My Orders' section. There, you'll find real-time updates on your order status."
  },
  {
    question: 'What payment methods are accepted?',
    answer:
      'We accept various payment methods, including credit/debit cards, PayPal, and popular UPI services for seamless and secure transactions.'
  },
  {
    question: 'What is your return policy?',
    answer:
      "Our return policy allows you to return items within 30 days of delivery, provided they are in original condition. Visit the 'Returns & Refunds' section for more details."
  }
];

// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: 5px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const Heading = styled.h2`
  color: teal;
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Question = styled.h3`
  color: teal;
  cursor: pointer;
  padding: 10px;
  margin: 10px;
  background-color: #e6f7f8;
  border: 1px solid teal;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cceff0;
  }
`;

const Answer = styled.p`
  padding: 10px;
  margin: 5px 0 15px 0;
  background-color: #f0fefe;
  border: 1px solid teal;
  border-radius: 5px;
`;

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Toggle the active question
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Container>
      <Heading>Frequently Asked Questions</Heading>
      {faqData.map((faq, index) => (
        <div key={index}>
          <Question onClick={() => toggleFAQ(index)}>{faq.question}</Question>
          {activeIndex === index && <Answer>{faq.answer}</Answer>}
        </div>
      ))}
    </Container>
  );
};

export default FAQ;
