
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeClosed,
  EyeOff,
  MailCheck,
  ShieldCheck,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "Yup";
import SpinnerButton from "../partials/spinners/SpinnerButton";
import { InputText } from "../helpers/FormInputs";

const SetPassword = () => {
  const [theme, setTheme] = React.useState(localStorage.getItem("theme"));
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [showIconConfirmPassword, setIconShowConfirmPassword] =
    React.useState(false);
  const [Succes, setSucces] = React.useState(false);
  const [showIconPassword, setShowIconPassword] = React.useState(false);
  const [lowerValidated, setLowerValidated] = React.useState(false);
  const [upperValidated, setUpperValidated] = React.useState(false);
  const [numberValidated, setNumberValidated] = React.useState(false);
  const [specialValidated, setSpecialValidated] = React.useState(false);
  const [lengthValidated, setLengthValidated] = React.useState(false);

  const initVal = {
    new_password: "",
    confirm_password: "",
  };
  const yupSchema = Yup.object({
    new_password: Yup.string()
      .required("Required")
      .min(8, "At least 8 characters.")
      .matches("(?=.*[a-z])", "At least one lowercase letter.")
      .matches("(?=.*[A-Z])", "At least one uppercase letter.")
      .matches("(?=.[!@#$%^&`{;:',<.>/?}_-])", "Atleast 1 special character.")
      .matches("(?=.*[0-9])", "Atleast 1 number."),
    confirm_password: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("new_password"), null], "Passwords does not match."),
  });

  React.useEffect(() => {
    function setThemeColor() {
      const html = document.querySelector("html");
      html.setAttribute("class", "");
      html.classList.add(theme);
      setTheme(localStorage.getItem("theme"));
    }

    setThemeColor();
  }, [theme]);

  const handleChangePasswordInput = (e) => {
    if (e.target.value === "") {
      setShowIconPassword(false);
    } else {
      setShowIconPassword(true);
    }
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.[!@#$%^&`{;:',<.>/?}_-])");
    const length = new RegExp("(?=.{8,})");

    if (lower.test(e.target.value)) {
      setLowerValidated(true);
    } else {
      setLowerValidated(false);
    }
    if (upper.test(e.target.value)) {
      setUpperValidated(true);
    } else {
      setUpperValidated(false);
    }
    if (number.test(e.target.value)) {
      setNumberValidated(true);
    } else {
      setNumberValidated(false);
    }
    if (special.test(e.target.value)) {
      setSpecialValidated(true);
    } else {
      setSpecialValidated(false);
    }
    if (length.test(e.target.value)) {
      setLengthValidated(true);
    } else {
      setLengthValidated(false);
    }
  };
  const handleChangeConfirmPasswordInput = (e) => {
    if (e.target.value === "") {
      setIconShowConfirmPassword(false);
    } else {
      setIconShowConfirmPassword(true);
    }
  };

  return (
    <main className="h-screen bg-primary center-all">
      <div className="login-main bg-secondary max-w-[320px] w-full p-4 border border-line rounded-md">
        <h3 className="text-center py-2">ZANEROBE</h3>

        {Succes ? (
          <div className="success-message mt-5">
            <ShieldCheck size={50} stroke="white" className="mx-auto" />
            <p className="my-5 text-center">
              Your Password is ready to use. Click the link to continue.
            </p>
            <Link
              to="/admin/login"
              className="text-center block hover:text-accent"
            >
              Back To Login
            </Link>
          </div>
        ) : (
          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values) => {
              console.log(values);
            }}
          >
            {(props) => {
              return (
                <Form>
                  <h5 className="text-center">Set Password</h5>

                  <div className="input-wrap">
                    <InputText
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      className="!py-2"
                      name="new_password"
                      onChange={(e) => handleChangePasswordInput(e)}
                    />
                    {showIconPassword && (
                      <button
                        className="absolute bottom-2.5 right-2 "
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                      >
                        {showPassword ? (
                          <Eye size={18} />
                        ) : (
                          <EyeOff size={18} />
                        )}
                      </button>
                    )}
                  </div>
                  <div className="input-wrap">
                    <InputText
                      label="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      className="!py-2"
                      name="confirm_password"
                      onChange={(e) => handleChangeConfirmPasswordInput(e)}
                    />
                    {showIconConfirmPassword && (
                      <button
                        className="absolute bottom-2.5 right-2 "
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        type="button"
                      >
                        {showConfirmPassword ? (
                          <Eye size={18} />
                        ) : (
                          <EyeOff size={18} />
                        )}
                      </button>
                    )}
                  </div>
                  <ul className="space-y-3 mt-5">
                    <li
                      className={`flex gap-2 items-center text-sm opacity-50 transition-all duration-200 ${
                        lengthValidated ? "!opacity-100 duration-200" : ""
                      }`}
                    >
                      <CheckCircle2
                        size={16}
                        stroke={
                          lengthValidated ? "green" : "rgba(255,255,255,0.7)"
                        }
                      />
                      Atleast 8 Caharacters
                    </li>
                    <li
                      className={`flex gap-2 items-center text-sm opacity-50 transition-all duration-200 ${
                        upperValidated ? "!opacity-100 duration-200 " : ""
                      }`}
                    >
                      <CheckCircle2
                        size={16}
                        stroke={
                          upperValidated ? "green" : "rgba(255,255,255,0.7)"
                        }
                      />
                      Atleast 1 Uppercase
                    </li>
                    <li
                      className={`flex gap-2 items-center text-sm opacity-50 transition-all duration-200 ${
                        lowerValidated ? "!opacity-100 duration-200" : ""
                      }`}
                    >
                      <CheckCircle2
                        size={16}
                        stroke={
                          lowerValidated ? "green" : "rgba(255,255,255,0.7)"
                        }
                      />
                      Atleast 1 Lowercase
                    </li>
                    <li
                      className={`flex gap-2 items-center text-sm opacity-50 transition-all duration-200 ${
                        numberValidated ? "!opacity-100 duration-200" : ""
                      }`}
                    >
                      <CheckCircle2
                        size={16}
                        stroke={
                          numberValidated ? "green" : "rgba(255,255,255,0.7)"
                        }
                      />
                      Atleast 1 Number
                    </li>
                    <li
                      className={`flex gap-2 items-center text-sm opacity-50 transition-all duration-200 ${
                        specialValidated ? "!opacity-100 duration-200" : ""
                      }`}
                    >
                      <CheckCircle2
                        size={16}
                        stroke={
                          specialValidated ? "green" : "rgba(255,255,255,0.7)"
                        }
                      />
                      Atleast 1 Special Character
                    </li>
                  </ul>
                  <button
                    className="btn btn-accent w-full center-all mt-5"
                    onClick={() => setSucces(true)}
                    type="submit"
                  >
                    <SpinnerButton /> Set Password
                  </button>
                </Form>
              );
            }}
          </Formik>
        )}
      </div>
    </main>
  );
};

export default SetPassword;
