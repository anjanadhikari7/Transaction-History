import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import CustomInput from "./customInput";
import { useState, useEffect } from "react";
import { createUser } from "../axios/userAxios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { SignUpUserAction } from "../redux/user/userAction";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { name, email, password, confirmPassword } = formData;
  const [isDisabled, setIsDisabled] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(null);
  const { isLoading } = useSelector((state) => state.user);

  // Handle onChange
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Use effect to dynamically check for form validity
  useEffect(() => {
    if (password && confirmPassword) {
      const isMatch = password === confirmPassword;
      setIsPasswordMatch(isMatch);
    } else {
      setIsPasswordMatch(null);
    }

    if (
      name.trim() &&
      email.trim() &&
      password.trim() &&
      confirmPassword.trim() &&
      password === confirmPassword
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [name, email, password, confirmPassword]);

  const dispatch = useDispatch();

  // Form Submit
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(SignUpUserAction(formData));
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <CustomInput
        label="Name"
        handleOnChange={handleOnChange}
        inputAttributes={{
          type: "text",
          placeholder: "Enter your Name",
          value: name,
          name: "name",
          required: true,
        }}
      />
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
      <CustomInput
        label="Confirm Password"
        handleOnChange={handleOnChange}
        inputAttributes={{
          type: "password",
          name: "confirmPassword",
          placeholder: "Confirm your Password",
          value: confirmPassword,
          isInvalid: isPasswordMatch === false,
          isValid: isPasswordMatch === true,
          required: true,
        }}
      />
      {isPasswordMatch === false && confirmPassword && (
        <Form.Control.Feedback type="invalid" className="d-block">
          Passwords do not match.
        </Form.Control.Feedback>
      )}
      {isPasswordMatch === true && confirmPassword && (
        <Form.Control.Feedback type="valid" className="d-block">
          Passwords match.
        </Form.Control.Feedback>
      )}
      <Button
        variant="primary"
        type="submit"
        disabled={isDisabled || isLoading}
      >
        {isLoading ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          "Sign Up"
        )}
      </Button>
    </Form>
  );
};

export default SignupForm;
