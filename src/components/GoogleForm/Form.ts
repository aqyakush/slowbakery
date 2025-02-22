import styled from "styled-components"
import { Button } from "../StyledComponets";

export const FormSection = styled.section`
  margin-bottom: 1rem;  
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FormWrapper = styled.div`
  min-height: 600px; /* Adjust this value based on the form's height */
  `;

export const Label = styled.label`
  margin-top: 10px;
  margin-bottom: 1px;
  color: ${(props) => props.theme.textColor};
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const SubmitButton = styled(Button)`
  width: fit-content; 
  align-self: center;
`;