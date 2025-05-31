import { useState, useEffect, FC } from "react";
import axios, { AxiosError } from "axios";
import { API_URL } from "../config/config";
import { FeedbackItem } from "./FeedbackForm"; // Re-using the interface

// Define props for UpvoteIcon
interface UpvoteIconProps {
  filled: boolean;
}

const UpvoteIcon: FC<UpvoteIconProps> = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 sm:h-6 sm:w-6 ${
      filled ? "text-primary" : "text-neutral-dark hover:text-primary-dark"
    }`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

// Define props for FeedbackCard
interface FeedbackCardProps {
  feedbackItem: FeedbackItem;
  onUpvoteSuccess: (feedbackId: string, newUpvoteCount: number) => void;
}

// API response for upvoting
interface UpvoteResponse {
  success: boolean;
  data?: FeedbackItem; // The updated feedback item
  message?: string;
}

const FeedbackCard: FC<FeedbackCardProps> = ({
  feedbackItem,
  onUpvoteSuccess,
}) => {
  const [upvotes, setUpvotes] = useState<number>(feedbackItem.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    try {
      const upvotedItemsJSON = localStorage.getItem("upvotedFeedback");
      if (upvotedItemsJSON) {
        const upvotedItems: string[] = JSON.parse(upvotedItemsJSON);
        if (upvotedItems.includes(feedbackItem._id)) {
          setHasUpvoted(true);
        }
      }
    } catch (e) {
      console.error("Failed to parse upvotedFeedback from localStorage", e);
      localStorage.removeItem("upvotedFeedback"); // Clear corrupted data
    }
  }, [feedbackItem._id]);

  const handleUpvote = async () => {
    if (hasUpvoted || isLoading) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.put<UpvoteResponse>(
        `${API_URL}/feedback/${feedbackItem._id}/upvote`
      );
      if (response.data.success && response.data.data) {
        setUpvotes(response.data.data.upvotes);
        setHasUpvoted(true);

        try {
          const upvotedItemsJSON = localStorage.getItem("upvotedFeedback");
          const upvotedItems: string[] = upvotedItemsJSON
            ? JSON.parse(upvotedItemsJSON)
            : [];
          localStorage.setItem(
            "upvotedFeedback",
            JSON.stringify([...upvotedItems, feedbackItem._id])
          );
        } catch (e) {
          console.error("Failed to update upvotedFeedback in localStorage", e);
        }

        if (onUpvoteSuccess) {
          onUpvoteSuccess(feedbackItem._id, response.data.data.upvotes);
        }
      } else {
        setError(response.data.message || "Failed to upvote.");
      }
    } catch (err) {
      console.error("Upvote error:", err);
      const axiosError = err as AxiosError<UpvoteResponse>;
      setError(axiosError.response?.data?.message || "An error occurred.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setError(""), 3000);
    }
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="card mb-4 p-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
        <h3 className="text-xl font-semibold text-primary-dark mb-2 sm:mb-0">
          {feedbackItem.title}
        </h3>
        <span className="text-xs bg-secondary-light text-secondary-dark font-medium px-2.5 py-1 rounded-full capitalize">
          {feedbackItem.category}
        </span>
      </div>
      <p className="text-neutral-dark text-sm mb-4 leading-relaxed">
        {feedbackItem.description}
      </p>

      {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

      <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-neutral">
        <button
          onClick={handleUpvote}
          disabled={hasUpvoted || isLoading}
          className={`flex items-center space-x-2 p-2 rounded-md transition-colors duration-150 ease-in-out
                      ${
                        hasUpvoted
                          ? "cursor-not-allowed opacity-70"
                          : "hover:bg-primary-lightest"
                      }
                      ${isLoading ? "animate-pulse" : ""}`}
          aria-label={hasUpvoted ? "Already upvoted" : "Upvote this feedback"}
        >
          <UpvoteIcon filled={hasUpvoted} />
          <span
            className={`font-semibold ${
              hasUpvoted ? "text-primary" : "text-neutral-dark"
            }`}
          >
            {upvotes} Upvote{upvotes !== 1 ? "s" : ""}
          </span>
        </button>
        <p className="mt-2 sm:mt-0">
          Submitted: {formatDate(feedbackItem.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default FeedbackCard;
// Exporting FeedbackItem interface to be used in other files if necessary
export type { FeedbackItem };
