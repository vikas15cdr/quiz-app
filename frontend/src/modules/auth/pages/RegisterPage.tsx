import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../validations/Register-Validation";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // Import axios

const RegisterPage = () => {
  const navigate = useNavigate(); // Hook for navigation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      userType: 'student'
    }
  });

  // Updated onSubmit function to be async and handle API call
  const onSubmit = async (data) => {
    try {
      // Send a POST request to your backend's register endpoint
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, data);
      
      console.log("Registration successful:", response.data);
      
      // Optional: Add a success message/toast here
      
      // Redirect the user to the login page after successful registration
      navigate('/login');

    } catch (error) {
      // Log the error if the request fails
      console.error("Registration failed:", error.response?.data?.message || error.message);
      // Optional: Display an error message to the user
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-5">
      <CardHeader>
        <CardTitle className="text-center">Create an Account</CardTitle>
        <CardDescription className="text-center">
          Join QuizMaster as a student or teacher
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* --- Your form inputs remain the same --- */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input {...register("name")} id="name" type="text" placeholder="John Doe" />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>
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
          <div className="space-y-2">
            <Label>Account Type</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" value="student" {...register("userType")} className="h-4 w-4 text-primary" />
                Student
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="teacher" {...register("userType")} className="h-4 w-4 text-primary" />
                Teacher
              </label>
            </div>
            {errors.userType && <p className="text-sm text-red-500">{errors.userType.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Register"}
          </Button>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
