import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { TokenContext } from './TokenContext';
import { useNavigate } from 'react-router-dom';

const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const DropdownContent = styled.div<{ show: boolean }>`
    display: ${(props) => (props.show ? 'block' : 'none')};
    position: absolute;
    background-color: #f9f9f9;
    min-width: 200px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 12px 16px;
    z-index: 1;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 8px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

type Credentials = {
    username: string;
    password: string;
};

const LoginDropdown: React.FC<{ onLogin: (data: Credentials) => void }> = () => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const { login } = useContext(TokenContext)!;
    const { register, handleSubmit } = useForm<Credentials>();
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: Credentials) => {
        try {
          await login(data.username, data.password);
          navigate('/protected')
        } catch (error) {
          console.error('Login failed', error);
          setError('Login failed. Please check your credentials and try again.');
        };
      };

    return (
        <DropdownContainer>
            <Button onClick={() => setShowDropdown(!showDropdown)}>Login</Button>
            <DropdownContent show={showDropdown}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Input type="text" placeholder="Username" {...register('username')} />
                    <Input type="password" placeholder="Password" {...register('password')} />
                    <Button type="submit">Submit</Button>
                </Form>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </DropdownContent>
        </DropdownContainer>
    );
};

export default LoginDropdown;