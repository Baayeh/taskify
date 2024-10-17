/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LOGIN_USER } from "@/features/services/auth";
import { useAuth } from "@/hooks/useAuth";
import { Field, FieldProps, Form, Formik } from "formik";
import { Fingerprint, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";

interface initialValueProps {
  email: string;
  password: string;
}

const initialValue: initialValueProps = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (values: initialValueProps) => {
    setLoading(true);

    try {
      await LOGIN_USER(values).then((res) => {
        toast.success(res.message);
        login(res.access_token, res.refresh_token, res.user);

        navigate("/tasks", { replace: true });
        console.log(res);
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ isValid }) => {
          return (
            <Form>
              <Field name="email">
                {({ field, meta }: FieldProps) => (
                  <div className="mb-5">
                    <Label htmlFor="email" className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className={`h-14 border pl-12 rounded-full peer text-base ${
                          meta.touched && meta.error
                            ? "border-destructive placeholder:text-destructive text-destructive focus-visible:ring-0"
                            : "border-muted placeholder:text-gray-600"
                        }`}
                        {...field}
                      />
                      <span
                        className={`absolute inset-y-0 left-1 flex items-center pl-3 transition-colors duration-300 ease-in-out ${
                          meta.touched && meta.error
                            ? "text-destructive"
                            : "text-gray-600 peer-focus:text-primary"
                        }`}
                      >
                        <Mail size={20} />
                      </span>
                    </Label>
                    {meta.touched && meta.error && (
                      <p className="text-xs text-destructive pl-3 mt-1">
                        {meta.error}
                      </p>
                    )}
                  </div>
                )}
              </Field>

              <Field name="password">
                {({ field, meta }: FieldProps) => (
                  <div className="mb-5">
                    <Label htmlFor="password" className="relative">
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className={`h-14 border pl-12 rounded-full peer text-base ${
                          meta.touched && meta.error
                            ? "border-destructive placeholder:text-destructive text-destructive focus-visible:ring-0"
                            : "border-muted placeholder:text-gray-600"
                        }`}
                        {...field}
                      />
                      <span
                        className={`absolute inset-y-0 left-1 flex items-center pl-3 transition-colors duration-300 ease-in-out ${
                          meta.touched && meta.error
                            ? "text-destructive"
                            : "text-gray-600 peer-focus:text-primary"
                        }`}
                      >
                        <Fingerprint size={20} />
                      </span>
                    </Label>
                    {meta.touched && meta.error && (
                      <p className="text-xs text-destructive pl-3 mt-1">
                        {meta.error}
                      </p>
                    )}
                  </div>
                )}
              </Field>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={!isValid || loading}
                  variant="default"
                  className="rounded-full w-[150px] h-12"
                >
                  {loading ? <ClipLoader color="#fff" /> : "Login"}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default Login;
