import { useState } from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: 100px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const Heading = styled.h2`
  color: teal;
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  color: teal;
  font-weight: bold;
  text-align: left;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid teal;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid teal;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  resize: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: teal;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  transition: transform 0.2s ease;
  width: auto;

  &:hover {
    background-color: #008080;
    transform: scale(1.1);
  }
`;

// Responsive design for smaller screens
const ResponsiveContainer = styled.div`
  @media (max-width: 600px) {
    ${Container} {
      padding: 15px;
    }
    ${Heading} {
      font-size: 24px;
    }
    ${Input}, ${TextArea}, ${Button} {
      font-size: 14px;
    }
    ${ButtonContainer} {
      justify-content: center;
    }
  }
`;

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Received your response. We will reach back to you soon.');
    console.log(formData);
  };

  return (
    <ResponsiveContainer>
      <Container>
        <Heading>Contact Us</Heading>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor='name'>Name</Label>
          <Input type='text' id='name' name='name' value={formData.name} onChange={handleChange} placeholder='Enter your name' required />
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter your email'
            required
          />
          <Label htmlFor='message'>Message</Label>
          <TextArea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            placeholder='Your message'
            rows='5'
            required
          />
          <ButtonContainer>
            <Button type='submit'>Send Message</Button>
          </ButtonContainer>
        </Form>
      </Container>
    </ResponsiveContainer>
  );
};

export default ContactUs;
