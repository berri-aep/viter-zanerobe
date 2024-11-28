
import { Form, Formik } from "formik";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "Yup";
import { InputText } from "../helpers/FormInputs";

const Login = () => {
  const [theme, setTheme] = React.useState(localStorage.getItem("theme"));
  const [showPassword, setShowPassword] = React.useState(false);
  const initVal = {
    user_email: "",
    password: "",
  };
  const yupSchema = Yup.object({
    user_email: Yup.string().required("Required").email("Invalid email"),
    password: Yup.string().required("Required"),
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
  return (
    <main className="h-screen bg-primary center-all">
      <div className="login-main bg-secondary max-w-[320px] w-full p-4 border border-line rounded-md">
        <h3 className="text-center py-2 ">ZANEROBE</h3>
        <h5 className="text-center">Welcome to Zanerobe Admin</h5>
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
                <div className="input-wrap">
                  <InputText
                    label="Email"
                    type="email"
                    className="!py-2"
                    name="user_email"
                  />
                </div>
                <div className="input-wrap">
                 
                  <InputText
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    className="!py-2"
                    name="password"
                  />
                  <button
                    className="absolute bottom-2.5 right-2 "
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
                
                <p className="text-right">
                <Link
                  to="/admin/forgot-password"
                  className="text-xs italic hover:text-accent"
                >
                  Forgot Password
                </Link>
                </p>

                <button className="btn btn-accent w-full center-all mt-5">
                  Login
                </button>
                <Link
                  to="/"
                  className="text-sm text-center block mt-5 hover:text-accent flex items-center center-all"
                >
                  <ArrowLeft /> Go Back To Web Page
                </Link>
              </Form>
            );
          }}
        </Formik>
      </div>
    </main>
  );
};

export default Login;
