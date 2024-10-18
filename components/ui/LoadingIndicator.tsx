export default function LoadingIndicator() {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="mt-80 typing-indicator">
          <div className="typing-circle"></div>
          <div className="typing-circle"></div>
          <div className="typing-circle"></div>
          <div className="typing-shadow"></div>
          <div className="typing-shadow"></div>
          <div className="typing-shadow"></div>
        </div>
      </div>
    );
  }
  