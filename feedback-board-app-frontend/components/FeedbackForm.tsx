import { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { API_URL } from "../config/config";

// Define the structure of a feedback item (can be shared across components)
interface FeedbackItem {
  _id: string;
  title: string;
  description: string;
  category: "feature" | "bug" | "improvement" | "other";
  upvotes: number;
  createdAt: string;
}

// Define the structure for the API response when submitting feedback
interface SubmitFeedbackResponse {
  success: boolean;
  data?: FeedbackItem;
  message?: string;
}

// Define the props for the FeedbackForm component
interface FeedbackFormProps {
  onFeedbackSubmitted: (newFeedback: FeedbackItem) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onFeedbackSubmitted }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<FeedbackItem["category"]>("feature");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const categories: FeedbackItem["category"][] = [
    "feature",
    "bug",
    "improvement",
    "other",
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.post<SubmitFeedbackResponse>(
        `${API_URL}/feedback`,
        {
          title,
          description,
          category,
        }
      );

      if (response.data.success && response.data.data) {
        setSuccessMessage("Feedback submitted successfully!");
        setTitle("");
        setDescription("");
        setCategory("feature");
        if (onFeedbackSubmitted) {
          onFeedbackSubmitted(response.data.data);
        }
      } else {
        setError(response.data.message || "Failed to submit feedback.");
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(
        err?.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setError("");
        setSuccessMessage("");
      }, 3000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card mb-8 p-6 space-y-6 bg-gray-100 rounded-xl shadow-card"
    >
      <h2 className="text-2xl font-semibold text-neutral-darkest mb-6 text-black">
        Submit Your Feedback
      </h2>

      {error && (
        <p className="text-red-500 bg-red-100 p-3 rounded-md text-sm">
          {error}
        </p>
      )}
      {successMessage && (
        <p className="text-green-600 bg-green-100 p-3 rounded-md text-sm">
          {successMessage}
        </p>
      )}

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-black mb-1"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          className="text-base text-black rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white border border-gray-400 p-2"
          placeholder="A short, descriptive title"
          maxLength={100}
          required
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-black mb-1"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          rows={4}
          className="input-field bg-white border text-black border-gray-400 rounded-md p-2 text-base"
          placeholder="Describe your suggestion or issue in detail"
          maxLength={500}
          required
        ></textarea>
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-black mb-1"
        >
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          value={category}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setCategory(e.target.value as FeedbackItem["category"])
          }
          className="input-field text-black bg-white border border-gray-400 rounded-md p-2 text-base"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat} className="capitalize">
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="btn-primary w-full py-3 disabled:opacity-50 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200 rounded-md"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit Feedback"}
      </button>
    </form>
  );
};

export default FeedbackForm;
export type { FeedbackItem };
