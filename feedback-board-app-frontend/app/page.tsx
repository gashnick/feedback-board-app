"use client";
import Head from "next/head";
import { useState, useEffect, useCallback, FC } from "react";
import FeedbackForm, { FeedbackItem } from "../components/FeedbackForm";
import FeedbackCard from "../components/FeedbackCard";
import FilterSortControls from "../components/FilterSortControls";
import { API_URL } from "../config/config";
import axios from "axios";

// API response for fetching feedbacks
interface FetchFeedbacksResponse {
  success: boolean;
  count?: number;
  data?: FeedbackItem[];
  message?: string;
}

const Home: FC = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("recent");

  const feedbackCategories: FeedbackItem["category"][] = [
    "feature",
    "bug",
    "improvement",
    "other",
  ];

  const fetchFeedbacks = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      let url = `${API_URL}/feedback?sortBy=${selectedSort}`;
      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }
      const response = await axios.get<FetchFeedbacksResponse>(url);
      if (response.data.success && response.data.data) {
        setFeedbacks(response.data.data);
      } else {
        setError(response.data.message || "Failed to fetch feedbacks.");
        setFeedbacks([]);
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "An error occurred while fetching data.";
      setError(message);
      setFeedbacks([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, selectedSort]);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  const handleFeedbackSubmitted = (newFeedback: FeedbackItem) => {
    console.log("New feedback submitted:", newFeedback);
    fetchFeedbacks(); // re-fetch to maintain sorting/filtering
  };

  const handleUpvoteSuccess = (feedbackId: string, newUpvoteCount: number) => {
    setFeedbacks((prevFeedbacks) =>
      prevFeedbacks.map((fb) =>
        fb._id === feedbackId ? { ...fb, upvotes: newUpvoteCount } : fb
      )
    );
    if (selectedSort === "mostUpvoted") {
      fetchFeedbacks(); // refresh sorting if needed
    }
  };

  return (
    <>
      <Head>
        <title>Public Feedback Board</title>
        <meta
          name="description"
          content="Share your feedback and suggestions!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">
            Feedback Board
          </h1>
          <p className="text-neutral-dark mt-2 text-lg">
            Have a suggestion, bug report, or idea? Let us know!
          </p>
        </header>

        <main>
          <FeedbackForm onFeedbackSubmitted={handleFeedbackSubmitted} />

          <div className="my-8">
            <h2 className="text-2xl font-semibold text-neutral-darkest mb-4">
              Submitted Feedback
            </h2>

            <FilterSortControls
              categories={feedbackCategories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedSort={selectedSort}
              onSortChange={setSelectedSort}
            />

            {isLoading && (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-3 text-neutral">Loading feedback...</p>
              </div>
            )}

            {error && (
              <p className="text-red-500 bg-red-100 p-4 rounded-md text-center">
                {error}
              </p>
            )}

            {!isLoading && !error && feedbacks.length === 0 && (
              <p className="text-neutral-dark text-center py-10 bg-white rounded-lg shadow-sm">
                No feedback submitted yet. Be the first!
              </p>
            )}

            {!isLoading && !error && feedbacks.length > 0 && (
              <div className="space-y-6">
                {feedbacks.map((item) => (
                  <FeedbackCard
                    key={item._id}
                    feedbackItem={item}
                    onUpvoteSuccess={handleUpvoteSuccess}
                  />
                ))}
              </div>
            )}
          </div>
        </main>

        <footer className="text-center mt-12 py-6 border-t border-neutral-light">
          <p className="text-sm text-neutral">
            Feedback Board App &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </>
  );
};

export default Home;
