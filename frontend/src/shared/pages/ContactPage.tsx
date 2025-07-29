// src/shared/pages/ContactPage.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h1>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <Input
                type="text"
                id="name"
                placeholder="John Doe"
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <Input
                type="text"
                id="subject"
                placeholder="Question about..."
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <Textarea
                id="message"
                rows={5}
                placeholder="Your message here..."
                className="w-full"
              />
            </div>

            <Button type="submit" className="w-full md:w-auto">
              Send Message
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t">
            <h2 className="text-lg font-semibold mb-2">Other Ways to Reach Us</h2>
            <ul className="space-y-2 text-gray-600">
              <li>Email: support@quizmaster.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Office Hours: Mon-Fri, 9AM-5PM</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}