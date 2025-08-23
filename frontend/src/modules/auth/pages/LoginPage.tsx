import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../validations/Login-Validation";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '@/context/AuthContext'; // Import useAuth

const LoginPage = () => {
  const { login } = useAuth(); // Get the login function from context
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, data);

      // Call the login function from the context to update the global state
      login(response.data.token);

      const { userType } = response.data;
      if (userType === 'teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/student/dashboard');
      }

    } catch (error: any) {
      console.error("Login failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-15">
      <CardHeader>
        <CardTitle className="text-center">Login to QuizMaster</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input {...register("email")} id="email" type="email" placeholder="user@example.com" />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input {...register("password")} id="password" type="password" placeholder="••••••••" />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;