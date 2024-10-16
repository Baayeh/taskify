import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldProps, Form, Formik } from "formik";
import { Fingerprint, Mail, User } from "lucide-react";
import * as Yup from "yup";

interface initialValueProps {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const initialValue: initialValueProps = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Too Short!")
    .required("First name is required"),
  last_name: Yup.string()
    .min(2, "Too Short!")
    .required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Register = () => {
  const handleRegister = () => {
    console.log("register");
  };

  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ isValid }) => {
          return (
            <Form>
              <div className="mb-5 grid lg:grid-cols-2 gap-5">
                <Field name="first_name">
                  {({ field, meta }: FieldProps) => (
                    <div>
                      <Label htmlFor="first_name" className="relative">
                        <Input
                          id="first_name"
                          type="text"
                          placeholder="First Name"
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
                          <User size={20} />
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
                <Field name="last_name">
                  {({ field, meta }: FieldProps) => (
                    <div>
                      <Label htmlFor="last_name" className="relative">
                        <Input
                          id="last_name"
                          type="text"
                          placeholder="Last Name"
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
                          <User size={20} />
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
              </div>
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
                  disabled={!isValid}
                  variant="default"
                  className="rounded-full w-[150px] h-12"
                >
                  Sign up for free
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default Register;
