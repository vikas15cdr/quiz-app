import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface Question {
  text: string;
  options: string[];
  correctAnswer: string; // index as string for form
}

interface QuizFormData {
  title: string;
  description: string;
  category: string;
  isPublished: boolean;
  questions: Question[];
}

const EditQuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuizFormData>({
    defaultValues: {
      title: '',
      description: '',
      category: 'General',
      isPublished: false,
      questions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("No token found. Please login.");

        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/quizzes/edit/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const quizData = response.data.data;

        const formattedQuestions = quizData.questions.map((q: Question) => ({
          ...q,
          correctAnswer: q.options.indexOf(q.correctAnswer).toString(),
        }));

        reset({ ...quizData, questions: formattedQuestions });
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error("Failed to fetch quiz:", error.response?.data?.message || error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    fetchQuiz();
  }, [id, reset]);

  const onSubmit = async (data: QuizFormData) => {
    const processedData = {
      ...data,
      questions: data.questions.map(q => {
        const correctIndex = parseInt(q.correctAnswer, 10);
        return {
          text: q.text,
          options: q.options,
          correctAnswer: q.options[correctIndex],
        };
      }),
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("No token found. Please login.");

      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/quizzes/${id}`, processedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate('/teacher/dashboard');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to update quiz:", error.response?.data?.message || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto my-5">
      <CardHeader>
        <CardTitle className="text-center">Edit Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Quiz Title</Label>
            <Input id="title" {...register("title", { required: "Title is required" })} />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" {...register("description")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select id="category" {...register("category")} className="w-full p-2 border rounded-md">
              <option>General</option>
              <option>Science</option>
              <option>Math</option>
              <option>History</option>
              <option>Programming</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="isPublished" {...register("isPublished")} className="h-4 w-4" />
            <Label htmlFor="isPublished">Publish this quiz</Label>
          </div>

          <h3 className="text-lg font-semibold border-t pt-4">Questions</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-md space-y-4 relative">
              <Label>Question {index + 1}</Label>
              <Input
                placeholder="Question text"
                {...register(`questions.${index}.text`, { required: "Question text is required" })}
              />
              {errors.questions?.[index]?.text && (
                <p className="text-red-500 text-sm">{errors.questions[index].text?.message}</p>
              )}

              <Label>Options (Select the correct one)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[0, 1, 2, 3].map(optionIndex => (
                  <div key={optionIndex} className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...register(`questions.${index}.correctAnswer`, {
                        required: "Please select a correct answer",
                      })}
                      value={optionIndex.toString()}
                      className="h-5 w-5"
                    />
                    <Input
                      placeholder={`Option ${optionIndex + 1}`}
                      {...register(`questions.${index}.options.${optionIndex}`, {
                        required: "Option cannot be empty",
                      })}
                    />
                  </div>
                ))}
              </div>
              {errors.questions?.[index]?.correctAnswer && (
                <p className="text-red-500 text-sm">{errors.questions[index].correctAnswer?.message}</p>
              )}

              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
                className="absolute top-2 right-2"
              >
                Remove
              </Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() => append({ text: '', options: ['', '', '', ''], correctAnswer: '' })}
          >
            Add Question
          </Button>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Saving Changes..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditQuizPage;
