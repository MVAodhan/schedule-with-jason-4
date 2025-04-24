import { Episode } from "@/types";
import React from "react";

export const TaskCompletionTicks = ({ episode }: { episode: Episode }) => {
  return (
    <div className="flex items-start space-x-6 p-4 my-4 bg-white rounded-lg shadow">
      <div className="flex flex-col items-center space-y-1 w-full justify-around">
        <span className="text-xs font-medium text-gray-600 mb-1">Calender</span>
        {episode.calendar && (
          <div className="flex items-center justify-center p-1 rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center space-y-1 w-full justify-around">
        <span className="text-xs font-medium text-gray-600 mb-1">Buffer</span>
        {episode.live_tweet &&
          episode.ninety_minute_tweet &&
          episode.scheduled_tweet && (
            <div className="flex items-center justify-center p-1 rounded-full bg-green-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5 text-green-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
          )}
      </div>

      <div className="flex flex-col items-center space-y-1 w-full justify-around">
        <span className="text-xs font-medium text-gray-600 mb-1">Discord</span>
        {episode.discord && (
          <div className="flex items-center justify-center p-1 rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
