import React from "react";
import { ILoaderProps } from "./Loader.types";
import { ELoaderEnum } from "./Loader.enum";

export const Loader: React.FC<ILoaderProps> = ({
  size = ELoaderEnum.MEDIUM,
  text = "Loading",
  fullScreen = false,
}) => {
  const sizeClasses = {
    small: "w-5 h-5 border-2",
    medium: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4",
  };

  const containerClasses = fullScreen
    ? "flex flex-col justify-center items-center h-screen w-full bg-background/80 backdrop-blur-sm"
    : "flex flex-col justify-center items-center py-8";

  return (
    <div className={containerClasses}>
      <div
        className={`${sizeClasses[size]} rounded-full border-r-transparent border-primary animate-spin mb-3`}
        aria-label="loading"
      />
      {text ? (
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          {text}
        </p>
      ) : null}
    </div>
  );
};

export default Loader;
