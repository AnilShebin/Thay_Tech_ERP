"use client"; // This component will use client-side logic
import Image from "next/image";
import { useRef, useState } from "react";

const UploadPhoto = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null); // State to hold the uploaded image URL
  const [error, setError] = useState<string | null>(null); // State to hold error messages

  const handleUploadClick = () => {
    fileInputRef.current?.click(); // Trigger the file input click
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      // Validation: Check file type and size
      if (file) {
        const fileType = file.type;
        const fileSize = file.size;

        // Check if file type is allowed
        const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
        if (!allowedFormats.includes(fileType)) {
          setError("Invalid file type");
          return;
        }

        // Check if file size is within the limit (2MB)
        if (fileSize > 2 * 1024 * 1024) {
          setError("File size exceeds 2MB limit");
          return;
        }

        // If validation passes, set the image URL and clear error
        const newImageUrl = URL.createObjectURL(file);
        setImageUrl(newImageUrl);
        setError(null); // Clear any previous error
      }
    }
  };

  return (
    <div className="w-72 h-96 relative mt-4 bg-white rounded-lg border border-gray-200 flex flex-col items-center justify-center">
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange} // Handle image change
        className="hidden" // Hide the input element
      />

      {/* Outer border for the upload photo circle */}
      <div
        className="rounded-full border border-gray-300 w-44 h-44 flex items-center justify-center cursor-pointer"
        onClick={handleUploadClick} // Handle click to open file dialog
      >
        {/* Inner circle for the uploaded image placeholder */}
        <div className="rounded-full border border-gray-200 w-40 h-40 flex flex-col items-center justify-center bg-zinc-100 overflow-hidden relative">
          {/* Display the uploaded image if available, otherwise show the placeholder */}
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Uploaded"
              layout="fill" // Use layout fill for responsive image
              className="object-cover" // Cover the inner circle
            />
          ) : (
            <>
              <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'translateY(-10%)' }}> {/* Adjusted for upward positioning */}
                <Image
                  src="/icons/upload-camera.svg"
                  alt="Upload Camera"
                  width={24} // Icon width
                  height={24} // Icon height
                  className="text-neutral-600"
                />
              </div>
              <span className="text-neutral-600 text-sm mt-4">
                Upload photo
              </span>
            </>
          )}
        </div>
      </div>

      {/* Error message display */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="text-center mt-4">
        <p className="text-neutral-500 text-sm">
          Allowed format
          <br />
          <span className="text-neutral-800">JPG, JPEG, and PNG</span>
        </p>
        <p className="text-neutral-500 text-sm">
          Max file size
          <br />
          <span className="text-neutral-800">2MB</span>
        </p>
      </div>
    </div>
  );
};

export default UploadPhoto;
