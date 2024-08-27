import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import React from "react";

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole("textbox");
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  if (email) userEvent.type(emailInputElement, email);
  if (password) userEvent.type(passwordInputElement, password);
  if (confirmPassword)
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  };
};

const clickOnSubmitBtn = () => {
  const submitBtnElement = screen.getByRole("button", { name: /submit/i });
  userEvent.click(submitBtnElement);
};

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("inputs should be initially empty", () => {
    const emailInputElement = screen.getByRole("textbox");
    const passwordInputElement = screen.getByLabelText("Password");
    const confirmPasswordInputElement =
      screen.getByLabelText(/confirm password/i);
    expect(emailInputElement.value).toBe("");
    expect(passwordInputElement.value).toBe("");
    expect(confirmPasswordInputElement.value).toBe("");
  });

  test("should be able to type an email", () => {
    // const emailInputElement = screen.getByRole("textbox", { name: /email/i });
    // userEvent.type(emailInputElement, "hanie@gmail.com");
    const { emailInputElement } = typeIntoForm({ email: "hanie@gmail.com" });
    expect(emailInputElement.value).toBe("hanie@gmail.com");
  });

  test("should be able to type a password", () => {
    // const passwordInputElement = screen.getByLabelText("Password");
    // userEvent.type(passwordInputElement, "password!");
    const { passwordInputElement } = typeIntoForm({ password: "password!" });
    expect(passwordInputElement.value).toBe("password!");
  });

  test("should be able to type a confirm password", () => {
    const { confirmPasswordInputElement } = typeIntoForm({
      confirmPassword: "password!",
    });
    expect(confirmPasswordInputElement.value).toBe("password!");
  });

  describe("Error Handling", () => {
    test("should show email error massage invalid email", () => {
      //when doesn't exist in the document, write query instead of get
      const emailErrorElement = screen.queryByText(/invalid email/i); //initially nul
      expect(emailErrorElement).not.toBeInTheDocument();
      typeIntoForm({
        email: "haniegmail.com",
      });
      clickOnSubmitBtn();
      waitFor(() =>
        expect(screen.queryByText(/invalid email/i)).toBeInTheDocument()
      );
    });

    test("should show password error if password is less than 5 characters", () => {
      typeIntoForm({
        email: "haniegmail.com",
      });
      expect(
        screen.queryByText(
          /the password you entered should contain 5 or more characters/i
        )
      ).not.toBeInTheDocument();

      typeIntoForm({
        password: "1234",
      });
      clickOnSubmitBtn();

      waitFor(() =>
        expect(
          screen.queryByText(
            /the password you entered should contain 5 or more characters/i
          )
        ).toBeInTheDocument()
      );
    });

    test("should show confirm password error if passwords don't match", () => {
      typeIntoForm({
        email: "hanie@gmail.com",
        password: "12345",
      });
      expect(
        screen.queryByText(/the password don't match. try again./i)
      ).not.toBeInTheDocument();

      typeIntoForm({
        confirmPassword: "123456",
      });
      clickOnSubmitBtn();

      waitFor(() =>
        expect(
          screen.queryByText(/the password don't match. try again./i)
        ).toBeInTheDocument()
      );
    });

    test("should show error message if confirm passwrd input is empty", () => {
      typeIntoForm({
        email: "hanie@gmail.com",
        password: "1234567",
      });
      clickOnSubmitBtn();
      waitFor(() =>
        expect(
          screen.queryByText(/the password don't match. try again./i)
        ).toBeInTheDocument()
      );
    });

    test("should show no error message if every input is valid", () => {
      typeIntoForm({
        email: "hanie@gmail.com",
        password: "12345",
        confirmPassword: "12345",
      });
      clickOnSubmitBtn();
      expect(
        screen.queryByText(/The email you input is invalid/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(
          /the password you entered should contain 5 or more characters/i
        )
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(
          /the password you entered should contain 5 or more characters/i
        )
      ).not.toBeInTheDocument();
    });
  });
});
