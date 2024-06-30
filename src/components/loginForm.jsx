import { Button, Form, Spinner } from "react-bootstrap";
import CustomInput from "./customInput";
import { useEffect, useState } from "react";
import { loginUser } from "../axios/userAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../redux/user/userAction";

const initialFormData = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { email, password } = formData;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  // Handle onChange
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // useEffect for validity
  useEffect(() => {
    if (email.trim() && password.trim()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  // Navigating

  const navigate = useNavigate();

  // Dispatch
  const dispatch = useDispatch();

  // Form Submit
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginUserAction(formData));
  };

  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/transaction");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Form onSubmit={handleOnSubmit}>
      <CustomInput
        label="Email"
        handleOnChange={handleOnChange}
        inputAttributes={{
          type: "email",
          name: "email",
          placeholder: "Enter your Email",
          value: email,
          required: true,
        }}
      />
      <CustomInput
        label="Password"
        handleOnChange={handleOnChange}
        inputAttributes={{
          type: "password",
          name: "password",
          placeholder: "Enter your Password",
          value: password,
          required: true,
        }}
      />

      <Button
        variant="primary"
        type="submit"
        disabled={isSubmitting || isDisabled}
      >
        {isSubmitting ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          "Login"
        )}
      </Button>
    </Form>
  );
};

export default LoginForm;
